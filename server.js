// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// Load .env early so MONGODB_URI is available to mongoose
try { require('dotenv').config(); } catch (e) { /* dotenv optional */ }
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Simple request logger to help debug which path the browser requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()}  ${req.method} ${req.url}`);
    next();
});

// Middleware to serve static files (CSS, JS, Images, HTML files)
// Serve the directory normally (allow index.html to be served by default).
app.use(express.static(path.join(__dirname, '/')));

// Middleware to parse form data (required for req.body.username)
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware (simple server-side sessions). In production, use a
// persistent store (Redis, MongoStore) and set a strong SESSION_SECRET in env.
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-session',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
}));

// --- MONGODB CONNECTION SETUP ---
// Use MONGODB_URI env var if provided (useful for Atlas). Falls back to local DB.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vedhurach_db_user:vedu@0907@cluster0.1enhqme.mongodb.net/?appName=Cluster0';

// Connect to MongoDB. Options like `useNewUrlParser` and `useUnifiedTopology`
// are deprecated in recent drivers and are no longer required when using
// modern mongoose versions — let mongoose pick sensible defaults.
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected:', MONGODB_URI))
    .catch(err => console.warn('MongoDB connection error (continuing with mock user):', err.message));

// Define a simple User Schema for MongoDB
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    // Wishlist: array of car ids the user has liked/saved
    wishlist: [{ carId: { type: String }, addedAt: { type: Date, default: Date.now } }]
});

const User = mongoose.model('User', userSchema);

// --- OPTIONAL IN-MEMORY CREDENTIALS FOR LOCAL TESTING ---
// Note: By default this is disabled. If you want a mock login for
// local development, set MOCK_USER_EMAIL and MOCK_USER_PASSWORD in your
// environment. This avoids shipping hardcoded credentials in the repo.
const MOCK_USER = {
    username: process.env.MOCK_USER_EMAIL || null,
    password: process.env.MOCK_USER_PASSWORD || null
};

// 1. ROUTE TO SERVE THE LOGIN PAGE (Your new index.html)
app.get('/', (req, res) => {
    // Serve the main index.html at root. Static middleware would normally
    // serve this automatically, but we send it explicitly to keep behavior
    // predictable and to allow query flags like ?error=1 to be preserved.
    console.log('Root route hit — sending index.html');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. THE CRUCIAL LOGIN ROUTE (Fixing the Redirection Issue)
app.post('/login', (req, res) => {
    // Accept either `username` or `email` as the identifier from different client forms
    const identifier = (req.body.username || req.body.email || req.body.user || '').toLowerCase().trim();
    const password = req.body.password || '';

    console.log(`Attempting login for: ${identifier}`);

    // If MongoDB is connected, use it; otherwise fall back to MOCK_USER
    (async () => {
        try {
            // If DB is connected and model is available, attempt DB auth
            if (mongoose.connection.readyState === 1) {
                const user = await User.findOne({ email: identifier }).exec();
                if (!user) {
                    console.log('User not found in DB');
                    return res.redirect('/?error=1');
                }

                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    console.log('Login successful (DB)! Redirecting to dashboard.');
                    // Set session so subsequent API calls can identify the user
                    req.session.userId = user._id;
                    req.session.email = user.email;
                    return res.redirect('/dashboard.html');
                } else {
                    console.log('Invalid credentials (DB)');
                    return res.redirect('/?error=1');
                }
            }

            // Fallback: use mock user if DB not connected
            if (identifier === MOCK_USER.username && password === MOCK_USER.password) {
                console.log('Login successful (mock)! Redirecting to dashboard.');
                // For mock login, set a minimal session marker
                req.session.userId = 'mock-user';
                req.session.email = MOCK_USER.username;
                return res.redirect('/dashboard.html');
            }

            console.log('Login failed. Redirecting back to index with error flag.');
            return res.redirect('/?error=1');
        } catch (err) {
            console.error('Login error:', err.message);
            return res.status(500).send('Login error');
        }
    })();
});

// 3. ROUTE TO SERVE THE DASHBOARD PAGE (The target after login)
app.get('/dashboard.html', (req, res) => {
    // You should add logic here to check if a user is truly authenticated 
    // (e.g., check for a session or token) before sending the file.
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    if (MOCK_USER.username && MOCK_USER.password) {
        console.log('Mock login is ENABLED for local development. Set MOCK_USER_EMAIL/MOCK_USER_PASSWORD to change.');
    }
});

// ---------- NEW: Registration endpoint ----------
// Accepts form-encoded POST { email, password }
app.post('/register', async (req, res) => {
    const email = (req.body.email || '').toLowerCase().trim();
    const password = req.body.password || '';

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        // Check if user already exists
        const existing = await User.findOne({ email }).exec();
        if (existing) {
            return res.status(409).send('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = new User({ email, password: hashed });
        await user.save();

        console.log(`Registered new user: ${email}`);

        // If the client expects JSON (fetch/XHR), return a JSON success response.
        // Otherwise, fall back to redirecting to the home page.
        const acceptsJSON = req.headers.accept && req.headers.accept.includes('application/json');
        if (acceptsJSON) {
            return res.status(201).json({ success: true, message: 'User registered' });
        }

        return res.redirect('/');
    } catch (err) {
        console.error('Registration error:', err.message);
        return res.status(500).send('Registration failed');
    }
});

// ----------------- Wishlist API -----------------
// Requires an authenticated session (simple session-based auth)
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) return next();
    return res.status(401).json({ error: 'Not authenticated' });
}

// Get current user's wishlist
app.get('/api/wishlist', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        if (userId === 'mock-user') {
            return res.json({ wishlist: [] });
        }
        const user = await User.findById(userId).exec();
        if (!user) return res.status(404).json({ wishlist: [] });
        return res.json({ wishlist: user.wishlist.map(i => i.carId) });
    } catch (err) {
        console.error('Get wishlist error:', err.message);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Add car to wishlist
app.post('/api/wishlist', requireAuth, bodyParser.urlencoded({ extended: true }), async (req, res) => {
    try {
        const carId = (req.body.carId || req.body.car || '').toString();
        if (!carId) return res.status(400).json({ error: 'carId required' });

        const userId = req.session.userId;
        if (userId === 'mock-user') {
            // For mock user we don't persist, but acknowledge
            return res.status(201).json({ success: true });
        }

        const user = await User.findById(userId).exec();
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Prevent duplicates
        if (user.wishlist.some(w => w.carId === carId)) {
            return res.status(200).json({ success: true, message: 'Already in wishlist' });
        }

        user.wishlist.push({ carId, addedAt: new Date() });
        await user.save();
        return res.status(201).json({ success: true });
    } catch (err) {
        console.error('Add wishlist error:', err.message);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Remove car from wishlist
app.delete('/api/wishlist/:carId', requireAuth, async (req, res) => {
    try {
        const carId = req.params.carId;
        const userId = req.session.userId;
        if (userId === 'mock-user') return res.json({ success: true });

        const user = await User.findById(userId).exec();
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.wishlist = user.wishlist.filter(w => w.carId !== carId);
        await user.save();
        return res.json({ success: true });
    } catch (err) {
        console.error('Remove wishlist error:', err.message);
        return res.status(500).json({ error: 'Server error' });
    }
});
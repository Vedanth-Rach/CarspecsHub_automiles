// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// --- MONGODB CONNECTION SETUP ---
// Use MONGODB_URI env var if provided (useful for Atlas). Falls back to local DB.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carspecs';

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
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// --- TEMPORARY IN-MEMORY CREDENTIALS FOR TESTING THE REDIRECT ---
// **REPLACE THIS WITH REAL MONGODB LOGIC LATER**
const MOCK_USER = {
    username: 'testuser@example.com',
    password: 'password123' // You should use hashed passwords in a real app
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
                    return res.redirect('/dashboard.html');
                } else {
                    console.log('Invalid credentials (DB)');
                    return res.redirect('/?error=1');
                }
            }

            // Fallback: use mock user if DB not connected
            if (identifier === MOCK_USER.username && password === MOCK_USER.password) {
                console.log('Login successful (mock)! Redirecting to dashboard.');
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
    console.log('Use testuser@example.com / password123 to log in.');
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

        // After successful registration, redirect to login (or dashboard)
        return res.redirect('/');
    } catch (err) {
        console.error('Registration error:', err.message);
        return res.status(500).send('Registration failed');
    }
});
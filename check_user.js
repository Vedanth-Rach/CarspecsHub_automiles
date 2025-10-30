require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const email = process.argv[2] || 'testuser@example.com';

if (!uri) {
  console.error('MONGODB_URI not set in .env');
  process.exit(2);
}

(async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(); // uses default DB from URI if provided
    const users = db.collection('users');
    const user = await users.findOne({ email: email.toLowerCase() });
    if (user) {
      console.log('FOUND_USER');
      // print minimal info
      console.log({ _id: user._id.toString(), email: user.email, createdAt: user.createdAt });
      process.exit(0);
    } else {
      console.log('USER_NOT_FOUND');
      process.exit(1);
    }
  } catch (err) {
    console.error('ERROR_CHECKING_DB:', err.message);
    process.exit(3);
  } finally {
    await client.close();
  }
})();

const mongoose = require('mongoose');
require('dotenv').config();

// Replace with your MongoDB URI
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
    
    // Define User schema and model
    const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, required: true, unique: true }
    });

    const User = mongoose.model('User', userSchema);

    // Create a new user instance
    const testUser = new User({
      name: 'Test User',
      email: 'testuser@example.com'
    });

    // Save the user to the database
    testUser.save()
      .then(user => {
        console.log('User saved:', user);
        mongoose.connection.close(); // Close the connection after test
      })
      .catch(err => {
        console.error('Error saving user:', err);
        mongoose.connection.close();
      });

  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

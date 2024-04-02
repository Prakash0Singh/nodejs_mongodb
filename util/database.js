const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const Product = require('../models/product');
const User = require('../models/user');

const mongoURI = '';


const mongoConnect = callback => {

  mongoose.connect(mongoURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  })
    .then(() => {
      console.log('Connected to MongoDB');
      callback();
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);

      if (error.name === 'MongoNetworkError') {
        console.error('Network error occurred. Check your MongoDB server.');
      } else if (error.name === 'MongooseServerSelectionError') {
        console.error('Server selection error. Ensure'
          + ' MongoDB is running and accessible.');
      } else {
        console.error('An unexpected error occurred:', error);
      }
    });

  const db = mongoose.connection;

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  db.once('open', async () => {
    try {
      await Product.createCollection();
      await User.createCollection();
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  });

  db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

}

module.exports = mongoConnect;
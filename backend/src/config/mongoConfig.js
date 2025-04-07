const mongoose = require('mongoose');
const env = require('./env');

const connectToDB = async () => {
     mongoose.connect(env.MONGO_URL, {
    })
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.error('MongoDB connection error:', err));
}

module.exports = connectToDB;



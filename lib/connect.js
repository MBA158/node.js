const mongoose = require('mongoose');

const connectDB = () => {
    const uri = process.env.DB_URL;
    console.log(uri);
    mongoose.connect(uri);
    const database = mongoose.connection;

    database.on('error', (error) => {
        console.log('database connection error', error);
    });
    database.once('open', () => {
        console.log('Connected to the database');
    });
};

module.exports = connectDB;
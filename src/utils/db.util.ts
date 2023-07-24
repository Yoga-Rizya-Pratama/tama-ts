import mongoose from "mongoose";

const connectionString = 'mongodb://localhost:27017/my_database'; // Replace with your MongoDB connection string

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database.');
});

export default mongoose;
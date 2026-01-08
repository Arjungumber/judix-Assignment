const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("connectDB called");
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error connecting to MongoDB");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
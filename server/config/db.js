import mongoose from "mongoose";

const connectedDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`Mongo DB connected successfully: ${conn.connection.host}`);
    }
    catch (err) {
        console.log("Database connection error:", err.message);
    }
}

export default connectedDb;
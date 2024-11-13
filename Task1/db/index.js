import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({
    path:"./env"
});

let db;

export const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        db = client.db();
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1); // Exit the process if unable to connect
    }
};

export const getDB = () => {
    if (!db) throw new Error("Database not connected");
    return db;
};

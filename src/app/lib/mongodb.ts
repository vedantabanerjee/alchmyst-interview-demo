import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://vedanta:mongo_pass@cluster0.kihjpcv.mongodb.net/";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// This line is crucial to make TypeScript aware of the `mongoose` property on `global`
const cached = global as typeof globalThis & { mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } };

if (!cached.mongoose) {
    cached.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.mongoose.conn) {
        return cached.mongoose.conn;
    }

    if (!cached.mongoose.promise) {
        cached.mongoose.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose;
        });
    }

    cached.mongoose.conn = await cached.mongoose.promise;
    return cached.mongoose.conn;
}

export default dbConnect;
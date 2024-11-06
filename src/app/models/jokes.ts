import mongoose, { Document, Model, Schema } from "mongoose";

interface Joke extends Document {
        text: string;
        author: string;
        createdAt: Date;
}

const JokeSchema = new Schema({
        text: {
                type: String,
                required: true
        },
        author: {
                type: String,
                required: true
        },
        createdAt: {
                type: Date,
                default: Date.now
        }
});

const JokeModel: Model<Joke> = mongoose.models.Joke || mongoose.model<Joke>('Joke', JokeSchema);

export default JokeModel;
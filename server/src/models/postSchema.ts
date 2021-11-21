import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            unique: false,
        },
        dateCreated: {
            type: Number,
            required: true,
            unique: false,
        },
        likes: {
            type: Number,
            required: true,
            unique: false,
        },
        dislikes: {
            type: Number,
            required: true,
            unique: false,
        },
        ratio: {
            type: Number,
            required: true,
            unique: false,
        },
        comments: {
            type: String,
            required: true,
            unique: false,
        },
    },
    {
        id: false,
    }
);

export default postSchema;

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogPostSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        author: {
            type: String,
            default: "Anonymous"
        }
    },
    {
        timestamps: true
    }
);

const BlogPost = model("BlogPost", blogPostSchema);

export default BlogPost;
import express from "express";

import BlogPost from "../models/BlogPost.js";

const router = express.Router();

// 1
router.post('/blogs', async (req, res) => {
    const { title, body, author } = req.body;

    try {
        const blogPost = await BlogPost.create({title, body, author});
        res.status(201).json(blogPost);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});

// 2
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await BlogPost.find(); 
        res.status(200).json(blogs);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// 3
router.get('/blogs/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await BlogPost.findById(id);
        if (!blog) return res.status(404).json({ error: "Blog post not found" });
        res.status(200).json(blog);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// 4
router.put('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, body, author } = req.body;

    try {
        const updatedBlog = await BlogPost.findByIdAndUpdate(
            id,
            { title, body, author },
            { new: true, runValidators: true } 
        );
        if (!updatedBlog) return res.status(404).json({ error: "Blog post not found" });
        res.status(200).json(updatedBlog);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});

// 5
router.delete('/blogs/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBlog = await BlogPost.findByIdAndDelete(id);
        if (!deletedBlog) return res.status(404).json({ error: "Blog post not found" });
        res.json({ message: "Blog post deleted successfully" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
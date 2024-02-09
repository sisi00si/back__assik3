const express = require('express');
const router = express.Router();
const Blog = require('./modules/Blog');

// POST -- Create a new blog post
router.post('/', async (req, res) => {
    try {
        const { title, body, author } = req.body;
        if (!title || !body) {
            return res.status(400).json({ error: 'Title and body are required' });
        }

        const newBlog = new Blog({ title, body, author });
        await newBlog.save();

        res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET -- Retrieve all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET -- Retrieve a single blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT -- Update a blog post by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, body, author } = req.body;
        if (!title || !body) {
            return res.status(400).json({ error: 'Title and body are required' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, body, author }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE -- Delete a blog post by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

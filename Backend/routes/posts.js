const router = require('express').Router();
const User = require('../models/User');
const Post = require("../models/Post")

//CREATE NEW POST

router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost)

    } catch (err) {
        return res.status(500).json(err);
    }
})

//UPDATE

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                )
                return res.status(200).json(updatedPost)
            } catch (error) {
                return res.status(500).json(error)
            }
        } else {
            return res.status(401).json("You can update only your post")
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})
//DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.deleteOne();
                return res.status(200).json("post has been deleted")
            } catch (error) {
                return res.status(500).json(error)
            }
        } else {
            return res.status(401).json("You can update only your post")
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

//GET POST

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        return res.status(200).json(post)
    } catch (err) {
        return res.status(500).json(err)
    }
})

//GET ALL POST

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    let posts;
    try {
        if (username) {
            posts = await Post.find({ username })
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            })
        }
        else {
            posts = await Post.find();
        }
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router
const router = require('express').Router();
const Post = require('../models/post');

// create post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*
{
    "title": "Post 1",
    "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "photo": "uploads/post/1.jpg",
    "username": "john",
    "categories": ["604f1c7f9b0e3e2a1c8f0b1b", "604f1c7f9b0e3e2a1c8f0b1c"]
}
*/

// update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true },
        );
        res.status(200).json(updatePost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json('You can update only your post!');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json('Post Has been delete!');
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json('You can delete only your post!');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
});

// get all post
router.get('/', async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
});

// localhost:5000/posts?user=ram

module.exports = router;

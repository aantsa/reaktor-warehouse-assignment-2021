const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GET BACK ALL THE POSTS
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({
      message: error
    });
  }
});

//SUBMITS A POST
router.post('/', async (req, res) => {
  const post = new Post({
    type: req.body.type,
    name: req.body.name,
    color: req.body.color,
    price: req.body.price,
    manufacturer: req.body.manufacturer
  });
  try {
    const savedPost = await post.save()
    res.json(savedPost);
  } catch (error) {
    res.json({
      message: error
    })
  }
});

//SPECIFIC POST
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.json(post);
  } catch (error) {
    res.json({
      message: error
    });
  }
});

//DELETE POST BY ID
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({
      _id: req.params.postId
    })
    res.json(removedPost);
  } catch (error) {
    res.json({
      message: error
    });
  }
});

//UPDATE A POST
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
        {_id: req.params.postId},
        {$set: { name: req.body.name}}
    );
    res.json(updatedPost);
  } catch (error) {
    res.json({message: err});
  }
});

module.exports = router;

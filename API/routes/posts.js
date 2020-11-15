const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const request = require('request');
const fetch = require('node-fetch');
const axios = require('axios');
const mongoose = require('mongoose');
const db = mongoose.connection;
const jackets = [];

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

axios.get('https://bad-api-assignment.reaktor.com/products/jackets')
  .then((response) => {
    onSuccess(response)
  })
  .catch((error) => {
    console.dir(error);
  })


//Fetch data from API
function onSuccess(response) {
  var array = response.data;
  var arrayLength = Object.keys(array).length
  console.dir(arrayLength);
  for (let i = 0; i < 12; i++) {  //Remember to change '1' to arrayLength
    var id = array[i].id;
    var type = array[i].type;
    var name = array[i].name;
    var color = array[i].color;
    var price = array[i].price;
    var manufacturer = array[i].manufacturer;
    console.log(id + " " + type + " " + name);

    assignDataValue(id, type, name, color, price, manufacturer)
  }
}

//Assinging values
function assignDataValue(id, type, name, color, price, manufacturer) {
  //Check if already exists in DB
  Post.findOne({id}, (err, product) => {
    if (!product) {
      console.dir('Product not found')
    } else if (product){
      console.dir('This product is already in the database');
    } else {
      var post = new Post()
      post.id = id;
      post.type = type;
      post.name = name;
      post.color = color;
      post.price = price;
      post.manufacturer = manufacturer;
      // post.save();
      console.dir('Saved');
    }
  })

 

  
  //Saving to mongoDB
  
}



router.post('/', async (req, res) => {
  const post = new Post({
    id: req.body._id,
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
    const updatedPost = await Post.updateOne({
      _id: req.params.postId
    }, {
      $set: {
        name: req.body.name
      }
    });
    res.json(updatedPost);
  } catch (error) {
    res.json({
      message: err
    });
  }
});

module.exports = router;

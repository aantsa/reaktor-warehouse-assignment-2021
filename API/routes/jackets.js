const express = require('express');
const router = express.Router();
const Jacket = require('../models/Jacket');
const axios = require('axios');
const mongoose = require('mongoose');
const apiUrl = 'https://bad-api-assignment.reaktor.com';
const middle = '/products/';

//GET BACK ALL THE JACKETS
router.get('/', async (req, res) => {
  try {
    const jackets = await Jacket.find();
    res.json(jackets);
  } catch (error) {
    res.json({
      message: error
    });
  }
});



const jacketsData = async () => {
  let jackets = 'jackets';
    console.dir(apiUrl + middle + jackets, ' jacket url')
    await axios.get(apiUrl + middle + jackets)
      .then((response) => {
        onSuccess(response)
      })
      .catch((error) => {
        console.dir(error);
      })
}

//Fetch data from API
const onSuccess = async (response) => {
  var array = response.data;
  var arrayLength = Object.keys(array).length;
  console.dir(arrayLength, ' jackets count');
  for (let i = 0; i < 6; i++) { //Remember to change '1' to arrayLength
    var id = array[i].id;
    var type = array[i].type;
    var name = array[i].name;
    var color = array[i].color;
    var price = array[i].price;
    var manufacturer = array[i].manufacturer;
    console.log(id + " " + type + " " + name + " " + manufacturer);

    assignDataValue(id, type, name, color, price, manufacturer)
  }
}

//Assinging values
const assignDataValue = async (id, type, name, color, price, manufacturer) => {
  //Check if already exists in DB
  await Jacket.findOne({
    id
  }, (err, jacket) => {
    if (!jacket) {
      var jacket = new Jacket()
      jacket.id = id;
      jacket.type = type;
      jacket.name = name;
      jacket.color = color;
      jacket.price = price;
      jacket.manufacturer = manufacturer;
      //Saving to mongoDB
      jacket.save();
      console.dir('Not in database');
      console.dir(jacket.id + ' ' + jacket.type + ' ' + jacket.name + ' ' + jacket.color + ' ' + jacket.price + ' ' + jacket.manufacturer);
    } else if (jacket) {
      console.dir('This jacket is already in the database');
    }
  })
}

//SPECIFIC product
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
    res.json(product);
  } catch (error) {
    res.json({
      message: error
    });
  }
});

//DELETE PRODUCT BY ID
router.delete('/:productId', async (req, res) => {
  try {
    const removedProudct = await Product.remove({
      _id: req.params.productId
    })
    res.json(removedProduct);
  } catch (error) {
    res.json({
      message: error
    });
  }
});

//UPDATE A Product
router.patch('/:productId', async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne({
      _id: req.params.productId
    }, {
      $set: {
        name: req.body.name
      }
    });
    res.json(updatedProduct);
  } catch (error) {
    res.json({
      message: err
    });
  }
});

jacketsData();
module.exports = router;

const express = require('express');
const router = express.Router();
const Shirts = require('../models/Shirts');
const axios = require('axios');
const mongoose = require('mongoose');
const apiUrl = 'https://bad-api-assignment.reaktor.com';
const middle = '/products/';

//GET BACK ALL THE SHIRTS
router.get('/', async (req, res) => {
  try {
    const shirts = await Shirts.find();
    res.json(shirts);
  } catch (error) {
    res.json({
      message: error
    });
  }
});



const shirtsData = async () => {
  let shirts = 'shirts';
    console.dir(apiUrl + middle + shirts, ' shirturl')
    await axios.get(apiUrl + middle + shirts)
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
  console.dir(arrayLength, ' shirts count');
  for (let i = 0; i < arrayLength; i++) { //Remember to change '1' to arrayLength
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
  await Shirts.updateOne(
    {id: id},
    {type: type, name: name, color: color, price: price, manufacturer: manufacturer},
    {upsert : true}
  ), (error, result) => {
    if(error) {
      console.dir(error)
    }
  }
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
shirtsData();
module.exports = router;

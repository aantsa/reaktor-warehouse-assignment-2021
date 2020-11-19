const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const Accessories = require('../models/Accessories');
const apiUrl = 'https://bad-api-assignment.reaktor.com';
const middle = '/products/';


//GET BACK ALL THE ACCESSORIES
router.get('/', async (req, res) => {
  try {
    const accessories = await Accessories.find();
    res.json(accessories);
  } catch (error) {
    res.json({message: 'Unable to get accessories data from the localhost'});
  }
});


const accessoriesData = async () => {
  let accessories = 'accessories';
    await axios.get(apiUrl + middle + accessories)
      .then((response) => {
        onSuccess(response)
      })
      .catch((error) => {
        throw new Error('Unable to get accessories data from the API');
      })
}

//Fetch data from API
const onSuccess = async (response) => {
  var array = response.data;
  var arrayLength = Object.keys(array).length;
  for (let i = 0; i < arrayLength; i++) { //Remember to change '1' to arrayLength
    var id = array[i].id;
    var type = array[i].type;
    var name = array[i].name;
    var color = array[i].color;
    var price = array[i].price;
    var manufacturer = array[i].manufacturer;
    assignDataValue(id, type, name, color, price, manufacturer)
  }
}

//Assinging values
const assignDataValue = async (id, type, name, color, price, manufacturer) => {
  await Accessories.updateOne(
    {id: id},
    {type: type, name: name, color: color, price: price, manufacturer: manufacturer},
    {upsert : true}
  ), (error, result) => {
    if(error) {
      throw new Error('Unable to assing data values');
    }
  }
}

//FIND BY ID
router.get('/:productId', async (req, res) => {
  try {
    const product = await Accessories.find({id: req.params.productId})
    res.json(product);
  } catch (error) {
    res.json({
      message: "Unable to get product by id"
    });
  }
});

//FIND BY NAME
router.get('/:productName', async (req, res) => {
  try {
    const product = await Accessories.find({name: req.params.productId})
    res.json(product);
  } catch (error) {
    res.json({
      message: "Unable to get product by name"
    });
  }
});

// accessoriesData();
module.exports = router;
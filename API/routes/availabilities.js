const express = require('express');
const router = express.Router();
const Availability = require('../models/Availability');
const axios = require('axios');
const mongoose = require('mongoose');
const apiUrl = 'https://bad-api-assignment.reaktor.com';
const middle = '/availability/';
const manufacturers = [];



router.get('/', async (req, res) => {
  try {
    const availability = await Availability.find();
    res.json(availability);
  } catch (error) {
    res.json({
      message: error
    });
  }
});



const fetchManufacturers = async () => {
  let products = ['accessories', 'shirts', 'jackets'];
  for (let i = 0; i < products.length; i++) {
    console.dir(apiUrl + '/products/' + products[i], ' Accessorie url')
    await axios.get(apiUrl + '/products/' + products[i])
      .then((response) => {
        onSuccess(response)
      })
      .catch((error) => {
        console.dir(error);
      })
  }
}

//Fetch data from API
const onSuccess = async (response) => {
  var array = response.data;
  var arrayLength = Object.keys(array).length;
  console.dir(arrayLength, ' accessories count');
  for (let i = 0; i < arrayLength; i++) { //Remember to change '1' to arrayLength
    if (manufacturers.indexOf(array[i].manufacturer) == -1) manufacturers.push(array[i].manufacturer);
  }
  availabilityData();
}





const availabilityData = async () => {
  console.dir(apiUrl + middle + 'xoon')
  for (let i = 0; i < manufacturers.length; i++) {
    await axios.get(apiUrl + middle + 'xoon')
      .then((response) => {
        onSucc(response)
      })
      .catch((error) => {
        console.dir(error);
      })
  }
}


const onSucc = async (response) => {
  var reg = 'E>(.*)<\/I'
  var array = response.data.response;
  var arrayLength = Object.keys(array).length;
  console.dir(arrayLength, ' availability count');
  for (let i = 0; i < 6; i++) {
    var id = array[i].id;
    var DATAPAYLOAD = array[i].DATAPAYLOAD.match(reg)[1];
    console.log(DATAPAYLOAD + ' id and datapayload');
    assignAvailabilityValue(id, DATAPAYLOAD)
  }
}

const assignAvailabilityValue = async (id, DATAPAYLOAD) => {
  await Availability.findOne({
    id
  }, (err, availability) => {
    if (!availability) {
      var availability = new Availability()
      availability.id = id;
      availability.DATAPAYLOAD = DATAPAYLOAD;
      //Saving to mongoDB
      availability.save();
      console.dir('Not in database');
    } else if (availability) {
      console.dir('This availability is already in the database')
    }
  })
}

fetchManufacturers();
module.exports = router;

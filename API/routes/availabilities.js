const express = require('express');
const router = express.Router();
const Availabilities = require('../models/Availability');
const axios = require('axios');
const mongoose = require('mongoose');
const { error } = require('console');
const apiUrl = 'https://bad-api-assignment.reaktor.com';
const middle = '/availability/';
const manufacturers = [];
// var count = 0;



router.get('/', async (req, res) => {
  try {
    const availability = await Availabilities.find();
    res.json(availability);
  } catch (error) {
    res.json({
      message: error
    });
  }
});



// const fetchManufacturers = async () => {
//   let products = ['accessories', 'shirts', 'jackets'];
//   for (let i = 0; i < products.length; i++) {
//     console.dir(apiUrl + '/products/' + products[i], ' Accessorie url')
//     await axios.get(apiUrl + '/products/' + products[i])
//       .then((response) => {
//         onSuccess(response)
//       })
//       .catch((error) => {
//         console.dir(error);
//       })
//   }
//   availabilityData();
// }

// //Fetch data from API
// const onSuccess = async (response) => {
//   var array = response.data;
//   var arrayLength = Object.keys(array).length;
//   console.dir(arrayLength, ' accessories count');
//   for (let i = 0; i < arrayLength; i++) { //Remember to change '1' to arrayLength
//     if (manufacturers.indexOf(array[i].manufacturer) == -1) manufacturers.push(array[i].manufacturer);
//   }
// }


const availabilityData = async () => {
  let params = [ 'xoon', 'reps', 'nouke', 'derp', 'abiplos' ]
    for (let i = 0; i < params.length; i++) {
    console.dir(apiUrl + middle + params[i])
    await axios.get(apiUrl + middle + params[i])
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
  console.dir(arrayLength + ' length');
  for (let i = 0; i < arrayLength; i++) {
    var id = array[i].id;
    if(array[i].DATAPAYLOAD !== undefined){
      var DATAPAYLOAD = array[i].DATAPAYLOAD.match(reg)[1];
    }
    console.log(DATAPAYLOAD + ' id and datapayload');
    await assignAvailabilityValue(id, DATAPAYLOAD)
  }
  // console.dir('Done')
}

const assignAvailabilityValue = async (id, DATAPAYLOAD) => {
  await Availabilities.updateOne(
    {id: id},
    {DATAPAYLOAD: DATAPAYLOAD},
    {upsert : true}
  ), (error, result) => {
    if(error) {
      console.dir(error)
    }
  }
}

availabilityData();
module.exports = router;

const { analyzeAndValidateNgModules } = require('@angular/compiler');
const mongoose = require('mongoose');


const ShirtSchema = mongoose.Schema({
    id: String,
    type: String,
    name: String,
    color: [String],
    price: Number,
    manufacturer: String,
    availability: String
});



module.exports = mongoose.model('Shirt', ShirtSchema);


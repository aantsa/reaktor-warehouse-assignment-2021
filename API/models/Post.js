const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    type: String,
    name: String,
    color: String,
    price: Number,
    manufacturer: String
});

module.exports = mongoose.model('Posts', PostSchema);
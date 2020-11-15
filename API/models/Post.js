const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    id: String,
    type: String,
    name: String,
    color: [String],
    price: Number,
    manufacturer: String
});

// PostSchema.set('toJSON', {
//     virtuals: true,
//     transform: (document, returnedObject) => {
//     //   returnedObject.id = returnedObject._id;
//       delete returnedObject._id;
//       delete returnedObject.__v;
//     }
//   });

module.exports = mongoose.model('Posts', PostSchema);

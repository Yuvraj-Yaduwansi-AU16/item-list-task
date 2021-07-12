const mongoose = require('mongoose');
const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: 'String',
    default: 'personal',
  },
  status: {
    type: 'String',
    default: 'active',
  },
  img: {
    type: 'String',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('item', ItemSchema);

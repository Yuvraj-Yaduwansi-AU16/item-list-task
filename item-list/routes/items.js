const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../middleware/auth');
const Item = require('../models/Item');
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an Image File'));
    }
    cb(undefined, true);
  },
});

// Get
// api/item
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find().sort({
      date: -1,
    });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});
// Add
// api/items
router.post('/', upload.single('img'), [auth], async (req, res) => {
  // ,
  const { name, type, status } = req.body;
  const img = req.file.buffer.toString('base64');
  try {
    const item = new Item({
      name,
      type,
      status,
      img,
    });
    const newItem = await item.save();
    res.json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});
// Update
// api/items/:id
router.put('/:id', upload.single('img'), [auth], async (req, res) => {
  const { name, type, status } = req.body;
  const itemFields = {};
  if (name) itemFields.name = name;
  if (status) itemFields.status = status;
  if (type) itemFields.type = type;
  if (req.file) {
    const img = req.file.buffer.toString('base64');
    itemFields.img = img;
  }
  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;

const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect DB
connectDB();
app.use(express.json({ extended: true }));
const PORT = process.env.PORT || 5000;
// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/items', require('./routes/items'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

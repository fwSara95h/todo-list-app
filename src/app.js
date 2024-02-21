const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public directory

mongoose.connect('mongodb://localhost/todoListDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/todos', todoRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));

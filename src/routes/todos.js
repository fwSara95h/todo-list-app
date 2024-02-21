const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Additional routes for updating and deleting todos can be added here
// PUT route to update a todo's completion status
router.put('/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      todo.completed = req.body.completed;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE route to delete a todo
  router.delete('/:id', async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: 'Deleted Todo' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;

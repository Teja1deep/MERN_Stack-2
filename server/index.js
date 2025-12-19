const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Replace with your connection string)
const MONGODB_URI = "mongodb://localhost:27017/my_todo_db";
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define a Simple Schema
const TodoSchema = new mongoose.Schema({
  text: String,
  complete: Boolean
});
const Todo = mongoose.model('Todo', TodoSchema);

// Routes
// GET all todos
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST new todo
app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({ text: req.body.text, complete: false });
  await newTodo.save();
  res.json(newTodo);
});

// DELETE todo
app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
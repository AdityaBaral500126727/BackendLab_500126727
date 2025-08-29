const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory database (array)
let todos = [
  { id: 1, task: "Learn HTTP methods" },
  { id: 2, task: "Build REST API" }
];

// ==================== API ROUTES ====================

// GET - Fetch all items
app.get("/to-doapp", (req, res) => {
  res.json(todos);
});

// GET - Fetch a single item by ID
app.get("/to-doapp/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Item not found" });
  res.json(todo);
});

// POST - Add a new item
app.post("/to-doapp", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT - Update an item
app.put("/to-doapp/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Item not found" });

  todo.task = req.body.task;
  res.json(todo);
});

// DELETE - Remove an item
app.delete("/to-doapp/:id", (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: "Item deleted" });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const http = require("http"); // Explicit http module
const PORT = 3000;

// In-memory database
let todos = [
  { id: 1, task: "HTTP BUILD" },
  { id: 2, task: "Build REST API" }
];

// Helper function to parse URL and ID
function getIdFromUrl(url) {
  const parts = url.split("/");
  const id = parseInt(parts[parts.length - 1]);
  return isNaN(id) ? null : id;
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Enable JSON response
  res.setHeader("Content-Type", "application/json");

  // GET all todos
  if (method === "GET" && url === "/to-doapp") {
    res.end(JSON.stringify(todos));
  }

  // GET todo by ID
  else if (method === "GET" && url.startsWith("/to-doapp/")) {
    const id = getIdFromUrl(url);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Item not found" }));
    } else {
      res.end(JSON.stringify(todo));
    }
  }

  // POST new todo
  else if (method === "POST" && url === "/to-doapp") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      const { task } = JSON.parse(body);
      const newTodo = { id: todos.length + 1, task };
      todos.push(newTodo);
      res.statusCode = 201;
      res.end(JSON.stringify(newTodo));
    });
  }

  // PUT update todo
  else if (method === "PUT" && url.startsWith("/to-doapp/")) {
    const id = getIdFromUrl(url);
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      const todo = todos.find(t => t.id === id);
      if (!todo) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Item not found" }));
      } else {
        const { task } = JSON.parse(body);
        todo.task = task;
        res.end(JSON.stringify(todo));
      }
    });
  }

  // DELETE todo
  else if (method === "DELETE" && url.startsWith("/to-doapp/")) {
    const id = getIdFromUrl(url);
    const initialLength = todos.length;
    todos = todos.filter(t => t.id !== id);
    if (todos.length === initialLength) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Item not found" }));
    } else {
      res.end(JSON.stringify({ message: "Item deleted" }));
    }
  }

  // 404 Not Found
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

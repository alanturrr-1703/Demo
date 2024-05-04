// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();
const PORT = 8080;

// Initialize an array to store items
let items = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define routes
// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get a specific item by id
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = items.find(item => item.id === parseInt(itemId));
  if (!item) {
    res.status(404).send('Item not found');
  } else {
    res.json(item);
  }
});

// Add a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an existing item
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const index = items.findIndex(item => item.id === parseInt(itemId));
  if (index === -1) {
    res.status(404).send('Item not found');
  } else {
    items[index] = { ...items[index], ...updatedItem };
    res.json(items[index]);
  }
});

// Delete an item
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const index = items.findIndex(item => item.id === parseInt(itemId));
  if (index === -1) {
    res.status(404).send('Item not found');
  } else {
    items.splice(index, 1);
    res.sendStatus(204);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

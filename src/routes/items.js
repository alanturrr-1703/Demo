const express = require('express');
const router = express.Router();

// Sample data (to be replaced with database operations)
let items = [
  { id: 1, name: 'Item 1', description: 'Description of Item 1' },
  { id: 2, name: 'Item 2', description: 'Description of Item 2' },
  { id: 3, name: 'Item 3', description: 'Description of Item 3' }
];

// GET all items
router.get('/', (req, res) => {
  res.json(items);
});

// GET a specific item by ID
router.get('/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// POST a new item
router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }
  const newItem = { id: items.length + 1, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update an existing item
router.put('/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const { name, description } = req.body;
  const index = items.findIndex(item => item.id === itemId);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  items[index] = { id: itemId, name, description };
  res.json(items[index]);
});

// DELETE an item
router.delete('/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === itemId);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  items.splice(index, 1);
  res.status(204).end();
});

module.exports = router;

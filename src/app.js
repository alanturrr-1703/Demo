const express = require('express');
const app = express();
const itemsRouter = require('./routes/items');

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/items', itemsRouter);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to my Node.js/Express application!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../src/routes/items')

const app = express();
app.use(bodyParser.json());
app.use('/', router);


describe('GET /', () => {
  it('should respond with all items', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body).toHaveLength(3); // Assuming 3 items are initially loaded
  });
});

describe('GET /:id', () => {
  it('should respond with a specific item', async () => {
    const response = await request(app).get('/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('should respond with 404 if item does not exist', async () => {
    const response = await request(app).get('/999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Item not found');
  });
});

describe('POST /', () => {
  it('should create a new item', async () => {
    const newItem = { name: 'New Item', description: 'Description of New Item' };
    const response = await request(app).post('/').send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newItem.name);
    expect(response.body.description).toBe(newItem.description);
  });

  it('should respond with 400 if name or description is missing', async () => {
    const response = await request(app).post('/').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Name and description are required');
  });
});

describe('PUT /:id', () => {
  it('should update an existing item', async () => {
    const updatedItem = { name: 'Updated Item', description: 'Description of Updated Item' };
    const response = await request(app).put('/1').send(updatedItem);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe(updatedItem.name);
    expect(response.body.description).toBe(updatedItem.description);
  });

  it('should respond with 404 if item does not exist', async () => {
    const response = await request(app).put('/999').send({ name: 'Updated Item' });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Item not found');
  });
});

describe('DELETE /:id', () => {
  it('should delete an existing item', async () => {
    const response = await request(app).delete('/1');
    expect(response.status).toBe(204);
  });

  it('should respond with 404 if item does not exist', async () => {
    const response = await request(app).delete('/999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Item not found');
  });
});
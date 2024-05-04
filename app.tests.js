const request = require('supertest');
const app = require('./app');

describe('CRUD Operations', () => {
  let newItemId;

  it('should add a new item', async () => {
    const res = await request(app)
      .post('/items')
      .send({
        name: 'Test Item',
        description: 'This is a test item.'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    newItemId = res.body.id;
  });

  it('should get all items', async () => {
    const res = await request(app)
      .get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a specific item', async () => {
    const res = await request(app)
      .get(`/items/${newItemId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(newItemId);
  });

  it('should update an item', async () => {
    const res = await request(app)
      .put(`/items/${newItemId}`)
      .send({
        name: 'Updated Test Item',
        description: 'This is an updated test item.'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Test Item');
  });

  it('should delete an item', async () => {
    const res = await request(app)
      .delete(`/items/${newItemId}`);
    expect(res.statusCode).toBe(204);
  });
});

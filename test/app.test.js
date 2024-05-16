const request = require('supertest');
const app = require('../src/app');

describe('CRUD Operations', () => {
  let newItemId;

  beforeAll(async () => {
    // Wait for the server to start listening before running tests
    await new Promise(resolve => {
      app.listen(3001, () => {
        console.log("Server is running on port 3001");
        resolve();
      });
    });
  });

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

  // Add more test cases here...

  afterAll(() => {
    // Close the server after all tests are done
    app.close();
  });
});

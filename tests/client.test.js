const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Client = require('../models/client.model');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await Client.deleteMany();
  await mongoose.connection.close();
});

describe('Client API', () => {
  it('should create a new client', async () => {
    const res = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${process.env.TEST_ADMIN_TOKEN}`)
      .send({ name: 'John Doe', email: 'john@example.com', phone: '1234567890' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('John Doe');
  });
});

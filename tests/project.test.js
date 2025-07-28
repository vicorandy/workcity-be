const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Project = require('../models/project.model');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await Project.deleteMany();
  await mongoose.connection.close();
});

describe('Project API', () => {
  it('should update a project', async () => {
    const project = await Project.create({
      title: 'Initial',
      description: 'Desc',
      client: new mongoose.Types.ObjectId(),
    });

    const res = await request(app)
      .put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${process.env.TEST_ADMIN_TOKEN}`)
      .send({ title: 'Updated', description: 'Updated desc', client: project.client });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated');
  });
});


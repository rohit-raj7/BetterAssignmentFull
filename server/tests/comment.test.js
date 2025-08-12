const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Comment = require('../models/Comment');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/comments_test_db';

beforeAll(async () => {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Comment.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Comment APIs', () => {
  let taskId = new mongoose.Types.ObjectId();
  let createdId;

  test('create comment', async () => {
    const res = await request(app)
      .post('/api/comments')
      .send({ taskId, author: 'Test', text: 'hello world' });
    expect(res.statusCode).toBe(201);
    expect(res.body.author).toBe('Test');
    createdId = res.body._id;
  });

  test('get comments for task', async () => {
    const res = await request(app).get(`/api/comments/task/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.items ? res.body.items.length : res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('update comment', async () => {
    const res = await request(app).put(`/api/comments/${createdId}`).send({ text: 'updated' });
    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe('updated');
    expect(res.body.edited).toBe(true);
  });

  test('delete comment', async () => {
    const res = await request(app).delete(`/api/comments/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/);
  });
});
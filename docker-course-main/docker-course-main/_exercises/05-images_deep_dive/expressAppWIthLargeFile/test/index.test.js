const request = require('supertest');
const app = require('../index');

describe('Simple Express App', () => {

  test('GET / should return welcome message', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('Welcome to the simple express app!');
  });

  test('POST /user should fail if userID is missing', async () => {
    const res = await request(app)
      .post('/user')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Missing user ID.');
  });

  test('POST /user should create a new user', async () => {
    const res = await request(app)
      .post('/user')
      .send({ userID: 'u1' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User created');
    expect(res.body.userID.userID).toBe('u1');
  });

  test('POST /user should not allow duplicate userID', async () => {
    const res = await request(app)
      .post('/user')
      .send({ userID: 'u1' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Duplicate user ID.');
  });

  test('GET /user should return all users', async () => {
    const res = await request(app).get('/user');

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('u1');
  });

});

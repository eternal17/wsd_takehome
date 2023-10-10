import { app } from './server';
import request from 'supertest';
import jwt from 'jsonwebtoken';

const secretKey = 'encryptedSecretKey';

// API integration tests

describe('POST /login', () => {
  test('should return 200 and token for valid username and password', async () => {
    const response = await request(app)
      .post('/login')
      .send({ name: 'admin', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});

describe('POST /odds', () => {
  test('should return 401 if missing token', async () => {
    const response = await request(app)
      .post('/odds')
      .send({ eventUrl: 'https://notokenprovided.com' });

    expect(response.status).toBe(401);
  });

  test('should return 404 if odds could not be scraped from given url', async () => {
    // mock a valid token
    const user = { name: 'admin', password: 'password' };
    const token = jwt.sign(user, secretKey);
    const response = await request(app)
      .post('/odds')
      .set('Authorization', `Bearer ${token}`)
      .send({
        eventUrl:
          'https://www.betfair.com/sport/horse-racing/meeting?eventId=32700712&raceTime=1696941420000&dayToSearch=20231010&marketId=924.378972469',
      });

    expect(response.status).toBe(404);
  });
});

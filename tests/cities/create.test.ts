import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Create City', () => {
  let accessToken = '';

  beforeAll(async () => {
    const email = 'test@gmail.com';
    await testServer.post('/sign-up').send({
      name: 'John',
      email,
      password: '1234567',
    });
    const signInResp = await testServer
      .post('/sign-in')
      .send({ email, password: '1234567' });
    accessToken = signInResp.body.accessToken;
  });
  it('try create an register without a access token', async () => {
    const resp1 = await testServer.post('/create-city').send({
      name: 'Tokyo',
    });
    expect(resp1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resp1.body).toHaveProperty('errors.default');
  });
  it('create register', async () => {
    const resp1 = await testServer
      .post('/create-city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Tokyo',
      });
    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resp1.body).toEqual('number');
  });

  it('try create an register with a short name', async () => {
    const resp1 = await testServer
      .post('/create-city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'To',
      });
    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.name');
  });
});

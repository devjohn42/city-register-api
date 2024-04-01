import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetAll Cities', () => {
  let accessToken = '';

  beforeAll(async () => {
    const email = 'test@gmail.com';
    await testServer.post('/sign-up').send({
      name: 'Tokyo',
      email,
      password: '1234567',
    });
    const signInResp = await testServer
      .post('/sign-in')
      .send({ email, password: '1234567' });
    accessToken = signInResp.body.accessToken;
  });

  it('try consulting without use the token authentication', async () => {
    const resp1 = await testServer.get('/cities').send();

    expect(resp1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resp1.body).toHaveProperty('errors.default');
  });

  it('Search all registers', async () => {
    const resp1 = await testServer
      .post('/create-city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Tokyo',
      });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const respSearch = await testServer
      .get('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(respSearch.header['x-total-count'])).toBeGreaterThan(0);
    expect(respSearch.statusCode).toEqual(StatusCodes.OK);
    expect(respSearch.body.length).toBeGreaterThan(0);
  });
});

import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetById City', () => {
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

  it('Search an register by id', async () => {
    const resp1 = await testServer
      .post('/create-city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Tokyo',
      });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer
      .get(`/city/${resp1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body).toHaveProperty('name');
  });
  it('Search an register if it dot not exist', async () => {
    const resp1 = await testServer
      .get('/city/2')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resp1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp1.body).toHaveProperty('errors.default');
  });
});

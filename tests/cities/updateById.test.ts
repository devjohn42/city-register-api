import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('UpdateById City', () => {
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

  it('Update an register', async () => {
    const resp1 = await testServer
      .post('/create-city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Tokyo',
      });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const respUpdated = await testServer
      .put(`/city-update/${resp1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Osaka' });

    expect(respUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('try update an register if it dot not exist', async () => {
    const resp1 = await testServer
      .put('/city-update/2')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Okinawa' });

    expect(resp1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp1.body).toHaveProperty('errors.default');
  });
});

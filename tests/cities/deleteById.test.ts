import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('DeleteById City', () => {
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
  it('try delete an register without use token authentication', async () => {
    const resp1 = await testServer.delete('/city-delete/1').send({
      name: 'Tokyo',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resp1.body).toHaveProperty('errors.default');
  });
  it('delete register', async () => {
    const resp1 = await testServer
      .post('/create-city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Tokyo',
      });
    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const respDeleted = await testServer
      .delete(`/city-delete/${resp1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(respDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('try to delete a record if it dot not exist', async () => {
    const resp1 = await testServer
      .delete('/city-delete/2')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resp1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp1.body).toHaveProperty('errors.default');
  });
});

import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('DeleteById - Person', () => {
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
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ email, password: '1234567' });
    accessToken = signInResp.body.accessToken;
  });

  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const respCity = await testServer
      .post('/create-city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Tokyo',
      });

    cityId = respCity.body;
  });

  it('delete register', async () => {
    const resp1 = await testServer
      .post('/create-person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Mark',
        email: 'mark@gmail.com',
        cityId,
      });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const respDeleted = await testServer
      .delete(`/person-delete/${resp1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(respDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('try delele an register if does not exists', async () => {
    const resp1 = await testServer
      .delete('/person-delete/2')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resp1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp1.body).toHaveProperty('errors.default');
  });
});

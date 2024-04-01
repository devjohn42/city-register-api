import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Create Person', () => {
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

  it('Create a register', async () => {
    const resp1 = await testServer
      .post('/create-person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Mark',
        email: 'mark@gmail.com',
        cityId,
      });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resp1.body).toEqual('number');
  });
  it('Try to create a register with a duplicate email', async () => {
    const resp1 = await testServer
      .post('/create-person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Mark',
        email: 'same@gmail.com',
        cityId,
      });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resp1.body).toEqual('number');

    const resp2 = await testServer
      .post('/create-person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'John',
        email: 'same@gmail.com',
        cityId,
      });

    expect(resp2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp2.body).toHaveProperty('errors.default');
  });
  it('Try create an register with a short name', async () => {
    const resp1 = await testServer
      .post('/create-person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Jo',
        email: 'mark@gmail.com',
        cityId,
      });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.name');
  });
  it('Try create an register without a name', async () => {
    const resp1 = await testServer
      .post('/create-person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: '',
        email: 'john@gmail.com',
        cityId,
      });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.name');
  });
  it('Try create an register without an email', async () => {
    const resp1 = await testServer
      .post('/create-person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'John',
        email: '',
        cityId,
      });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.email');
  });
  it('Try create an register with a invalid email', async () => {
    const resp1 = await testServer
      .post('/create-person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Kevin',
        email: 'invalid23 1@gmail.com',
        cityId,
      });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.email');
  });
});

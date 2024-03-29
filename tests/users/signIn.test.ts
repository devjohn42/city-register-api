import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('SignIn Users', () => {
  beforeAll(async () => {
    await testServer.post('/sign-up').send({
      name: 'Mark',
      password: '1234567',
      email: 'mark@gmail.com',
    });
  });

  it('Login', async () => {
    const resp1 = await testServer.post('/sign-in').send({
      password: '1234567',
      email: 'mark@gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.OK);
    expect(resp1.body).toHaveProperty('accessToken');
  });

  it('Invalid Password', async () => {
    const resp1 = await testServer.post('/sign-in').send({
      password: '12345678',
      email: 'mark@gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it('Invalid Email', async () => {
    const resp1 = await testServer.post('/sign-in').send({
      password: '1234567',
      email: 'mark2@gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resp1.body).toHaveProperty('errors.default');
  });

  it('Invalid Email format', async () => {
    const resp1 = await testServer.post('/sign-in').send({
      password: '1234567',
      email: 'mar k@gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.email');
  });

  it('Short Password', async () => {
    const resp1 = await testServer.post('/sign-in').send({
      password: '1234',
      email: 'mark@gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.password');
  });

  it('Password not provided', async () => {
    const resp1 = await testServer.post('/sign-in').send({
      password: '',
      email: 'mark@gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.password');
  });

  it('Email not provided', async () => {
    const resp1 = await testServer.post('/sign-in').send({
      password: '1234567',
      email: '',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.email');
  });
});

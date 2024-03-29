import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('SignUp Users', () => {
  it('Register user 1', async () => {
    const resp1 = await testServer.post('/sign-up').send({
      name: 'Mark',
      password: '1234567',
      email: 'mark@gmail.com',
    });
    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resp1.body).toEqual('number');
  });

  it('Register User 2', async () => {
    const resp1 = await testServer.post('/sign-up').send({
      name: 'John',
      password: '7654321',
      email: 'john@gmail.com',
    });
    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resp1.body).toEqual('number');
  });

  it('Error when registering a duplicate user', async () => {
    const resp1 = await testServer.post('/sign-up').send({
      name: 'Mark',
      password: '1234567',
      email: 'mark22@gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resp1.body).toEqual('number');

    const resp2 = await testServer.post('/sign-up').send({
      name: 'John',
      password: '7654321',
      email: 'mark22@gmail.com',
    });

    expect(resp2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp2.body).toHaveProperty('errors.default');
  });

  it('Error when registering a user without a email', async () => {
    const resp1 = await testServer.post('/sign-up').send({
      name: 'John',
      password: '1234567',
      email: '',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.email');
  });

  it('Error when registering a user without a name', async () => {
    const resp1 = await testServer.post('/sign-up').send({
      name: '',
      password: '1234567',
      email: 'jack@gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.name');
  });

  it('Error when registering a user without a password', async () => {
    const resp1 = await testServer.post('/sign-up').send({
      name: 'Jack',
      password: '',
      email: 'jack@gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.password');
  });

  it('Error when registering a user with an invalid email', async () => {
    const resp1 = await testServer.post('/sign-up').send({
      name: 'Jack',
      password: '1234567',
      email: 'jack @gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.email');
  });

  it('Error when registering a user with a short name', async () => {
    const resp1 = await testServer.post('/sign-up').send({
      name: 'Ja',
      password: '1234567',
      email: 'jack@gmail.com',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.name');
  });
});

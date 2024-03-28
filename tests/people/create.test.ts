import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Create Person', () => {
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const respCity = await testServer.post('/create-city').send({
      name: 'Tokyo',
    });

    cityId = respCity.body;
  });

  it('Create a register', async () => {
    const resp1 = await testServer.post('/create-person').send({
      name: 'Mark',
      email: 'mark@gmail.com',
      cityId,
    });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resp1.body).toEqual('number');
  });
  it('Try create an register with a short name', async () => {
    const resp1 = await testServer.post('/create-person').send({
      name: 'Jo',
      email: 'mark@gmail.com',
      cityId,
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.name');
  });
  it('Try create an register without a name', async () => {
    const resp1 = await testServer.post('/create-person').send({
      nome: '',
      email: 'john@gmail.com',
      cityId,
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.name');
  });
  it('Try create an register without an email', async () => {
    const resp1 = await testServer.post('/create-person').send({
      nome: 'John',
      email: '',
      cityId,
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.email');
  });
  it('Try create an register with a invalid email', async () => {
    const resp1 = await testServer.post('/create-person').send({
      nome: 'Kevin',
      email: 'invalid23 1@gmail.com',
      cityId,
    });

    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.email');
  });
});

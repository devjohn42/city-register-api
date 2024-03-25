import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Create City', () => {
  it('create register', async () => {
    const resp1 = await testServer.post('/create-city').send({
      name: 'Tokyo',
      country: 'Japan',
    });
    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resp1.body).toEqual('number');
  });
  it('try create an register with a short name', async () => {
    const resp1 = await testServer.post('/create-city').send({
      name: 'To',
    });
    expect(resp1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resp1.body).toHaveProperty('errors.body.name');
  });
});

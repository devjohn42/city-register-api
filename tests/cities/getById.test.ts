import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetById City', () => {
  it('Search an register by id', async () => {
    const resp1 = await testServer.post('/create-city').send({
      name: 'Tokyo',
      country: 'Japan',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get(`/city/${resp1.body}`).send();

    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body).toHaveProperty('name');
    expect(resSearch.body).toHaveProperty('country');
  });
  it('Search an register if it dot not exist', async () => {
    const resp1 = await testServer.get('/city/2').send();

    expect(resp1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp1.body).toHaveProperty('errors.default');
  });
});

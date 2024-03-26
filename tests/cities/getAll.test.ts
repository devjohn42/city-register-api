import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetAll Cities', () => {
  it('Search all registers', async () => {
    const resp1 = await testServer.post('/create-city').send({
      name: 'Tokyo',
      country: 'Japan',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const respSearch = await testServer.get('/cities').send();

    expect(Number(respSearch.header['x-total-count'])).toBeGreaterThan(0);
    expect(respSearch.statusCode).toEqual(StatusCodes.OK);
    expect(respSearch.body.length).toBeGreaterThan(0);
  });
});

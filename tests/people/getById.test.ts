import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetById Person', () => {
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const respCity = await testServer.post('/create-city').send({
      name: 'Tokyo',
    });

    cityId = respCity.body;
  });

  it('Search register by ID', async () => {
    const resp1 = await testServer.post('/create-person').send({
      name: 'John',
      email: 'johnny@gmail.com',
      cityId,
    });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const respSearched = await testServer.get(`/person/${resp1.body}`).send();

    expect(respSearched.statusCode).toEqual(StatusCodes.OK);
    expect(respSearched.body.name).toBeTruthy();
    expect(respSearched.body).toHaveProperty('name');
    expect(respSearched.body).toHaveProperty('email');
    expect(respSearched.body).toHaveProperty('cityId');
  });

  it('Search a register if does not exists', async () => {
    const resp1 = await testServer.get('/person/2').send();

    expect(resp1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp1.body).toHaveProperty('errors.default');
  });
});

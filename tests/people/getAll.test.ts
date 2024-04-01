import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetAll People', () => {
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

  it('Search all registers', async () => {
    const resp1 = await testServer
      .post('/create-person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Mark',
        email: 'mark@gmail.com',
        cityId,
      });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const resp2 = await testServer
      .post('/create-person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'John',
        email: 'john@gmail.com',
        cityId,
      });

    expect(resp2.statusCode).toEqual(StatusCodes.CREATED);

    const respSearched = await testServer
      .get('/people')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(respSearched.header['x-total-count'])).toBeGreaterThan(0);
    expect(respSearched.statusCode).toEqual(StatusCodes.OK);
    expect(respSearched.body.length).toBeGreaterThan(0);
  });
});

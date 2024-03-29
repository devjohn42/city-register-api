import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('DeleteById - Person', () => {
  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const respCity = await testServer.post('/create-city').send({
      name: 'Tokyo',
    });

    cityId = respCity.body;
  });

  it('delete register', async () => {
    const resp1 = await testServer.post('/create-person').send({
      name: 'Mark',
      email: 'mark@gmail.com',
      cityId,
    });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const respDeleted = await testServer
      .delete(`/person-delete/${resp1.body}`)
      .send();

    expect(respDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('try delele an register if does not exists', async () => {
    const resp1 = await testServer.delete('/person-delete/2').send();

    expect(resp1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp1.body).toHaveProperty('errors.default');
  });
});

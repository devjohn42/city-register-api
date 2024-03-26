import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('UpdateById City', () => {
  it('Update an register', async () => {
    const resp1 = await testServer.post('/create-city').send({
      name: 'Tokyo',
      country: 'Japan',
    });

    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const respUpdated = await testServer
      .put(`/city-update/${resp1.body}`)
      .send({ name: 'Osaka' });

    expect(respUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('try update an register if it dot not exist', async () => {
    const resp1 = await testServer
      .put('/city-update/2')
      .send({ name: 'Okinawa' });

    expect(resp1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp1.body).toHaveProperty('errors.default');
  });
});

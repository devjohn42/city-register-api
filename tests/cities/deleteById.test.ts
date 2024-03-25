import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('DeleteById City', () => {
  it('delete register', async () => {
    const resp1 = await testServer.post('/create-city').send({
      name: 'Tokyo',
      country: 'Japan',
    });
    expect(resp1.statusCode).toEqual(StatusCodes.CREATED);

    const respDeleted = await testServer
      .delete(`/city-delete/${resp1.body}`)
      .send();

    expect(respDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('try to delete a record if it dot not exist', async () => {
    const resp1 = await testServer.delete('/city-delete/2').send();

    expect(resp1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp1.body).toHaveProperty('errors.default');
  });
});

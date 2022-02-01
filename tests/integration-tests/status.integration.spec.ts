import 'jest'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import app from '../../api/app'
import logger from '../../api/utils/logger'

// Disable all logs
logger.silent = true

describe('/user endpoint', () => {
  it('can create user', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        firstName: 'Joe',
        lastName: 'Biden'
      })
      .set('Accept', 'application/json')
      .expect((res: request.Response) => {
        // eslint-disable-next-line no-console
        res.body.firstName = 'Joe'
      })
      .expect(StatusCodes.CREATED)
  })
})

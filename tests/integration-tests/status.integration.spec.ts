import 'jest'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import app from '../../api/app'
import logger from '../../api/utils/logger'

// Disable all logs
logger.silent = true

describe('/encode endpoint', () => {
  it('can encode URL', async () => {
    await request(app)
      .post('/api/v1/encode')
      .send({
        url: 'http://www.facebook.com'
      })
      .set('Accept', 'application/json')
      .expect((res: request.Response) => {
        // eslint-disable-next-line no-console
        res.body.shortURL = 'http://short.est/ZGYwMTg'
      })
      .expect(StatusCodes.OK)
  })
  it('can prefix default protocol and encode URL', async () => {
    await request(app)
      .post('/api/v1/encode')
      .send({
        url: 'www.facebook.com'
      })
      .set('Accept', 'application/json')
      .expect((res: request.Response) => {
        // eslint-disable-next-line no-console
        res.body.originalURL = 'http://www.facebook.com'
      })
      .expect(StatusCodes.OK)
  })
  it('can validate encode URL input', async () => {
    await request(app)
      .post('/api/v1/encode')
      .send({
        url: 'facebook'
      })
      .set('Accept', 'application/json')
      .expect(StatusCodes.BAD_REQUEST)
  })
  it('can validate encode URL schema', async () => {
    await request(app)
      .post('/api/v1/encode')
      .send()
      .set('Accept', 'application/json')
      .expect(StatusCodes.BAD_REQUEST)
  })
})

describe('/decode endpoint', () => {
  it('can decode URL', async () => {
    await request(app)
      .post('/api/v1/decode')
      .send({
        shortURL: 'http://short.est/ZGYwMTg'
      })
      .set('Accept', 'application/json')
      .expect((res: request.Response) => {
        // eslint-disable-next-line no-console
        res.body.originalURL = 'http://www.facebook.com'
      })
      .expect(StatusCodes.OK)
  })
  it('can validate decode URL schema', async () => {
    await request(app)
      .post('/api/v1/decode')
      .send()
      .set('Accept', 'application/json')
      .expect(StatusCodes.BAD_REQUEST)
  })
  it('can return error on invalid URL format for decode', async () => {
    await request(app)
      .post('/api/v1/decode')
      .send({
        shortURL: 'FAYwMTg'
      })
      .set('Accept', 'application/json')
      .expect(StatusCodes.BAD_REQUEST)
  })
  it('can return error if short URL not found for decode', async () => {
    await request(app)
      .post('/api/v1/decode')
      .send({
        shortURL: 'http://short.est/FAYwMTg'
      })
      .set('Accept', 'application/json')
      .expect(StatusCodes.NOT_FOUND)
  })
})

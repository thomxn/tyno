import { Response } from 'express'
import logger from './logger'

export type ResponseHeaders = Map<string, string | string[]>

interface ErrorResponseInterface {
  message: string
  data?: any
}

const applyResponseHeaders = (res: Response, headers?: ResponseHeaders): Response => {
  // Default headers
  res.setHeader('Cache-Control', 'private,max-age=0')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if (headers != null) {
    for (const [header, value] of headers) {
      res.setHeader(header, value)
    }
  }
  return res
}

export const successResponse = (res: Response, status = 200, body?: any, headers?: ResponseHeaders): Response => {
  applyResponseHeaders(res, headers)
  return res.status(status ?? 200).send(body)
}

export const errorResponse =
  (res: Response, status = 400, body?: ErrorResponseInterface, headers?: ResponseHeaders): Response => {
    applyResponseHeaders(res, headers)
    if (body == null) {
      body = {
        message: 'Something went wrong'
      }
    }
    logger.error(`Error response - ${status ?? 500} - `, { body })
    return res.status(status).send({
      error: body
    })
  }

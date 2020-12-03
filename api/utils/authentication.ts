import { NextFunction, Request, Response } from 'express'

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send('Authorization required')
    }

    const userIdentity: UserIdentity = {
      name: 'user name'
    }

    req.user = userIdentity

    return next()
  } catch (err) {
    return res.status(500).send(err)
  }
}

export interface UserIdentity {
  name: string
  // Other general user data
}

export default authenticate

import express from 'express'
import { validationResult, ValidationChain, ValidationError } from 'express-validator'

interface PrettyErrorInterface {
  message: string
}
const validate = (validations: ValidationChain[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await Promise.all(validations.map(async validation => await validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    res.status(400).json({ errors: formatValidationErrors(errors.array()) })
  }
}

const formatValidationErrors = (errors: ValidationError[]): PrettyErrorInterface[] => {
  return errors.map(error => error.msg)
}

export default validate

import { Router } from 'express'
import userController from '../../controllers/users'
// import authenticate from '../../utils/authentication'

const baseRouter = Router()

baseRouter.route('/')
  .get(userController.getUsers)
  .post(userController.createUser)

export default baseRouter

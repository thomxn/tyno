import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import logger from '../utils/logger'

const basename = path.basename(module.filename)

const routes = Router()
/**
 * Method to mount the endpoints at the given directory so that the
 * route endpoints have the directory name as prefix
 * @param mountPath version directory name
 * @param route Router object to mount the endpoints
 */
function routeMounter (mountPath: string, route: Router) {
  try {
    fs.readdirSync(path.join(__dirname, mountPath))
      .filter(
        file =>
          file.indexOf('.') !== 0 &&
          file !== basename &&
          (file.slice(-3) === '.js' || file.slice(-3) === '.ts')
      )
      .forEach(file => {
        /* Prefix the endpoint mounted from a route file with
       the name of the file inorder to avoid collitions
       Eg: All API routes from users.ts will have the prefix api/v1/users
       Substring method is used to separate filename from extension
       Eg: users from users.js
      */
        const endpoint = `/${mountPath}/${file.substring(0, file.length - 3)}`
        const moduleRoutes = require(path.join(__dirname, mountPath, file))
          .default

        route.use(endpoint, moduleRoutes)
      })
  } catch (err) {
    logger.error(JSON.stringify(err))
  }
}

routeMounter('v1', routes)

export default routes

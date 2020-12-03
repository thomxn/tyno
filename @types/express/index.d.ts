import { UserIdentity } from '../../api/utils/authentication'

declare global{
    namespace Express {
        interface Request {
            user: UserIdentity
        }
    }
}

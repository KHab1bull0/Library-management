import { getOne } from "../services/universal.service.js";


export const roleGuard =  (roles) => {
    return async (req, res, next) => {

        const user = await getOne('users', 'email', req.user.email)
        if(!roles.includes(user[0].role)){
            return res.status(400).send({
                message: `${user[0].role} role is not authorized to access this route`
            })
        }
        next()
    }
}


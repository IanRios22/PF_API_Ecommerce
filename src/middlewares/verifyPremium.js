import jwt from 'jsonwebtoken';
import { HttpResponse,errorsDictionary } from '../utils/http.response.js';
import UserMongoDao from '../persistence/daos/mongodb/users/user.dao.js';
import config from '../config/config.js';

const userDao = new UserMongoDao();
const SECRET_KEY = config.SECRET_KEY_JWT;
const httpResponse = new HttpResponse();

export const verifyPremium = async (req, res, next) => {
    try {
        const token = await req.cookies.token;
        const decode = jwt.verify(token, SECRET_KEY);
        console.log('DECODIFICADO');
        console.log(decode);
        const user = await userDao.getById(decode.userId);
        if(user.role === 'premium') {
            next();
        }else{
            return httpResponse.Unauthorized(res,errorsDictionary.ERROR_TOKEN);
        }
    } catch (error) {
        return httpResponse.Unauthorized(res,errorsDictionary.ERROR_TOKEN)
    }
}
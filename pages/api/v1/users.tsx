import {NextApiRequest, NextApiResponse} from "next";

import {User} from "../../../src/entity/User";
import md5 from 'md5';
import getDatabaseConnection from "../../../lib/getDatabaseConnection";

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {username, password, passwordConfirmation} = req.body
        const conn = await getDatabaseConnection();

        res.setHeader('Content-Type', 'application/json;charset=utf-8')


        const user = new User();
        user.username = username.trim()
        user.passwordDigest = md5(password)
        user.passwordConfirmation = passwordConfirmation;
        user.connection = conn;
        user.password = password
        await user.validate()
        if (user.hasErrors()) {
            res.statusCode = 400
            res.write(JSON.stringify(user.errors))
        } else {

            await conn.manager.save(user)
            res.statusCode = 200
            res.write(JSON.stringify(user))
        }
        res.end()
    } else {
        res.statusCode = 405;
        res.end();
    }


}


export default Users;


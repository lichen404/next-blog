import {NextApiHandler} from 'next';
import getDatabaseConnection from "../../../lib/getDatabaseConnection";
import {User} from "../../../src/entity/User";
import md5 from "md5";
import {SignIn} from "../../../src/model/SignIn";

const Sessions: NextApiHandler = async (req, res) => {
    const {username, password} = req.body

    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const signIn = new SignIn(username, password)
    await signIn.validate()
    if (signIn.hasErrors()) {
        res.statusCode = 404;
        res.end(JSON.stringify(signIn.errors))

    } else {
        res.statusCode = 200;
        res.end(JSON.stringify(signIn.user))
    }


    res.end();
};
export default Sessions;

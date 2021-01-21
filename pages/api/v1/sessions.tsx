import {NextApiHandler} from 'next';
import {SignIn} from "../../../src/model/SignIn";
import withSession from "../../../lib/withSession";

const Sessions: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        const {username, password} = req.body
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        const signIn = new SignIn(username, password)
        await signIn.validate()
        if (signIn.hasErrors()) {
            res.statusCode = 404;
            res.end(JSON.stringify(signIn.errors))

        } else {
            req.session.set('currentUser', signIn.user)
            await req.session.save()
            res.statusCode = 200;
            res.end(JSON.stringify(signIn.user))
        }
    } else if (req.method === 'DELETE') {
        req.session.destroy();
        res.statusCode = 200;
        res.end('logged out')

    } else {
        res.statusCode = 405;
        res.end()
    }


};
export default withSession(Sessions);

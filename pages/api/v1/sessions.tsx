import {NextApiHandler} from 'next';
import {SignIn} from "../../../src/model/SignIn";
import withSession from "../../../lib/withSession";

const Sessions: NextApiHandler = async (req, res) => {
    const {username, password} = req.body
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const signIn = new SignIn(username, password)
    await signIn.validate()
    if (signIn.hasErrors()) {
        res.statusCode = 404;
        res.end(JSON.stringify(signIn.errors))

    } else {
        req.session.set('currentUser',signIn.user)
        req.session.save()
        res.statusCode = 200;
        res.end(JSON.stringify(signIn.user))
    }

};
export default withSession(Sessions);

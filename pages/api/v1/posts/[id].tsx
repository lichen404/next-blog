import {NextApiHandler} from 'next';

const post: NextApiHandler = async (req, res) => {
    //TODO
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.statusCode = 200;
    res.write('')
    res.end();
}
export default post;

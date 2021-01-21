import {NextApiHandler} from 'next';
import getDatabaseConnection from "../../../../lib/getDatabaseConnection";
import withSession from "../../../../lib/withSession";

const post: NextApiHandler = withSession(async (req, res) => {
    if (req.method === 'PATCH') {
        const conn = await getDatabaseConnection()
        const {id} = req.query;
        const {title, content} = req.body
        const post = await conn.manager.findOne<Post>('Post', id.toString())
        post.title = title;
        post.content = content;
        const user = req.session.get('currentUser');
        if (!user) {
            res.statusCode = 401;
            res.end();
            return;
        }
        await conn.manager.save(post);
        res.json(post)

    } else if (req.method === 'DELETE') {
        const conn = await getDatabaseConnection()
        const {id} = req.query;
        const result = await conn.manager.delete('Post', id.toString())
        res.statusCode = result.affected >= 0 ? 200 : 400;
        res.end()

    }
    else {
        res.statusCode = 405;
        res.end()
    }

})

export default post;

import React from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import getDatabaseConnection from "../../lib/getDatabaseConnection";
import {Post} from "../../src/entity/Post";
import marked from "marked";
import Link from 'next/link';
import withSession from "../../lib/withSession";
import {User} from "../../next-env";

type Props = {
    post: Post,
    currentUser: User | null
}
const postsShow: NextPage<Props> = (props) => {
    const {post, currentUser} = props;
    return (
        <div className="wrapper">
            <h1>{post.title}</h1>
            <p>
                {currentUser && <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}>
                    <a>编辑</a>
                </Link>}
            </p>
            <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}}/>
            <style jsx>
                {`
                  .wrapper {
                    max-width: 800px;
                    margin: 16px auto;
                    padding: 0 16px;
                  }

                  h1 {
                    padding-bottom: 16px;
                    border-bottom: 1px solid #666;
                  }
                `

                }
            </style>
        </div>
    );
};
export default postsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(async (context: GetServerSidePropsContext) => {
    const conn = await getDatabaseConnection()
    const post = await conn.manager.findOne(Post, context.params.id.toString())
    const currentUser = (context.req as any).session.get('currentUser') || null
    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
            currentUser
        }
    }

})

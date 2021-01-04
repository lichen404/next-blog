import React, {useCallback} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import getDatabaseConnection from "../../lib/getDatabaseConnection";
import {Post} from "../../src/entity/Post";
import marked from "marked";
import Link from 'next/link';
import withSession from "../../lib/withSession";
import {User} from "../../next-env";
import axios from "axios";
import {Layout} from "../../components/Layout";
import day from "../../lib/day";


type Props = {
    post: Post,
    currentUser: User | null
}
const postsShow: NextPage<Props> = (props) => {
    const {post, currentUser} = props;
    const deletePost = useCallback(() => {
        axios.delete(`/api/v1/posts/${post.id}`).then(() => {
            window.alert('删除成功')
        }, () => {
            window.alert('删除失败')
        })
    }, [post.id])
    return (
        <Layout>
            <div className="wrapper">
                <h1>{post.title}</h1>
                <div className="postHeader">
                    <div className="postMeta">
                        <span>Author:
                    <a href="#">{post.author.username}</a>
                </span>
                        <span>Date:
                    <a
                        href="#">{day(post.createdAt).format('MMM D, YYYY H:mm')}</a>
                </span>
                    </div>

                    {currentUser &&
                    <p className="actions">
                        <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}>
                            <a>编辑</a>
                        </Link>
                        <button onClick={deletePost}>删除</button>
                    </p>}
                </div>

                <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}}/>
                <style jsx>
                    {`
                      .postMeta > span > a {
                        color: #2d96bd;
                        margin: 0 4px;
                      }

                      .postMeta > span {
                        color: rgba(85, 85, 85, 0.529);
                      }

                      .postHeader {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 32px;
                      }

                      .actions > * {
                        margin: 4px;
                      }

                      .actions > *:first-child {
                        margin-left: 0;
                      }

                      .wrapper {
                        max-width: 800px;
                        margin: 16px auto;
                        padding: 0 16px;
                      }
                   

                    `

                    }
                </style>
            </div>
        </Layout>
    );
};
export default postsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(async (context: GetServerSidePropsContext) => {
    const conn = await getDatabaseConnection()
    const post = await conn.manager.findOne(Post, context.params.id.toString(), {
        relations: ['author', 'comments']
    })
    const currentUser = (context.req as any).session.get('currentUser') || null
    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
            currentUser
        }
    }

})

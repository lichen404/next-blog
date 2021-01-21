import React, {useCallback} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import getDatabaseConnection from "../../lib/getDatabaseConnection";
import {Post} from "../../src/entity/Post";
import marked from "marked";
import Link from 'next/link';
import withSession from "../../lib/withSession";

import axios from "axios";
import {Layout} from "../../components/Layout";
import day from "../../lib/day";
import {User} from "../../src/entity/User";
import {useRouter} from "next/router";


type Props = {
    post: Post,
    currentUser: User | null
}
const postsShow: NextPage<Props> = (props) => {
    const {post, currentUser} = props;
    const router = useRouter()
    const deletePost = useCallback(() => {
        axios.delete(`/api/v1/posts/${post.id}`).then(() => {
            window.alert('删除成功')
            router.push('/posts').then()
        }, () => {
            window.alert('删除失败')
        })
    }, [post.id])
    const confirmDeletePost = () => {
        //TODO
        if (window.confirm('确定要删除文章吗？')) {
            deletePost()
        }
    }
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
                        <button onClick={confirmDeletePost}>删除</button>
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

                      .actions > *:hover {
                        color: #2d96bd;
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

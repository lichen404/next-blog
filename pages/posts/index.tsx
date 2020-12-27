import React from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage,} from 'next';
import Link from "next/link";
import qs from "query-string"
import getDatabaseConnection from "../../lib/getDatabaseConnection";
import {Post} from "../../src/entity/Post";
import {usePager} from "../../hooks/usePager";
import withSession from "../../lib/withSession";
import {User} from "../../next-env";


export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
    const conn = await getDatabaseConnection()
    const {query} = qs.parseUrl(context.req.url)
    const page = parseInt(query.page?.toString()) || 1
    const pageSize = parseInt(query['page_size']?.toString()) || 10
    const currentUser = (context.req as any).session.get('currentUser') || null
    const [posts, count] = await conn.manager.findAndCount(Post, {skip: (page - 1) * pageSize, take: pageSize})

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            totalCount: count,
            pageSize,
            page,
            totalPage: Math.ceil(count / pageSize),
            currentUser

        }
    }

})
type Props = {
    posts: Post[];
    totalCount: number,
    totalPage: number,
    page: number,
    pageSize: number,
    currentUser:User | null;


}
const Posts: NextPage<Props> = function (props) {
    const {posts, totalCount, totalPage, page, pageSize,currentUser} = props;
    const {pager} = usePager({totalCount, page, totalPage, pageSize})
    return (
        <div className="posts">
            <header>
                <h1>文章列表</h1>
                { currentUser && <Link href="/posts/new"><a>新增文章</a></Link>}
            </header>
            {
                posts.map(post => (
                    <div key={post.id} className="onePost">
                        <Link href={`/posts/${post.id}`}>
                            <a>{post.title}</a>
                        </Link>
                    </div>


                ))
            }
            <footer>
                {pager}
            </footer>
            <style jsx>
                {
                    `
                    .posts {
                      max-width: 800px;
                      margin: 0 auto;
                      padding: 16px;
                    }
                    .posts > header {
                      display: flex;
                      align-items: center;
                    }
                    .posts >header >h1 {
                      margin-bottom:0;
                      margin-top: 0;
                      margin-right: auto;
                    }
                    .onePost {
                      border-bottom: 1px solid #ddd; 
                      color: #000;
                      padding: 8px 0;
                    }
                    .onePost > a {
                       border-bottom: none;
                       color:#000;
                    }
                    .onePost > a:hover {
                      color:#00adb5;
                    }
                    footer {
                       text-align: center;
                    }
                    `
                }
            </style>
        </div>

    );


}

export default Posts;

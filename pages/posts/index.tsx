import React from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage,} from 'next';
import Link from "next/link";
import qs from "query-string"
import getDatabaseConnection from "../../lib/getDatabaseConnection";
import {Post} from "../../src/entity/Post";
import {usePager} from "../../hooks/usePager";
import withSession from "../../lib/withSession";
import day from "../../lib/day";
import {Layout} from "../../components/Layout";
import {User} from "../../src/entity/User";


export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
    const conn = await getDatabaseConnection()
    const {query} = qs.parseUrl(context.req.url)
    const page = parseInt(query.page?.toString()) || 1
    const pageSize = parseInt(query['page_size']?.toString()) || 10
    const currentUser = (context.req as any).session.get('currentUser') || null
    const [posts, count] = await conn.manager.findAndCount(Post, {
        skip: (page - 1) * pageSize, take: pageSize, order: {
            createdAt: "DESC"
        }
    })

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
    currentUser: User | null;


}
const Posts: NextPage<Props> = function (props) {
    const {posts, totalCount, totalPage, page, pageSize, currentUser} = props;
    const {pager} = usePager({totalCount, page, totalPage, pageSize})
    const hash: { [key: string]: Post[] } = {}
    posts.forEach(p => {
        const key = day(p.createdAt).format('YYYY')
        if (!(key in hash)) {
            hash[key] = []
        }
        hash[key].push(p)
    })
    const result = Object.entries(hash).sort((x,y)=>{
        if(x[0] > y[0]){
            return -1
        }
        else if(x[0] < y[0]){
            return 1
        }
        else {
            return  0
        }
    })
    return (
        <Layout>
        <div className="posts">
            <header>
                {currentUser && <Link href="/posts/new"><a>新增文章</a></Link>}
            </header>
            {result.length!==0?
                result.map(([year, posts]) => (
                    <div key={year}><h3 className="postYear">{year}</h3>
                        {
                            posts.map((post) =>

                                <div key={post.id} className="onePost">
                                    <Link href={`/posts/${post.id}`}>
                                        <a>{post.title}</a>

                                    </Link>
                                    <span>{day(post.createdAt).format('LL')}</span>
                                </div>
                            )
                        }

                    </div>
                )):<div className="noPost">
                    <img src="/404.png" alt="404"/><span>
                    还没有文章，快去创建一篇吧</span>
                </div>
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
                      .postYear {
                        margin: 16px 0;
                      }

                      .posts > header {
                        text-align: right;
                        margin-bottom: 20px;
                      }
                      header > a:hover {
                        color:#2d96bd;
                      }

                   

                      .onePost {
                        color: #000;
                        padding: 8px 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-left: 20px;
                      }

                      .onePost > a {
                        border-bottom: none;

                      }

                      .onePost > a:hover {
                        color: #2d96bd;
                      }

                      .onePost > span {
                        color: #a9a9b3;
                      }
                      .noPost {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-top: 200px;
                      }
                      .noPost > img{
                          max-width: 100px;
                      }

                      footer {
                        text-align: center;
                      }
                    `
                }
            </style>
        </div>
        </Layout>

    );


}

export default Posts;

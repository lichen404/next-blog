import React from 'react';
import {GetServerSideProps, NextPage,} from 'next';
import {Post} from "../src/entity/Post";
import getDatabaseConnection from "../lib/getDatabaseConnection";
import Link from "next/link";
import qs from "query-string"
import {usePager} from "../hooks/usePager";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const conn = await getDatabaseConnection()
    const {query} = qs.parseUrl(context.req.url)
    const page = parseInt(query.page?.toString()) || 1
    const pageSize = parseInt(query['page_size']?.toString()) || 10
    const [posts,count] = await conn.manager.findAndCount(Post, {skip: (page - 1) * pageSize, take: pageSize})

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            totalCount:count,
            pageSize,
            page,
            totalPage:Math.ceil(count/pageSize)

        }
    }

}
type Props = {
    posts: Post[];
    totalCount:number,
    totalPage:number,
    page:number,
    pageSize:number


}
const Home: NextPage<Props> = function (props) {
    const {posts,totalCount,totalPage,page,pageSize} = props;
    const {pager} = usePager({totalCount,page,totalPage,pageSize})
    return (
        <div>
            <h1>文章列表</h1>
            {
                posts.map(post => (
                    <div key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            <a>{post.title}</a>
                        </Link>
                    </div>


                ))
            }
            <footer>
                {pager}
            </footer>
        </div>

    );


}

export default Home;

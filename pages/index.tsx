import React from 'react';
import {GetServerSideProps, NextPage,} from 'next';
import {Post} from "../src/entity/Post";
import getDatabaseConnection from "../lib/getDatabaseConnection";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const conn = await getDatabaseConnection()
    const posts = await conn.manager.find(Post)
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    }

}
type Props = {
    posts: Post[]
}
const Home: NextPage<Props> = function (props) {
    const {posts} = props;
    return (
        <div>
            <h1>文章列表</h1>
            {
                posts.map(post => (
                    <Link key={post.id} href={`/posts/${post.id}`}>
                        <a>{post.title}</a>
                    </Link>

                ))
            }
        </div>

    );


}

export default Home;

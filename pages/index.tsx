import {NextPage} from 'next';
import Link from 'next/link';
import React from "react";

const Home: NextPage = () => {
    return (
        <>
            <div className="cover">
                <img src="/logo.png" alt=""/>
                <h1>李晨的个人博客</h1>
                <p>这是我使用 Next.js 制作的博客</p>
                <p><Link href="/posts"><a>文章列表</a></Link></p>
            </div>
            <style jsx>
                {`
                  .cover {
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                  }
                  img {
                    width: 10em;
                  }
                `

                }
            </style>
        </>
    )
}
export default Home;

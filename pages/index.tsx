import {NextPage} from 'next';

import React from "react";
import {Layout} from "../components/Layout";

const Home: NextPage = () => {
    return (
        <>

            <Layout>
                <div className="wrapper">
                    <img src="/logo.png" alt=""/>
                    <h1>李晨的个人博客</h1>
                    <p>这是我使用 Next.js 制作的博客</p>
                </div>

            </Layout>

            <style jsx>
                {`

                  .wrapper{
                    text-align: center;
                   transform: translateY(20vh);
                  }
                  img {
                    width: 10em;
                  }

                  h1 {
                    margin: 20px 0;
                  }

                  a {
                    display: inline-block;
                    margin-top: 10px;
                  }

                  a:hover {
                    text-decoration: underline;
                    color: #2d96bd;
                  }
                `

                }
            </style>
        </>
    )
}
export default Home;

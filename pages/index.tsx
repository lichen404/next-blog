import {NextPage} from 'next';
import {Navbar} from "../components/Navbar";
import React from "react";

const Home: NextPage = () => {
    return (
        <>

            <div className="cover">
                <Navbar/>
                <div className="wrapper">
                    <img src="/logo.png" alt=""/>
                    <h1>李晨的个人博客</h1>
                    <p>这是我使用 Next.js 制作的博客</p>
                </div>


            </div>
            <style jsx>
                {`
                  .cover {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                  }
                  .wrapper {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  }

                  img {
                    width: 10em;
                    margin-top: 200px;
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

import React from "react";
import Link from 'next/link';

export  const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <Link href="/"><a>lichen's blog</a></Link>
                    <div className="menu">
                        <Link href="/posts"><a>Posts</a></Link>
                        <Link href="/about"><a>About</a></Link>
                    </div>
                </div>

            </nav>
            <style jsx>
                {`
                  .navbar {
                    line-height: 64px;
                    z-index: 1;
                  }

                  .navbar > .container {
                    max-width: 1200px;
                    padding: 0 10px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                  }

                  .navbar > .container > .menu > a {
                    padding: 0 8px;
                  }
                  a:hover {
                      color: #2d96bd;
                  }
                `

                }
            </style>
        </>
    )
}

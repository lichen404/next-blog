import React, {useContext} from 'react';
import Link from 'next/link';
import {Switch} from './Switch';
import Context from './Context';

export  const Navbar = () => {
    const {isDarkTheme,setDarkTheme} = useContext(Context)
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <Link href="/"><a>lichen's blog</a></Link>
                    <div className="menu">
                        <Link href="/posts"><a>Posts</a></Link>
                        <Link href="/about"><a>About</a></Link>
                        <div>
                            <Switch isDarkTheme={isDarkTheme} setDarkTheme={setDarkTheme}/>
                        </div>

                    </div>
                </div>

            </nav>
            <style jsx>
                {`
                  .navbar {
                    line-height: 64px;
                  }

                  .navbar > .container {
                    max-width: 1200px;
                    padding: 0 10px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                  }
                  .navbar > .container > .menu {
                    display: flex;
                    align-items: center;
                   
                  }
                  .navbar > .container > .menu > a,div {
                    padding: 0 8px;
                    display: flex;
                    align-items: center;
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

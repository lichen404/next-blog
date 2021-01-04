import React from "react";
import {Navbar} from "./Navbar";

export const Layout: React.FC = (props) => {
    return (
        <>
            <div className="wrapper">
                <Navbar/>
                <div className="container">
                    {props.children}
                </div>


            </div>
            <style jsx>
                {`
                  .wrapper {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                  }

                  .container {
                    flex: 1;
                  }
                `}
            </style>
        </>
    )
}

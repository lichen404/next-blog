import React from "react";

export const Center: React.FC = (props) => {
    return (
        <>
            <div className="wrapper">

                <div className="container">
                    {props.children}
                </div>


            </div>
            <style jsx>
                {`
                  .wrapper {
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }

                  .container {
                   
                  }
                `}
            </style>
        </>
    )
}

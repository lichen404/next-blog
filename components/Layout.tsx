import React, {useEffect, useState} from 'react';
import {Navbar} from './Navbar';
import Context from './Context';

export const Layout: React.FC = (props) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const value = {
        isDarkTheme,
        setDarkTheme(value: boolean) {
            setIsDarkTheme(value);
            localStorage.setItem('isDarkTheme', JSON.stringify(value));
        }
    };
    useEffect(() => {
        value.setDarkTheme(JSON.parse(localStorage.getItem('isDarkTheme') || 'false'));
    }, []);
    return (
        <> <Context.Provider value={value}>
            <div className={`wrapper${value.isDarkTheme ? ' dark-theme' : ''}`}>
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
        </Context.Provider>
        </>
    );
};

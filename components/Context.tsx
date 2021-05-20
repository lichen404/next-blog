import {createContext} from 'react';

type Context = {
    isDarkTheme:boolean,
    setDarkTheme:(value:boolean)=>void
}
export default createContext<Context>(null);

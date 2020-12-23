import * as next from 'next';
import {Session} from "next-iron-session";

declare module "*.png" {
    const value:string;
    export default  value;
}
declare module "*.css";

type Post = {
    id:string;
    title:string;
    date:string;
    content:string;
    htmlContent:string;
}
declare module 'next' {
    interface NextApiRequest {
        session:Session
    }
}

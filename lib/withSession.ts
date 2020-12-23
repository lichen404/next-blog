import {withIronSession} from "next-iron-session";
import {GetServerSideProps, NextApiHandler} from "next";

export default function withSession(handler: NextApiHandler | GetServerSideProps) {
    return withIronSession(handler, {
        password: process.env.SECRET,
        cookieName: 'blog',
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production'

        }
    })
}

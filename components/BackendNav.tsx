import React, {useCallback} from "react";
import {useRouter} from "next/router";
import {User} from "../src/entity/User";
import axios from "axios";

type Props = {
    currentUser: User
    content: FormContent
}
export const BackendNav: React.FC<Props> = (props) => {
    const router = useRouter()
    const {currentUser, content} = props
    const login = useCallback(() => {
        const date = new Date().toISOString()
        router.push(`/sign_in?return_to=${encodeURIComponent(router.pathname)}&save_time=${date}`).then();
        localStorage.setItem('cache', JSON.stringify({
            content,
            date
        }))

    }, [content])
    const logout = useCallback(() => {
        axios.delete('/api/v1/sessions').then(() => {
            router.push('/posts').then()
        })
    }, [])
    const confirmLogout = () => {
        //TODO
        if (window.confirm('确定要注销吗？任何未保存的内容将丢失')) {
            logout()
        }
    }
    return (
        <>

            <nav>
                <ul className="topNavbar">
                    {currentUser ?
                        <>
                            <li>
                                <span>{currentUser.username}</span>
                            </li>
                            <li>
                                <button onClick={confirmLogout}>
                                    注销
                                </button>

                            </li>
                        </> :
                        <li>
                            <button onClick={login}>
                                登录
                            </button>
                        </li>
                    }
                </ul>
            </nav>


            <style jsx>
                {`
                  nav {
                    text-align: right;
                    margin: 0 10px;
                  }

                  .topNavbar {
                    display: inline-flex;
                    align-items: center;

                  }

                  ul.topNavbar > li {
                    padding: 8px 10px;
                    list-style: none;
                  }

                `}
            </style>
        </>
    )
}

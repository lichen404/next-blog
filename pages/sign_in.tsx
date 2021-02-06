import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React, {useEffect} from "react";
import {User} from "../src/entity/User";
import axios from "axios";
import {useForm} from "../hooks/useForm";
import withSession from "../lib/withSession";
import {useRouter} from "next/router";
import {Center} from "../components/Center";
import Link from "next/link"

const SignIn: NextPage<{ user: User }> = (props) => {
    const router = useRouter()
    useEffect(()=>{
        if(props.user){
            router.push('/posts').then()
        }
    },[])
    const {form} = useForm({
        initFormData: {username: "", password: ""},
        fields: [
            {label: "用户名", type: 'text', key: "username"},
            {label: "密码", type: 'password', key: "password"},
        ],
        buttonText:"登录",
        submit: {
            request: formData => axios.post('/api/v1/sessions', formData),
            success: () => {
                window.alert('登录成功')
                const {query: {return_to, save_time: time}} = router
                if (return_to) {
                    router.push(return_to.toString() + `?save_time=${time}`).then()
                } else {
                    router.push('/posts').then()
                }
            }
        }
    })
    return (
        <>
            <Center>
                <div className="container">
                    <h1 className="title">登录</h1>
                    {form}
                    <span className="tip">尚无账号，立即<Link href="/sign_up"><a>注册</a></Link></span>
                </div>
            </Center>
            <style jsx>
                {
                    `
                      .container {
                        padding: 60px;
                        border: 1px solid #333;
                        border-radius: 6px;
                      }

                      .title {
                        margin-bottom: 20px;
                      }

                      .tip {
                        color: #333;
                      }

                      .tip > a {
                        color: #2d96bd;
                      }

                    `
                }
            </style>
        </>
    )


}
export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
    async (context: GetServerSidePropsContext) => {
        //@ts-ignore
        const user = context.req.session.get('currentUser');
        return {
            props: {
                user: JSON.parse(JSON.stringify(user || ''))
            }
        }
    }
)

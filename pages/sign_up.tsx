import {NextPage} from "next";
import React from "react";
import axios from "axios";
import {useForm} from "../hooks/useForm";
import {Center} from "../components/Center";
import {useRouter} from "next/router";
import Link from "next/link";

const SignUp: NextPage = () => {
    const router = useRouter()
    const {form} = useForm({
        initFormData: {username: '', password: '', passwordConfirmation: ''}, fields: [
            {label: '用户名', type: 'text', key: 'username',},
            {label: '密码', type: 'password', key: 'password',},
            {label: '确认密码', type: 'password', key: 'passwordConfirmation',}
        ],
        buttonText: "注册",
        submit: {
            request: formData => axios.post(`/api/v1/users`, formData),
            success: () => {
                window.alert('注册成功')
                router.push('/sign_in').then()
            }
        }
    });
    return (


        <Center>

            <div className="container">
                <h1 className="title">注册</h1>
                {form}
                <span className="tip">已有账号，立即<Link href="/sign_in"><a>登录</a></Link></span>
            </div>
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
        </Center>


    )
}
export default SignUp;

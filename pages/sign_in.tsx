import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from "react";
import {User} from "../src/entity/User";
import axios from "axios";
import {useForm} from "../hooks/useForm";
import withSession from "../lib/withSession";
import {useRouter} from "next/router";
import {Center} from "../components/Center";

const SignIn: NextPage<{ user: User }> = (props) => {
    const router = useRouter()
    const {form} = useForm({
        initFormData: {username: "", password: ""},
        fields: [
            {label: "用户名", type: 'text', key: "username"},
            {label: "密码", type: 'password', key: "password"},
        ],
        buttons: <button type="submit">登录</button>,
        submit: {
            request: formData => axios.post('/api/v1/sessions', formData),
            success: () => {
                window.alert('登录成功')
                const {query: {return_to,save_time:time}} = router
                if (return_to) {
                    router.push(return_to.toString() + `?save_time=${time}`).then()
                }
            }
        }
    })
    return (
        <Center>
            <h1>登录</h1>
            {form}
        </Center>
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

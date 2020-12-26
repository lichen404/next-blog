import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from "react";
import {User} from "../src/entity/User";
import axios from "axios";
import {useForm} from "../hooks/useForm";
import withSession from "../lib/withSession";
import qs from 'query-string'

const SignIn: NextPage<{ user: User }> = (props) => {
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
                const query = qs.parse(window.location.search)
                if (query.return_to) {
                    window.location.href = query.return_to.toString()
                }
            }
        }
    })
    return (
        <>
            <h1>登录</h1>
            {form}
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

import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from "react";
import axios, {AxiosError} from "axios";
import useArticle from "../../hooks/useArticle";
import {useRouter} from "next/router";
import withSession from 'lib/withSession';
import {BackendNav} from "../../components/BackendNav";
import {User} from "../../src/entity/User";

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {

    const currentUser = (context.req as any).session.get('currentUser') || null

    return {
        props: {
            currentUser
        }
    }

})
type Props = {
    currentUser:User
}
const PostsNew: NextPage<Props> = (props) => {
    const {currentUser} = props
    const router = useRouter()
    const {articleForm,article} = useArticle({
        initFormData: {
            title: "",
            content: ""
        },
        submit: {
            request(formData) {
                return axios.post(`/api/v1/posts`, formData)
            },
            success() {
                window.alert('保存成功')
                router.push('/posts').then()
            },
            back() {
                //TODO
                if(window.confirm('确定要离开吗？任何未保存的内容将丢失')){
                    router.push('/posts').then()
                }

            },
            fail(error: AxiosError, content: FormContent) {
                if (error.response) {
                    const response = error.response
                    if (response.status === 400 || response.status === 404) {
                        window.alert('保存失败')
                    } else if (response.status === 401) {
                        window.alert('请先登录');
                        const date = new Date().toISOString()
                        localStorage.setItem('cache', JSON.stringify({
                            content,
                            date
                        }))
                        router.push(`/sign_in?return_to=${encodeURIComponent(router.pathname)}&save_time=${date}`).then();
                    }
                }
            }
        }
    })
    return (
        <>
            <BackendNav currentUser={currentUser} content={article}/>
            <div className="wrapper">
                {articleForm}
            </div>
            <style jsx>
                {
                    `
                    .wrapper {
                      max-width: 1600px;
                      margin: 0 auto;
                    } 
                    `
                }

            </style>

        </>

    )
}

export default PostsNew;


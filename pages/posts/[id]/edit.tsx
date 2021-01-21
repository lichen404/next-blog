import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from "react";
import getDatabaseConnection from "../../../lib/getDatabaseConnection";
import {Post} from "../../../src/entity/Post";
import withSession from "../../../lib/withSession";
import useArticle from "../../../hooks/useArticle";
import axios, {AxiosError} from "axios";
import {useRouter} from "next/router";
import {BackendNav} from "../../../components/BackendNav";
import {User} from "../../../src/entity/User";

type Props = {
    post: Post,
    id: number,
    currentUser: User
}
const PostsEdit: NextPage<Props> = (props: Props) => {
    const router = useRouter()
    const {articleForm, article} = useArticle({
        initFormData: props.post,
        submit: {
            request(formData) {
                return axios.patch(`/api/v1/posts/${props.id}`, formData)
            },
            success() {
                window.alert('修改成功')
                router.push(`/posts/${props.id}`).then()
            },
            back() {
                //TODO
                if (window.confirm('确定要离开吗？任何未保存的内容将丢失')) {
                    router.push(`/posts/${props.id}`).then()
                }

            },
            fail(error: AxiosError) {
                if (error.response) {
                    const response = error.response
                    if (response.status === 400 || response.status === 404) {
                        window.alert('修改失败')
                    } else if (response.status === 401) {
                        window.alert('请先登录');
                        router.push(`/sign_in?return_to=${encodeURIComponent(router.pathname)}`).then();
                    }
                }
            }
        }
    })

    return (
        <>
            <BackendNav currentUser={props.currentUser} content={article}/>
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

export default PostsEdit;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(async (context: GetServerSidePropsContext) => {
    const conn = await getDatabaseConnection()
    const post = await conn.manager.findOne(Post, context.params.id.toString())
    const currentUser = (context.req as any).session.get('currentUser') || null


    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
            id: context.params.id,
            currentUser
        }
    }

})

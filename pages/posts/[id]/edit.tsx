import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from "react";
import getDatabaseConnection from "../../../lib/getDatabaseConnection";
import {Post} from "../../../src/entity/Post";
import withSession from "../../../lib/withSession";
import useArticle from "../../../hooks/useArticle";
import axios, {AxiosError} from "axios";

type Props = {
    post: Post,
    id:number
}
const PostsEdit: NextPage<Props> = (props: Props) => {
    const {articleForm} = useArticle({
        initFormData: props.post,
        submit: {
            request(formData) {
                return axios.patch(`/api/v1/posts/${props.id}`, formData)
            },
            success() {
                window.alert('修改成功')
            },
            fail(error: AxiosError) {
                if (error.response) {
                    const response = error.response
                    if (response.status === 400 || response.status === 404) {
                        window.alert('修改失败')
                    } else if (response.status === 401) {
                        window.alert('请先登录');
                        window.location.href = `/sign_in?return_to=${encodeURIComponent(window.location.pathname)}`;
                    }
                }
            }
        }
    })

    return (
        <div>
            {articleForm}
        </div>
    )


}

export default PostsEdit;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(async (context: GetServerSidePropsContext) => {
    const conn = await getDatabaseConnection()
    const post = await conn.manager.findOne(Post, context.params.id.toString())
    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
            id:context.params.id
        }
    }

})

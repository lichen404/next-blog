import {NextPage} from 'next';
import React from "react";
import axios, {AxiosError} from "axios";
import useArticle from "../../hooks/useArticle";
import {Layout} from "../../components/Layout";


const PostsNew: NextPage = () => {
    const {articleForm} = useArticle({
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
            },
            fail(error: AxiosError) {
                if (error.response) {
                    const response = error.response
                    if (response.status === 400 || response.status === 404) {
                        window.alert('保存失败')
                    } else if (response.status === 401) {
                        window.alert('请先登录');
                        window.location.href = `/sign_in?return_to=${encodeURIComponent(window.location.pathname)}`;
                    }
                }
            }
        }
    })
    return (
        <>
            {articleForm}

        </>

    )
}

export default PostsNew;

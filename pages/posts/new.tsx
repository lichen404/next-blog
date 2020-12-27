import {NextPage} from 'next';
import React, {ChangeEvent, useCallback, useState} from "react";
import axios, {AxiosError} from "axios";
import dynamic from "next/dynamic";
import 'react-markdown-editor-lite/lib/index.css';
import marked from "marked";

const MdEditor = dynamic(() =>
        import('react-markdown-editor-lite')
    , {ssr: false});

const PostsNew: NextPage = () => {
    const [article, setArticle] = useState({
        title: "",
        content: ""
    })
    const handleEditorChange = useCallback(({text}: { text: string }) => {
        setArticle({...article, content: text})

    }, [article])
    const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setArticle({...article, title: e.target.value})
    }, [article])
    const submit = useCallback(() => {
        axios.post(`/api/v1/posts`, article
        ).then(() => {
                window.alert('保存成功')
            },
            (error: AxiosError) => {
                if (error.response) {
                    const response = error.response
                    if (response.status === 400 || response.status === 404) {
                        window.alert('保存失败')
                    } else if (response.status === 401) {
                        window.alert('请先登录');
                        window.location.href = `/sign_in?return_to=${encodeURIComponent(window.location.pathname)}`;
                    }
                }
            })

    }, [article])
    return (
        <div>
            <label>
                标题
                <input type="text" value={article.title}
                       onChange={handleTitleChange}/>
            </label>

            <MdEditor style={{height: "500px"}} renderHTML={(text: string) =>
                marked(text)
            } onChange={handleEditorChange}/>
            <button onClick={submit}>保存</button>
        </div>
    )
}
export default PostsNew;

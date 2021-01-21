import {AxiosError, AxiosResponse} from "axios";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import 'react-markdown-editor-lite/lib/index.css';
import marked from "marked";


const MdEditor = dynamic(() =>
        import('react-markdown-editor-lite')
    , {ssr: false});

type useArticleOptions = {
    initFormData: FormContent;
    submit: {
        request: (formData: FormContent) => Promise<AxiosResponse>;
        success: () => void;
        fail: (error: AxiosError, content: FormContent) => void;
        back: () => void;
    }

}
const useArticle = (options: useArticleOptions) => {

    const {initFormData, submit: {request, success, fail, back}} = options
    const [article, setArticle] = useState(initFormData)
    const router = useRouter()
    const {query: {save_time: time}} = router
    useEffect(() => {
        if (time) {
            const cache = JSON.parse(localStorage.getItem('cache'));
            if (cache.date === time) {
                setArticle(cache.content)
            }
        }
    }, [])
    const handleEditorChange = useCallback(({text}: { text: string }) => {
        setArticle({...article, content: text})

    }, [article])
    const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setArticle({...article, title: e.target.value})
    }, [article])
    const submit = useCallback(() => {
        if (article.title) {
            request(article).then(success, (error) => fail(error, article)
            )
        } else {
            window.alert('标题不能为空')
        }


    }, [article, success, fail, request])

    const articleForm = (
        <div>
            <input type="text" value={article.title}
                   placeholder="请填写标题"
                   className="title"
                   onChange={handleTitleChange}/>
            <MdEditor style={{height: "500px"}} renderHTML={(text: string) =>
                marked(text)
            } onChange={handleEditorChange} value={article.content}/>
            <div className="buttonList">

                <button onClick={submit}>保存</button>
                <button onClick={back}>取消</button>


            </div>
            <style jsx>
                {
                    `
                      .buttonList {
                        display: flex;
                        justify-content: center;
                        margin-top: 10px;
                      }

                      .buttonList > button {
                        padding: 4px 10px;
                        border: 1px solid #2d96bd;
                        border-radius: 4px;
                      }

                      .buttonList > button:first-child {
                        margin-right: 8px;

                      }

                      .title {
                        width: 50%;
                        border: none;
                        border-bottom: 1px solid #2d96bd;
                        font-size: 24px;
                        line-height: 32px;
                        margin-bottom: 16px;
                      }
                    `
                }

            </style>
        </div>
    )
    return {
        articleForm,
        article
    }
}
export default useArticle;

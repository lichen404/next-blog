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
        fail: (error:AxiosError,content:FormContent) => void;
    }

}
const useArticle = (options: useArticleOptions) => {

    const {initFormData, submit: {request, success, fail}} = options
    const [article, setArticle] = useState(initFormData)
    const {query:{save_time:time}} = useRouter()
    useEffect(()=>{
        if(time){
            const cache = JSON.parse(localStorage.getItem('cache'));
            if(cache.date===time){
                setArticle(cache.content)
            }
        }
    },[])
    const handleEditorChange = useCallback(({text}: { text: string }) => {
        setArticle({...article, content: text})

    }, [article])
    const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setArticle({...article, title: e.target.value})
    }, [article])
    const submit = useCallback(() => {

        request(article).then(success, (error)=>fail(error,article)
        )

    }, [article,success,fail,request])
    const articleForm = (
        <div>
            <label>
                标题
                <input type="text" value={article.title}
                       onChange={handleTitleChange}/>
            </label>

            <MdEditor style={{height: "500px"}} renderHTML={(text: string) =>
                marked(text)
            } onChange={handleEditorChange} value={article.content}/>
            <button onClick={submit}>保存</button>
        </div>
    )
    return {
        articleForm
    }
}
export default useArticle;

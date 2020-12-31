import {AxiosError, AxiosResponse} from "axios";
import React, {ChangeEvent, useCallback, useState} from "react";
import dynamic from "next/dynamic";
import 'react-markdown-editor-lite/lib/index.css';
import marked from "marked";


const MdEditor = dynamic(() =>
        import('react-markdown-editor-lite')
    , {ssr: false});
type formData = { title: string, content: string }
type useArticleOptions = {
    initFormData: formData;
    submit: {
        request: (formData: formData) => Promise<AxiosResponse>;
        success: () => void;
        fail: (error:AxiosError) => void;
    }

}
const useArticle = (options: useArticleOptions) => {
    const {initFormData, submit: {request, success, fail}} = options
    const [article, setArticle] = useState(initFormData)
    const handleEditorChange = useCallback(({text}: { text: string }) => {
        setArticle({...article, content: text})

    }, [article])
    const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setArticle({...article, title: e.target.value})
    }, [article])
    const submit = useCallback(() => {

        request(article).then(success, fail
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

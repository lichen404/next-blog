import {ReactChild, useCallback, useState} from "react";
import React from "react";
import {AxiosError, AxiosResponse} from "axios";
import {useRouter} from "next/router";

type Field<T> = {
    label: string,
    type: "text" | "password" | 'textarea',
    key: keyof T
}

type useFormOptions<T> = {
    initFormData: T;
    fields: Field<T>[];
    buttons: ReactChild;
    submit: {
        request: (formData: T) => Promise<AxiosResponse<T>>;
        success: () => void;
    }

}

export function useForm<T>(options: useFormOptions<T>) {
    const router = useRouter()
    const {initFormData, fields, buttons, submit} = options
    // 非受控
    const [formData, setFormData] = useState(initFormData)
    const [errors, setErrors] = useState(() => {
        const e: { [k in keyof T]?: string[] } = {}
        for (let key in initFormData) {
            if (initFormData.hasOwnProperty(key)) {
                e[key] = []
            }
        }
        return e
    })
    //不加依赖会是什么样(过时的闭包)
    const onChange = useCallback((key: keyof T, value) => {
        setFormData({
            ...formData, [key]: value
        })
    }, [formData])
    const _onSubmit = useCallback((e) => {
        e.preventDefault()

        submit.request(formData).then(
            submit.success
            , (error: AxiosError) => {
                if (error.response) {
                    const response = error.response
                    if (response.status === 400 || response.status === 404) {
                        setErrors(response.data)
                    } else if (response.status === 401) {
                        window.alert('请先登录');
                        router.push(`/sign_in?return_to=${encodeURIComponent(router.pathname)}`).then();
                    }
                }
            })
    }, [submit, formData])
    const form = (
        <form onSubmit={_onSubmit}>
            {
                fields.map(field =>
                    <div key={field.key.toString()}>
                        <label>{field.label}
                            {field.type === 'textarea' ?
                                <textarea onChange={(e) => onChange(field.key, e.target.value)}/>
                                :
                                <input type={field.type} value={formData[field.key].toString()}
                                       onChange={(e) => onChange(field.key, e.target.value)}/>
                            }

                        </label>
                        {errors[field.key]?.length > 0 && <div> {errors[field.key].join(',')}</div>}
                    </div>
                )

            }
            <div>
                {buttons}
            </div>
        </form>
    )
    return {
        form,
        setErrors
    }
}

import {NextPage} from "next";
import React, {useCallback, useState} from "react";
import axios, {AxiosError} from "axios";

const SignUp: NextPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: ""
    })
    const [errors, setErrors] = useState({
        username: [],
        password: [],
        passwordConfirmation: []
    })
    const onSubmit = useCallback((e) => {
        e.preventDefault()
        axios.post(`/api/v1/users`, formData).then(() => {

        }, (error: AxiosError) => {
            if (error.response.status === 422) {
                setErrors(error.response.data)
            }
        })
    }, [])
    return (
        <>
            <h1>注册</h1>
            <form>
                <div>
                    <label>用户名
                        <input type="text" defaultValue={formData.username}
                        />
                    </label>
                    <label>密码
                        <input type="password" defaultValue={formData.password}/>
                    </label>
                    <label>确认密码
                        <input type="password" defaultValue={formData.passwordConfirm}/>
                    </label>
                </div>
            </form>
        </>
    )
}
export default SignUp;

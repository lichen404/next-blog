import getDatabaseConnection from "../../lib/getDatabaseConnection";
import {User} from "../entity/User";
import md5 from "md5";

export class SignIn {
    username: string;
    password: string;
    user: User

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password
    }

    errors = {username: [] as string[], password: [] as string[]};

    async validate() {
        if (this.username.trim() === '') {
            this.errors.username.push('请填写用户名')
        } else {
            const conn = await getDatabaseConnection()
            const user = await conn.manager.findOne(User, {
                where: {
                    username: this.username
                }

            })
            if (user) {
                if (user.passwordDigest !== md5(this.password)) {
                    this.errors.password.push('密码与用户名不匹配')
                } else {
                    this.user = user
                }
            }
            else {
                this.errors.username.push('用户名不存在')
            }
        }


    }

    hasErrors() {
        return !!Object.values(this.errors).find(v => v.length > 0)
    }
}

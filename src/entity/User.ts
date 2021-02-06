import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    Connection,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";
import md5 from "md5";
import _ from 'lodash';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    username: string;
    @Column('varchar')
    passwordDigest: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToMany('Post', 'author')
    posts: Post[];
    @OneToMany('Comment', 'user')
    comments: Comment[];
    errors = {username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[]};
    password: string;
    passwordConfirmation: string;
    connection:Connection;

    async validate() {
        if (this.username.trim() === '') {
            this.errors.username.push('不能为空')
        }
        if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
            this.errors.username.push('格式不合法')
        }
        if (this.username.trim().length <= 3) {
            this.errors.username.push('用户名称太短')
        }
        if (this.password === '') {
            this.errors.password.push('不能为空')
        }
        if (this.password !== this.passwordConfirmation) {
            this.errors.passwordConfirmation.push('密码不匹配')
        }
        const found = await this.connection.manager.findOne(User, {username: this.username})
        if (found) {
            this.errors.username.push('已存在，不能重复注册')
        }
    }

    hasErrors() {
        return !!Object.values(this.errors).find(v => v.length > 0)
    }

    @BeforeInsert()
    generatePasswordDigest() {
        this.passwordDigest = md5(this.password)
    }

    toJSON() {
        return _.omit(this, ['password', 'passwordConfirmation', 'passwordDigest', 'errors','connection'])
    }
}

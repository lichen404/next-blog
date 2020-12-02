import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar') public title: string
    @Column('text') content: string

    constructor(attr: Partial<Post>) {
        Object.assign(this, attr)
    }
}

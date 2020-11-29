import axios from 'axios';
import {useEffect, useState} from 'react';

type Post = {
    id:string;
    date:string;
    title:string
}
const usePosts = ()=>{
    const [posts,setPosts] = useState<Post[]>([])
    useEffect(() => {
        axios.get('/api/v1/posts').then(res => {
            setPosts(res.data)
        });
    }, []);
    return {
        posts,
        setPosts
    }
}
export {usePosts}
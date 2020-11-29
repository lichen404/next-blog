import fs, {promises as fsPromise} from 'fs'
import path from "path";
import matter from 'gray-matter'
import marked from 'marked';

const markdownDir = path.join(process.cwd(), 'markdown')
const getPosts = async () => {

    const fileNames = await fsPromise.readdir(markdownDir)
    return fileNames.map(filename => {
        const fullPath = path.join(markdownDir, filename)
        const id = filename.replace(/\.md$/g, '')
        const text = fs.readFileSync(fullPath, 'utf-8')
        const {data: {title, date}, content} = matter(text)
        const htmlContent = marked(content)
        return {
            id,
            title,
            date,
            content,
            htmlContent
        }

    })

}
export {getPosts}

export const getPost  =async (id:string)=>{
    const fullPath = path.join(markdownDir, id + '.md')
    const text = fs.readFileSync(fullPath, 'utf-8')
    const {data: {title, date}, content} = matter(text)
    const htmlContent = marked(content)
    return {
        id,
        title,
        date:date.toISOString(),
        content,
        htmlContent
    }
}
export const getPostIds = async ()=>{
    const fileNames = await fsPromise.readdir(markdownDir)
    return fileNames.map(fileName=>fileName.replace(/\.md/g,''))
}

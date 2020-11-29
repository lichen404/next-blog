import fs, {promises as fsPromise} from 'fs'
import path from "path";
import matter from 'gray-matter'

const getPosts = async () => {
    const markdownDir = path.join(process.cwd(), 'markdown')
    const fileNames = await fsPromise.readdir(markdownDir)
    return fileNames.map(filename => {
        const fullPath = path.join(markdownDir, filename)
        const id = filename.replace(/\.md$/g, '')
        const text = fs.readFileSync(fullPath, 'utf-8')
        const {data: {title, date}, content} = matter(text)

        return {
            id,
            title,
            date,
            content
        }

    })

}
export {getPosts}

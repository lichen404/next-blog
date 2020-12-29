import {createConnection, getConnectionManager} from "typeorm";
import 'reflect-metadata'
import {Post} from 'src/entity/Post';
import {User} from "../src/entity/User";
import {Comment} from "../src/entity/Comment"
import devConfig from 'ormconfig.json'
import prodConfig from 'ormconfig.prod.json'

const config = process.env.NODE_ENV === 'production' ? devConfig : prodConfig
const create = async () => {
    // @ts-ignore
    return createConnection({
        ...config,
        host: process.env.NODE_ENV === 'production' ? 'localhost' : config.host,
        entities: [Post, User, Comment]
    });
}
const promise = (async function () {
    const manager = getConnectionManager();
    const current = manager.has('default') && manager.get('default')
    if (current) {
        await current.close();
    }
    return create()
})();


const getDatabaseConnection = async () => {
    return promise
}
export default getDatabaseConnection;

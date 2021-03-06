import {createConnection, getConnectionManager} from "typeorm";
import 'reflect-metadata'
import {Post} from 'src/entity/Post';
import {User} from "../src/entity/User";
import {Comment} from "../src/entity/Comment"

import config from 'ormconfig'

const create = async () => {
    // @ts-ignore
    return createConnection({
        ...config,
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

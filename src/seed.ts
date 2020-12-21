import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";


createConnection().then(async connection => {
    const {manager} = connection;
    const u1 = new User()
    u1.username = 'frank'
    u1.password_digest = 'xxx'
    await manager.save(u1)
    await connection.close()
}).catch(error => console.log(error));

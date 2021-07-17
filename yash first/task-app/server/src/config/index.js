import {config} from 'dotenv'


const {parsed} = config();
const PORT = parsed.PORT
const DB = parsed.DB
const SECRET = parsed.SECRET


export {
    PORT,
    DB,
    SECRET
}
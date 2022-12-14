import {createConnection} from "mysql2";
import dotenv from "dotenv"
dotenv.config()
const connection = createConnection({
    host     : 'localhost',
    user     : process.env.DATA_USER,
    password : process.env.DATA_PASS,
    database : 'BRT',
    multipleStatements: true
  });

connection.connect()

export default connection;
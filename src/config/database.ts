import { createConnection, createPool } from "mysql2";
import appConfig from "./environments";
   
export const pool = createPool({
    port: appConfig.db.PORT,
    host: appConfig.db.HOST,
    user: appConfig.db.USER,
    password: appConfig.db.PASSWORD,
    database: appConfig.db.DATABASE,
    waitForConnections: true,
})

export const dbConection = createConnection({
    port: appConfig.db.PORT,
    host: appConfig.db.HOST,
    user: appConfig.db.USER,
    password: appConfig.db.PASSWORD,
    database: appConfig.db.DATABASE,
    waitForConnections: true,
})

/*
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    
    port: appConfig.db.PORT,
    host: appConfig.db.HOST,
    user: appConfig.db.USER,
    password: appConfig.db.PASSWORD,
    database: appConfig.db.DATABASE,

    DB_PORT: 3308,
    DB_HOST: "127.0.0.1",
    DB_USER: "root",
    DB_PASSWORD: "",
    DATABASE: 'de_shuni',
    
    port:               3308,
    host:               "127.0.0.1",
    user:               "root",
    password:           "",
    database:           "de_shuni",
    waitForConnections: true,
*/
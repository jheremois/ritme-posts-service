import express from "express";
import dotenv from "dotenv";
import http from "http"
import 'reflect-metadata'
import postRoutes from "./router/Posts.routes";
import cors from "cors";
import appConfig from "./config/environments";

const app = express()

const server = http.createServer(app);

dotenv.config({path: './.env'})
app.set('port', process.env.PORT || 4200)

app.use(cors())

app.use(express.json({limit: '15mb'}));

const port = app.get('port')

app.use('/api/', [postRoutes()])
app.use('/', (req: any, res: any)=> {
    res.send("Ritme App")
})

server.listen(port);
server.on('error', (err)=>{
    console.log(err)
});

server.on('listening', ()=>{
    console.log(`Online on port ${port}`)
});
import { Request, Response } from 'express';
import { pool } from '../config/database';
import { verify } from "jsonwebtoken";
import appConfig from "../config/environments";
import {Storage} from "@google-cloud/storage";
const fs = require("fs")
const bucketName = process.env.BUCKET_NAME;

const gcsKey = JSON.parse(
  Buffer.from(process.env.GCP_CRED_FILE!, 'base64').toString()
)

const storage = new Storage({
  credentials: {
    client_email: gcsKey.client_email,
    private_key: gcsKey.private_key
  },
  projectId: gcsKey.project_id
})

const PostsBucket = storage.bucket(bucketName!)

/*
PostsBucket.makePublic((err, files)=> {
  err
    ?
      console.log("Bucket public err: ",err)
    :
      console.log("Bucket public res: ",files)
})
*/

const conf = appConfig.passport.JWT

export const getPosts = async (req: Request, res: Response)=>{
  pool.query(`
    SELECT s1.*, s2.user_name, s2.profile_pic
    FROM posts AS s1
    INNER JOIN profiles AS s2
    ON s1.user_id = s2.user_id
    ORDER BY upload_time DESC
  `, (err, response)=>{
    err
    ?
      res.status(402).json(err)
    :
      res.json(response)
  })
}

export const createPost = async (req: Request, res: Response)=>{

  const { post_description, post_tag, post_image } = req.body
  const token: any = req.headers["user_token"]
  const imgData = post_image;
  const base64Data: string | null = post_image?imgData.replace(/^data:image\/png;base64,/, ""):false
  let jwtPlayload: any = verify(token, conf.CLIENT_SECRET)

    post_image && post_image.includes("base64")
      ?
        fs.writeFile("post_pic.png", base64Data, 'base64', 
          (err: any, data: any)=> {
            if (err) {
                console.log('err: ', err);
            }else{
              console.log('success: ', data);
              PostsBucket.upload("post_pic.png", {
                destination: `${base64Data?.slice(130, 150)}.png`,
              }).then((bucketRes)=>{
                pool.query(`
                  INSERT INTO posts SET?
                `,{
                  user_id: jwtPlayload.user_id,
                  post_description,
                  post_image: `https://storage.googleapis.com/ritme-posts/${bucketRes[0].id}`,
                  post_tag,
                }, (err, response)=>{
                  err
                  ?
                    res.status(402).json(err)
                  :
                    res.json(response)
                })
              }).catch((err)=>{
                
              })
            }
          }
        )
      :
        res.status(402).json({errMsg: "Image is required for post"})
}

export const getMyPosts = async (req: Request, res: Response)=>{

  const token: any = req.headers["user_token"]
  let jwtPlayload: any = verify(token, conf.CLIENT_SECRET)

  pool.query(`
    SELECT s1.*, s2.user_name, s2.profile_pic
    FROM posts AS s1
    INNER JOIN profiles AS s2
    ON s1.user_id = s2.user_id
    WHERE s1.user_id = '${jwtPlayload.user_id}' AND s2.user_id = '${jwtPlayload.user_id}'
    ORDER BY upload_time DESC
  `, (err, response)=>{
    err
    ?
      res.json(err)
    :
      res.json(response)
  })
}

export const getUserPosts = async (req: Request, res: Response)=>{

  const {user_id} = req.params

  pool.query(`
    SELECT s1.*, s2.user_name, s2.profile_pic
    FROM posts AS s1
    INNER JOIN profiles AS s2
    ON s1.user_id = s2.user_id
    WHERE s1.user_id = '${user_id}' AND s2.user_id = '${user_id}'
    ORDER BY upload_time DESC
  `, (err, response)=>{
    err
    ?
      res.json(err)
    :
      res.json(response)
  })
}

export const getPostsByTag = async (req: Request, res: Response)=>{

  const {post_tag} = req.params

  pool.query(`
    SELECT s1.*, s2.user_name, s2.profile_pic
    FROM posts AS s1
    INNER JOIN profiles AS s2
    ON s1.user_id = s2.user_id
    WHERE s1.post_tag = "${post_tag}"
    ORDER BY upload_time DESC;
  `, (err, response)=>{
    err
    ?
      res.json(err)
    :
      res.json(response)
  })
}

export const votePost = async (req: Request, res: Response)=>{

  const token: any = req.headers["user_token"]
  const {post_id, vote_type} = req.params
  let jwtPlayload: any = verify(token, conf.CLIENT_SECRET)
  
  pool.query(`
    SELECT vote_type
    FROM votes
    WHERE user_id = '${jwtPlayload.user_id}' AND post_id = '${post_id}';
  `, (SelectErr, SelectRes: {}[])=>{
    SelectErr
      ?
        res.status(400).send(SelectErr)
      :
        SelectRes.length >= 1
          ?
            res.status(400).json({
              errMessage: "You cant vote twice"
            })
          :
            pool.query(`
              INSERT INTO votes SET?
            `,{
              user_id: jwtPlayload.user_id,
              post_id: post_id,
              vote_type: vote_type
            }, 
            (err, response)=>{
              err
              ?
                res.status(400).json({
                  DBerror: err,
                  errMessage: "Server internal error"
                })
              :
                res.status(200).json({
                  DBmessage: response
                })
            })
  })
}


export const votesCount = async (req: Request, res: Response)=>{
  const { post_id } = req.params
  const token: any = req.headers["user_token"]
  let jwtPlayload: any = verify(token, conf.CLIENT_SECRET)
  pool.query(`
    SELECT vote_type
    FROM votes
    WHERE user_id = '${jwtPlayload.user_id}' AND post_id = '${post_id}';
  `, (SelectErr, SelectRes: {}[])=>{
    SelectErr
      ?
        res.status(400).json({
          dbErr: SelectErr
        })
      :
          pool.query(`
            SELECT user_id, vote_type
            FROM votes
            WHERE post_id = '${post_id}' AND vote_type = 'p'
          `, (dbErr, dbRes)=>{
          dbErr
            ?
              res.status(400).json({
                dbErr: dbErr
              })
            :
              pool.query(`
                SELECT user_id, vote_type
                FROM votes
                WHERE post_id = '${post_id}' AND vote_type = 'n'
              `, (dbVErr, dbVRes)=>{
                dbVErr
                  ?
                    res.status(400).json({
                      dbErr: dbVErr
                    })
                  :
                    res.status(200).json({
                      upVotes: dbRes,
                      iVoted: SelectRes.length >= 1,
                      downVotes: dbVRes
                    })
              })
          })
  })

}
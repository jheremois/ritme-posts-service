import { Router } from "express";
import { getPosts, createPost, getMyPosts } from "../controllers/postsControllers";
import verifyToken from "../middlewares/jwt";

const router = Router()

const PostsRoutes = ()=>{

    router.get('/posts', verifyToken, getPosts)

    router.post('/post', verifyToken, createPost)

    router.get('/myPosts', verifyToken, getMyPosts)

    return router
}

export default PostsRoutes
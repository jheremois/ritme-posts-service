import { Router } from "express";
import { getPosts, createPost, getMyPosts, votePost, votesCount } from "../controllers/postsControllers";
import verifyToken from "../middlewares/jwt";

const router = Router()

const PostsRoutes = ()=>{

    router.get('/posts', verifyToken, getPosts)

    router.post('/post', verifyToken, createPost)

    router.get('/myPosts', verifyToken, getMyPosts)

    router.post('/vote/:post_id/:vote_type', verifyToken, votePost)

    router.get('/votes/:post_id', verifyToken, votesCount)

    return router
}

export default PostsRoutes
import { Router } from "express";
import { getPosts, createPost, getMyPosts, votePost, votesCount, getUserPosts, getPostsByTag } from "../controllers/postsControllers";
import verifyToken from "../middlewares/jwt";

const router = Router()

const PostsRoutes = ()=>{

    router.get('/posts', verifyToken, getPosts)

    router.post('/post', verifyToken, createPost)

    router.get('/myPosts', verifyToken, getMyPosts)

    router.get('/posts/:user_id', verifyToken, getUserPosts)

    router.get('/posts/tag/:post_tag', verifyToken, getPostsByTag)
    
    router.post('/vote/:post_id/:vote_type', verifyToken, votePost)

    router.get('/votes/:post_id', verifyToken, votesCount)

    return router
}

export default PostsRoutes
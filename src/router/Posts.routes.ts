import { Router } from "express";
import { createPost, votePost, votesCount, getTrendTags, getFullPosts, getFullPostsByTag, getFullPostsByUser, getMyFullPosts } from "../controllers/postsControllers";
import verifyToken from "../middlewares/jwt";

const router = Router()

const PostsRoutes = ()=>{

    router.post('/post', verifyToken, createPost)    

    router.post('/vote/:post_id/:vote_type', verifyToken, votePost)

    router.get('/votes/:post_id', verifyToken, votesCount)

    router.get('/tags', verifyToken, getTrendTags)

    router.get('/feed', verifyToken, getFullPosts)

    router.get('/feed/:post_tag', verifyToken, getFullPostsByTag)

    router.get('/profile', verifyToken, getMyFullPosts)
    
    router.get('/profile/:user_id', verifyToken, getFullPostsByUser)

    return router
}

export default PostsRoutes
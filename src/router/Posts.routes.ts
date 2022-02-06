import { Router } from "express";
import { getPosts, createPost, getMyPosts, votePost, votesCount, getUserPosts, getPostsByTag, getTrendTags, getFullPosts, getFullPostsByTag, getFullPostsByUser, getMyFullPosts } from "../controllers/postsControllers";
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

    router.get('/trendTags', verifyToken, getTrendTags)

    router.get('/feed', verifyToken, getFullPosts)

    router.get('/feed/:user_id', verifyToken, getFullPostsByUser)

    router.get('/myfeed', verifyToken, getMyFullPosts)

    router.get('/feed/:post_tag', verifyToken, getFullPostsByTag)
    
    return router
}

export default PostsRoutes
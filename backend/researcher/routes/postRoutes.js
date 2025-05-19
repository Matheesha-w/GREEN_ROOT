const express = require ('express')

const router = express.Router()

const {
    getPosts,
    getUserPosts,
    getAPost,
    createPost,
    updatePost,
    deletePost
} = require('../controller/postController')


const authenticateResearcher = require('../middleware/requireAuth');

//multer
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'researcher/uploads/' });


//Get all posts
router.get('/', getPosts)

//Get user posts
router.get('/my-posts', authenticateResearcher, getUserPosts)

//Get a single post
router.get('/:id', getAPost)

//Create new post
router.post('/', uploadMiddleware.single('file'), createPost)

//Update a post
router.patch('/:id', updatePost)

//Delete a post
router.delete('/:id', deletePost)

module.exports = router
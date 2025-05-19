const express = require('express')

const router = express.Router()

const {
    getNews,
    getUserNews,
    getANews,
    createNews,
    updateNews,
    deleteNews
} = require('../controller/newsController')

const authenticateResearcher = require('../middleware/requireAuth');


// Import middleware
//const { authenticateUser} = require('../../admin/middleware/auth.middleware')

//multer
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'researcher/uploads/' });

//Get all news
router.get('/', getNews)

//Get user news
router.get('/my-news', authenticateResearcher, getUserNews)

//Get a single News
router.get('/:id', getANews)

//Create new news
router.post('/', uploadMiddleware.single('file'), createNews)

//Update a news
router.patch('/:id', updateNews)

//Delete a news
router.delete('/:id', deleteNews)

module.exports = router
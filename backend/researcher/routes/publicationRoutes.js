const express = require('express')

const router = express.Router()

const {
    getPublications,
    getUserPublications,
    createPublication,
    deletePublication,
    downloadFile
} = require('../controller/publicationController')

const authenticateResearcher = require('../middleware/requireAuth');

//multer
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'researcher/uploads/' });

//Get all publications
router.get('/', getPublications)

//Get user publications
router.get('/my-publications', authenticateResearcher, getUserPublications)

//Create new publication
router.post('/', uploadMiddleware.single('file'), createPublication)

//Delete a publication
router.delete('/:id', deletePublication)

// Download original file
router.get('/download/:id', downloadFile);

module.exports = router
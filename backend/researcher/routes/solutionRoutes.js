const express = require('express')

const router = express.Router()

const {
    allSolutions,
    solutionsByTicketId,
    createSolution,
    deleteSolution
} = require('../controller/solutionController')


// Import middleware
//const { authenticateUser} = require('../../admin/middleware/auth.middleware')

//multer
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'researcher/uploads/' });

//Get all solutions
router.get('/', allSolutions)

// Get solutions by ticket ID
router.get('/ticket/:ticketID', solutionsByTicketId)

//Create solution
router.post('/', uploadMiddleware.single('file'), createSolution)

//Delete solution
router.delete('/:id', deleteSolution)

module.exports = router
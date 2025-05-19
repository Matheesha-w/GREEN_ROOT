const express = require('express');
// const { authenticateUser, authorizePermissions } = require('../middleware/auth.middleware');
const {
    createQuestion,
    getUserQuestions,
    updateQuestion,
    getQuestionByTitle,
    replyToQuestion,
    deleteQuestion,
    getAllQuestions
} = require('../controller/question.controller');
const router = express.Router();

// get all questions for pie chart
router.get("/questions/all", getAllQuestions);

// create a question
router.post("/create", createQuestion);

// get user's questions
router.get('/questions/:userId', getUserQuestions);

// update question
router.put("/update/:questionId", updateQuestion);

// get question by title
router.post("/question/reply/:questionId", replyToQuestion);
router.delete("/question/delete/:id", deleteQuestion);
router.get("/question/title1", (req, res) => getQuestionByTitle(req, res, "Working Issue"));
router.get("/question/title2", (req, res) => getQuestionByTitle(req, res, "General Inquiry"));
router.get("/question/title3", (req, res) => getQuestionByTitle(req, res, "Account Issue"));
router.get("/question/title4", (req, res) => getQuestionByTitle(req, res, "Technical Support"));
router.get("/question/Other", (req, res) => getQuestionByTitle(req, res, "Other"));

module.exports = router;
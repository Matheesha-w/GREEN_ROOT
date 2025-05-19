const Question = require('../model/QuestionModel')

// create a question
const createQuestion = async (req, res) => {
    try {
        const { title, customTitle, message, userId } = req.body;

        if (!title || !message || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const question = new Question({ title, customTitle, message, createdBy: userId });
        await question.save();

        res.status(201).json({ message: "Question created successfully", data: question });
    } catch (err) {
        // console.log(err.message);

        res.status(500).json({ msg: err.message });

    }
}

// Get all questions for a specific user
const getUserQuestions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const questions = await Question.find({ createdBy: userId }).populate("replies.adminId", "name");

        res.status(200).json(questions);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// update question within 1 hour
const updateQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { title, message } = req.body;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found!" });
        }

        // Check if the question is older than 1 hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        if (question.createdAt < oneHourAgo) {
            return res.status(403).json({ message: "Editing time expired!" });
        }

        // Update question
        question.title = title;
        question.message = message;
        question.editedAt = new Date();
        await question.save();

        res.status(200).json({ message: "Question updated successfully", data: question });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// get questions by title
const getQuestionByTitle = async (req, res, title) => {
    try {
        // const { title } = req.params;
        const question = await Question.find({ title });
        // res.status(200).json({ data: question.replies });
        res.status(200).json({ data: question });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// reply to a question
const replyToQuestion = async (req, res) => {
    try {
        const { adminId, message } = req.body;
        const { questionId } = req.params;

        // find the question
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: `Question not found...` });
        }

        // Add reply
        question.replies.push({ adminId, message, createdAt: Date.now() });
        await question.save();

        res.status(200).json({ msg: `Reply added successfully...` });

    } catch (error) {
        console.error("Error replying to question:", error);
        res.status(500).json({ msg: error.message });
    }
};

// delet question (admin)
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedQuestion = await Question.findByIdAndDelete(id);

        if (!deleteQuestion) {
            return res.status(404).json({ msg: `Question not found!` });
        }

        res.status(200).json({ msg: `Question deleted successfully` });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// get all question for pie chart
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find({}, "title");
        res.status(200).json(questions);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


module.exports = {
    createQuestion,
    getUserQuestions,
    updateQuestion,
    getQuestionByTitle,
    replyToQuestion,
    deleteQuestion,
    getAllQuestions
}
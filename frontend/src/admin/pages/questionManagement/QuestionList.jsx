import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const QuestionList = ({ userId }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (userId) {
            fetchUserQuestions(userId);
        }
    }, [userId]);

    const fetchUserQuestions = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/qna/questions/${userId}`);
            setQuestions(response.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    // Check if the question can be edited (only within 1 hour)
    const canEdit = (createdAt) => {
        const createdTime = new Date(createdAt);
        const oneHourLater = new Date(createdTime.getTime() + 60 * 60 * 1000);
        return new Date() < oneHourLater;
    };

    // Handle viewing and updating a question
    const handleViewQuestion = (question) => {
        let repliesText = question.replies.length
            ? question.replies.map((reply) => `<p><strong>Admin:</strong> ${reply.message}</p>`).join("")
            : "<p>No replies yet</p>";

        Swal.fire({
            title: "View Question",
            html: `
                <input id="edit-title" class="swal2-input" placeholder="Title" value="${question.title}" ${canEdit(question.createdAt) ? "" : "disabled"}>
                <textarea id="edit-message" class="swal2-textarea" placeholder="Message" ${canEdit(question.createdAt) ? "" : "disabled"}>${question.message}</textarea>
                ${repliesText}
            `,
            showCancelButton: true,
            confirmButtonText: canEdit(question.createdAt) ? "Update" : "Close",
            cancelButtonText: "Close",
            preConfirm: () => {
                const updatedTitle = document.getElementById("edit-title").value;
                const updatedMessage = document.getElementById("edit-message").value;

                if (canEdit(question.createdAt) && (!updatedTitle || !updatedMessage)) {
                    Swal.showValidationMessage("Title and Message cannot be empty!");
                    return false;
                }

                return { updatedTitle, updatedMessage };
            }
        }).then(async (result) => {
            if (result.isConfirmed && canEdit(question.createdAt)) {
                try {
                    await axios.put(`http://localhost:3000/api/qna/update/${question._id}`, {
                        title: result.value.updatedTitle,
                        message: result.value.updatedMessage
                    });

                    Swal.fire("Updated!", "Your question has been updated.", "success");
                    fetchUserQuestions(userId);
                } catch (error) {
                    Swal.fire("Error", "Failed to update question", "error");
                }
            }
        });
    };

    return (
        <div className="mt-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Your Previous Questions</h3>
            {questions.length === 0 ? (
                <p className="text-gray-500">No questions found.</p>
            ) : (
                <ul className="space-y-2">
                    {questions.map((question) => (
                        <li key={question._id} className="flex justify-between items-center p-2 border rounded">
                            <span className="font-medium">{question.title}</span>
                            <button
                                onClick={() => handleViewQuestion(question)}
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                            >
                                View
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuestionList;

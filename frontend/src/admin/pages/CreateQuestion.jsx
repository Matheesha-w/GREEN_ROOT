import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const CreateQuestion = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Decode token and get userId
        const authToken = Cookies.get("authToken");
        if (authToken) {
            try {
                const decodedToken = JSON.parse(atob(authToken.split(".")[1])); // Decode JWT
                setUserId(decodedToken.userId);
                fetchUserQuestions(decodedToken.userId);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    // Fetch user's previous questions
    const fetchUserQuestions = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/qna/questions/${userId}`);
            setQuestions(response.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !message) {
            Swal.fire("Error", "All fields are required!", "error");
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/qna/create", {
                title,
                message,
                userId
            });

            Swal.fire("Success", "Question created successfully!", "success");
            setTitle("");
            setMessage("");
            fetchUserQuestions(userId);
        } catch (error) {
            console.error("Error creating question:", error);
            Swal.fire("Error", "Failed to create question", "error");
        }
    };

    // Show question details in a modal
    const handleViewQuestion = (question) => {
        let repliesText = question.replies.length
            ? question.replies.map((reply) => `<p><strong>Admin:</strong> ${reply.message}</p>`).join("")
            : "<p>No replies yet</p>";

        Swal.fire({
            title: question.title,
            html: `<p><strong>Question:</strong> ${question.message}</p>${repliesText}`,
            confirmButtonText: "Close"
        });
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">

            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Ask a Question</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded text-lg"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded text-lg"
                        placeholder="Enter your question"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="5"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>


            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Your Previous Questions</h3>
                {questions.length === 0 ? (
                    <p className="text-gray-500">No questions found.</p>
                ) : (
                    <ul className="space-y-3">
                        {questions.map((question) => (
                            <li key={question._id} className="flex justify-between items-center">

                                <span className="text-lg font-medium w-full py-4 px-4 bg-yellow-200 rounded-lg">
                                    {question.title}
                                </span>
                                <button
                                    onClick={() => handleViewQuestion(question)}
                                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
                                >
                                    View
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CreateQuestion;

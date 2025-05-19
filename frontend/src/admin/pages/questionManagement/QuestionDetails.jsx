import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const QuestionDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { question } = location.state || { question: {} };

    // handle delete question
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            try {

                const response = await fetch(`http://localhost:3000/api/qna/question/delete/${question._id}`, {
                    method: "DELETE",
                });

                const data = await response.json();
                if (response.ok) {
                    alert(data.msg);
                    navigate(-1);
                } else {
                    alert("Failed to delete question: " + data.msg);
                }

            } catch (error) {
                console.error("Error deleting question:", error);
                alert("An error occurred while deleting the question.");
            }
        }
    }

    return (
        <div className="container mx-auto py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Question Details</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-800">{question.customTitle || question.title}</h3>
                <p className="text-gray-700 mt-2">{question.message}</p>
                <p className="text-gray-500 mt-2">Created at: {new Date(question.createdAt).toLocaleString()}</p>

                {/* Replies Section */}
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800">Replies:</h4>
                    {question.replies && question.replies.length > 0 ? (
                        question.replies.map((reply, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded mt-3">
                                <p className="text-gray-700">{reply.message}</p>
                                <p className="text-sm text-gray-500">Replied at: {new Date(reply.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 mt-2">No replies yet.</p>
                    )}
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => navigate(`/admin/reply-question/${question._id}`, { state: { question } })}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Reply
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuestionDetails
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewQuestions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions, typeTitle } = location.state || { questions: [], typeTitle: "Unknown" };

    console.log("Questions received in ViewQuestions:", questions);

    const handleView = (question) => {
        navigate(`/admin/question-details/${question._id}`, { state: { question } });
    }

    const handleReply = (question) => {
        navigate(`/admin/reply-question/${question._id}`, { state: { question } });
    };

    return (
        <div className="container mx-auto py-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Questions for {typeTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <div key={question._id} className="bg-white p-4 rounded-lg shadow">
                            <h4 className="font-semibold text-lg">{question.customTitle || question.title}</h4>
                            <p className="text-gray-700">{question.message}</p>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handleView(question)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleReply(question)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Reply
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No questions found for this type.</p>
                )}
            </div>
        </div>
    );
};

export default ViewQuestions;

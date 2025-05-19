import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuestionManagement = () => {
    const [questionsByType, setQuestionsByType] = useState({});
    const navigate = useNavigate();

    const questionTypes = [
        { id: "title1", title: "Working Issue", api: "http://localhost:3000/api/qna/question/title1" },
        { id: "title2", title: "General Inquiry", api: "http://localhost:3000/api/qna/question/title2" },
        { id: "title3", title: "Account Issue", api: "http://localhost:3000/api/qna/question/title3" },
        { id: "title4", title: "Technical Support", api: "http://localhost:3000/api/qna/question/title4" },
        { id: "Other", title: "Other", api: "http://localhost:3000/api/qna/question/Other" },
    ];

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const responses = await Promise.all(
                    questionTypes.map((type) => axios.get(type.api))
                );

                console.log("API Responses:", responses); // Debugging

                const data = {};
                responses.forEach((res, index) => {
                    data[questionTypes[index].id] = res.data.data;
                });

                setQuestionsByType(data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    const handleViewNavigation = (typeId, typeTitle) => {
        console.log("Navigating to:", typeId, questionsByType[typeId]); // Debugging
        navigate(`/admin/view-questions/${typeId}`, {
            state: { questions: questionsByType[typeId] || [], typeTitle },
        });
    };

    return (
        <div className="container mx-auto py-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Manage Questions by Type
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {questionTypes.map(({ id, title }) => (
                    <div key={id} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
                        <p className="text-gray-600 mb-6">
                            Manage questions of this type. View, edit, and respond to inquiries.
                        </p>
                        <button
                            onClick={() => handleViewNavigation(id, title)}
                            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
                        >
                            View Questions ({questionsByType[id]?.length || 0})
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionManagement;

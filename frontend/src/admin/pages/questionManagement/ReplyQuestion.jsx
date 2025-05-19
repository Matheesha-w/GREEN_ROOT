import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ReplyQuestion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { question } = location.state || { question: {} };
    const [reply, setReply] = useState("");

    const handleReplySubmit = async () => {
        if (!reply.trim()) {
            return alert("reply cannot be empty!");
        }

        const token = Cookies.get("authToken");
        if (!token) {
            return alert("Unauthorized Please Log in!");
        }

        let adminId; // variable to store adminID

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            adminId = payload.userId;

        } catch (error) {
            console.error(error);
            return alert("Invalid session please login again...");
        }

        try {
            await axios.post(`http://localhost:3000/api/qna/question/reply/${question._id}`, {
                message: reply,
                adminId
            });

            alert("Reply added successfully...");
            navigate(-1);

        } catch (error) {
            console.log(error);
            alert("faild to send reply");
        }
    }

    return (
        <div className="container mx-auto py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Reply to Question</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-800">{question.customTitle || question.title}</h3>
                <p className="text-gray-700 mt-2">{question.message}</p>

                <textarea
                    className="w-full border rounded p-3 mt-4"
                    rows="5"
                    placeholder="Type your reply here..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                />

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleReplySubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit Reply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReplyQuestion
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const QuestionCard = ({ question }) => {
    const [adminReply, setAdminReply] = useState("");

    // Handle deleting the question
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/qna/question/delete/${question._id}`);
            Swal.fire("Deleted!", "Question deleted successfully", "success").then(() => {
                window.location.reload(); // Reload the page
            });
        } catch (err) {
            Swal.fire("Error!", "Failed to delete question", "error");
        }
    };

    // Handle reply submission
    const handleReplySubmit = async (replyText) => {
        try {
            const token = Cookies.get("authToken");
            const payload = JSON.parse(atob(token.split(".")[1]));
            const adminId = payload.userId;

            await axios.post(`http://localhost:3000/api/qna/question/reply/${question._id}`, {
                adminId,
                message: replyText
            });

            Swal.fire("Success!", "Reply added successfully!", "success").then(() => {
                window.location.reload(); // Reload the page
            });
        } catch (err) {
            Swal.fire("Error!", "Failed to add the reply", "error");
        }
    };

    // Show question details
    const handleView = () => {
        Swal.fire({
            title: `<h2 style="font-size: 1.5rem; font-weight: bold;">${question.title}</h2>`,
            html: `
                <p style="font-size: 1rem; margin-bottom: 10px;"><strong>Message:</strong> ${question.message}</p>
                <p style="font-size: 1rem; margin-bottom: 10px;"><strong>Created Date:</strong> ${new Date(question.createdAt).toLocaleString()}</p>
                <p style="font-size: 1rem; margin-bottom: 10px;"><strong>Admin Reply:</strong> ${question.replies.length > 0 ? question.replies[0].message : 'No reply yet.'}</p>
                <textarea id="admin-reply" 
                    placeholder="Type your reply here" 
                    class="swal2-textarea" 
                    style="width: 100%; height: 120px; padding: 10px; font-size: 1rem; border-radius: 5px; border: 1px solid #ccc;"></textarea>
            `,
            icon: 'info',
            showCloseButton: true,
            confirmButtonText: 'Submit Reply',
            width: '600px',
            padding: '20px',
            preConfirm: () => {
                const replyText = document.getElementById("admin-reply").value.trim();
                if (replyText.length > 0) {
                    return replyText;
                } else {
                    Swal.showValidationMessage("Reply cannot be empty");
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                handleReplySubmit(result.value);
            }
        });
    };

    return (
        <div className="flex justify-center items-center">
            {/* Question Card */}
            <div className="mb-10 overflow-hidden rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                    <h3>
                        <div className="mb-4 hover:text-blue-200 block text-2xl font-semibold hover:underline cursor-pointer">
                            <button onClick={handleView}>{question.title}</button>
                        </div>
                    </h3>
                    <p className="mb-7 text-lg leading-relaxed">{question.message}</p>
                    <p className="text-sm">Created: {new Date(question.createdAt).toLocaleString()}</p>

                    <button
                        className="inline-block mt-3.5 rounded-full bg-red-500 px-7 py-2 text-base font-medium text-white transition hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
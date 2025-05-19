import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Footer from "@/Common/Footer";
import NavBar2 from "@/Common/NavBar2";

const AskQuestion = () => {
    const [title, setTitle] = useState("");
    const [otherTitle, setOtherTitle] = useState(""); // Store the 'Other' title input
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const authToken = Cookies.get("authToken");
        if (authToken) {
            try {
                const decodedToken = JSON.parse(atob(authToken.split(".")[1])); // Decode JWT
                setUserId(decodedToken.userId);
                fetchUserQuestions(decodedToken.userId);
                console.log(decodedToken.userId);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

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

        if ((!title || (title === "Other" && !otherTitle)) || !message) {
            Swal.fire("Error", "All fields are required!", "error");
            return;
        }

        // const finalTitle = title === "Other" ? "Other" : title;
        const payload = {
            title: title === "Other" ? "Other" : title, // Save "Other" as the title
            customTitle: title === "Other" ? otherTitle.trim() : null, // Save the custom title separately
            message: message.trim(),
            userId,
        };


        try {
            await axios.post("http://localhost:3000/api/qna/create", payload);

            Swal.fire("Success", "Question submitted successfully!", "success");
            setTitle("");
            setOtherTitle("");
            setMessage("");
            fetchUserQuestions(userId);
        } catch (error) {
            console.error("Error submitting question:", error);
            Swal.fire("Error", "Failed to submit question", "error");
        }
    };

    const handleViewQuestion = (question) => {
        const createdAt = new Date(question.createdAt);
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const canEdit = createdAt > oneHourAgo;

        // get the custom title if it is present
        const displayTitle = question.customTitle || question.title;

        Swal.fire({
            title: "View Question",
            width: "60vw",
            heightAuto: false,
            padding: "20px",
            html: `
                <div style="max-height: 60vh; overflow-y: auto; text-align: left;">
                    <input id="edit-title" class="swal2-input" 
                        style="width: 95%; font-size: 1.1rem;" 
                        value="${displayTitle}" placeholder="Title" ${canEdit ? "" : "disabled"}>

                    <textarea id="edit-message" class="swal2-textarea" 
                        style="width: 95%; height: 150px; font-size: 1.1rem;" 
                        placeholder="Message" ${canEdit ? "" : "disabled"}>${question.message}</textarea>

                    <h3 style="margin-top: 15px;">Replies</h3>
                    <div style="font-size: 1rem;">
                        ${question.replies.length
                    ? question.replies.map((reply) => `<p><strong>Admin:</strong> ${reply.message}</p>`).join("")
                    : "<p>No replies yet</p>"
                }
                    </div>
                </div>
            `,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: "Close",
            footer: canEdit
                ? `<button id="updateBtn" class="swal2-confirm swal2-styled" style="background-color:#4CAF50; font-size: 1rem; padding: 10px 20px;">Update</button>`
                : `<p style="color:red;">Editing time expired!</p>`,
            didOpen: () => {
                if (canEdit) {
                    document.getElementById("updateBtn").addEventListener("click", () => {
                        handleUpdateQuestion(question._id);
                    });
                }
            }
        });
    };

    const handleUpdateQuestion = async (questionId) => {
        const newTitle = document.getElementById("edit-title").value;
        const newMessage = document.getElementById("edit-message").value;

        if (!newTitle || !newMessage) {
            Swal.fire("Error", "All fields are required!", "error");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/qna/update/${questionId}`, {
                title: newTitle,
                message: newMessage
            });

            if (response.status === 200) {
                Swal.fire("Success", "Question updated successfully!", "success");
                fetchUserQuestions(userId);
            } else {
                Swal.fire("Error", response.data.message, "error");
            }
        } catch (error) {
            console.error("Error updating question:", error);
            Swal.fire("Error", "Failed to update question", "error");
        }
    };

    return (
        <div>
            <NavBar2 />
            <section className="bg-gray-100 py-16" id="contact">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-lg font-semibold uppercase text-blue-600">Q&A Forum</p>
                        <h2 className="text-3xl font-bold text-gray-900">Ask a Question</h2>
                        <p className="text-gray-600 mt-2">Have any questions? Feel free to ask!</p>
                    </div>

                    {/* Form Section */}
                    <div className="grid md:grid-cols-2 gap-10">
                        <div>
                            <p className="text-lg text-gray-600">
                                Ask any question related to your concern. Our team will respond as soon as possible.
                            </p>
                        </div>

                        <div className="bg-white p-8 shadow-lg rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit Your Question</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <select
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select a title</option>
                                        <option value="Working Issue">Working Issue</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Account Issue">Account Issue</option>
                                        <option value="Technical Support">Technical Support</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {title === "Other" && (
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Enter your custom title"
                                            value={otherTitle}
                                            onChange={(e) => setOtherTitle(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                )}

                                <div className="mb-4">
                                    <textarea
                                        cols="30"
                                        rows="5"
                                        placeholder="Write your question..."
                                        className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white px-6 py-3 font-medium rounded-lg hover:bg-blue-700 transition-all"
                                    >
                                        Submit Question
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Previous Questions Section */}
                    <div className="mt-12 bg-white p-8 shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Previous Questions</h3>
                        {questions.length === 0 ? (
                            <p className="text-gray-500">No questions found.</p>
                        ) : (
                            <ul className="space-y-4">
                                {questions.map((question) => (
                                    <li
                                        key={question._id}
                                        className="flex justify-between items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                                    >
                                        <span className="text-lg font-medium text-gray-800">{question.title}</span>
                                        <button
                                            onClick={() => handleViewQuestion(question)}
                                            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-all"
                                        >
                                            View
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AskQuestion;

import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";

import Sidebar from "@/admin/components/Sidebar";
// import NavBar2 from "@/Common/NavBar2";
import BackButton from "@/admin/components/BackButton";

const OtherQuestion = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/qna/question/Other")
            .then((res) => setQuestions(res.data.data))
            .catch((err) => console.error("Error fetching questions: ", err));
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col">

                <div className="ml-10">
                    <div className="p-6 ml-8">
                        {/* Back Button */}
                        <BackButton />

                        {/* Page Content */}
                        <h2 className="text-2xl font-semibold mb-4 ml-10">Other Questions</h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {questions.map((question) => (
                                <QuestionCard key={question._id} question={question} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtherQuestion
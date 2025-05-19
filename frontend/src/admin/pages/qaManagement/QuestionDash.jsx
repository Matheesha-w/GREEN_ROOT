import React from "react";
import Card from "./Card";
import Sidebar from "../../components/Sidebar";
import BackButton from "../../components/BackButton";

const QuestionDash = () => {
    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */}
                <Sidebar />

                <div className="flex-1 p-6 ml-20">
                    <div className="mb-4">
                        <BackButton />
                    </div>

                    {/* Content */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Question Management</h2>
                        <Card />
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuestionDash;

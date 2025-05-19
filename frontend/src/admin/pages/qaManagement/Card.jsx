import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
    return (
        <>
            <section className="bg-gray-2 pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
                <div className="container">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2.5">
                        <SingleCard
                            image="https://images.shiksha.com/mediadata/images/articles/1718885496phpB6zgme.jpeg"
                            CardTitle="Working Issue"
                            titleHref="/admin/question-management/working-issue"
                            btnHref="/admin/question-management/working-issue"
                            CardDescription="Manage working issue questions."
                            Button="View Questions"
                        />
                        <SingleCard
                            image="https://images.squarespace-cdn.com/content/v1/5c8bf238aadd346d36923f52/1720461106554-2FM5JY0XMCKG1C838IQG/GENERAL%2BINQUIRY.jpg"
                            CardTitle="General Inquiry"
                            titleHref="/admin/question-management/general-inquiry"
                            btnHref="/admin/question-management/general-inquiry"
                            CardDescription="Manage general inquiry questions."
                            Button="View Questions"
                        />
                        <SingleCard
                            image="https://thumbs.dreamstime.com/b/password-error-man-forgets-password-security-key-login-denied-cybersecurity-industry-account-protection-concept-password-286915848.jpg"
                            CardTitle="Account Issue"
                            titleHref="/admin/question-management/account-issue"
                            btnHref="/admin/question-management/account-issue"
                            CardDescription="Manage account issue questions."
                            Button="View Questions"
                        />
                        <SingleCard
                            image="https://as1.ftcdn.net/jpg/01/77/69/04/1000_F_177690413_gC40pMzjMMjUaAYvyy4WErL7p4qNoASK.jpg"
                            CardTitle="Technical Support"
                            titleHref="/admin/question-management/technical-support"
                            btnHref="/admin/question-management/technical-support"
                            CardDescription="Manage technical support questions."
                            Button="View Questions"
                        />
                        <SingleCard
                            image="https://i0.wp.com/fromthegreennotebook.com/wp-content/uploads/2022/09/get-to-know.jpg?ssl=1"
                            CardTitle="Other"
                            titleHref="/admin/question-management/other"
                            btnHref="/admin/question-management/other"
                            CardDescription="Manage other questions."
                            Button="View Questions"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Card;

const SingleCard = ({
    image,
    Button,
    CardDescription,
    CardTitle,
    titleHref,
    btnHref,
}) => {
    return (
        <>
            <div className="mb-10 overflow-hidden rounded-lg bg-gray-100 shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
                <div className="h-65">
                    <img src={image} alt="" className="w-full h-full bg-cover" />
                </div>

                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                    <h3>
                        <div className="mb-4 block text-xl font-semibold text-dark hover:text-blue-700 text-black sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                            <Link to={titleHref ? titleHref : `/admin/question-management`}>
                                {CardTitle}
                            </Link>
                        </div>
                    </h3>
                    <p className="mb-7 text-base leading-relaxed text-gray-700 dark:text-dark-6">
                        {CardDescription}
                    </p>

                    {Button && (
                        <button
                            className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-blue-700 hover:bg-blue-600 hover:text-white dark:border-dark-3 dark:text-dark-6"
                        >
                            <Link to={btnHref ? btnHref : `/admin/question-management`}>
                                {Button}
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
    return (
        <>
            <section className="bg-gray-2 pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
                <div className="container">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2.5">
                        <SingleCard
                            image="https://th.bing.com/th/id/R.678f61a8e8110bfc31b78e65930b3df4?rik=HqhyZRZYgLJq5w&pid=ImgRaw&r=0"
                            CardTitle="Manage Farmers"
                            titleHref="/admin/user-management/farmer"
                            btnHref="/admin/user-management/farmer"
                            CardDescription="Empower the backbone of agriculture! Oversee farmer profiles, monitor activities, and support sustainable farming practices to ensure quality produce and fair trade."
                            Button="View Details"
                        />
                        <SingleCard
                            image="https://topviecit.vn/blog/wp-content/uploads/2023/12/admin-website-5.jpg"
                            CardTitle="Manage Admins"
                            titleHref="/admin/user-management/admins"
                            btnHref="/admin/user-management/admins"
                            CardDescription="Keep your platform running smoothly! Handle administrator roles, assign permissions, and maintain efficient workflow for seamless management and security."
                            Button="View Details"
                        />
                        <SingleCard
                            image="https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?cs=srgb&dl=pexels-erikscheel-95425.jpg&fm=jpg"
                            CardTitle="Manage Customers"
                            titleHref="/admin/user-management/customers"
                            btnHref="/admin/user-management/customers"
                            CardDescription="Enhance customer experience! View and manage user profiles, track orders, and ensure seamless interactions, delivering top-notch service with ease."
                            Button="View Details"
                        />
                        <SingleCard
                            image="https://static.vecteezy.com/system/resources/thumbnails/011/728/524/small/woman-seller-of-fruit-at-the-market-near-the-counter-photo.jpg"
                            CardTitle="Manage Sellers"
                            titleHref="/admin/user-management/sellers"
                            btnHref="/admin/user-management/sellers"
                            CardDescription="Support your marketplace vendors! Monitor seller activities, verify products, and facilitate smooth transactions, ensuring high-quality goods reach customers efficiently."
                            Button="View Details"
                        />
                        <SingleCard
                            image="https://st.depositphotos.com/1194063/1568/i/450/depositphotos_15682751-stock-photo-working-at-the-laboratory.jpg"
                            CardTitle="Manage Researchers"
                            titleHref="/admin/user-management/researchers"
                            btnHref="/admin/user-management/researchers"
                            CardDescription="Foster innovation and discovery! Organize research profiles, track ongoing studies, and ensure collaboration among experts to advance scientific and agricultural knowledge."
                            Button="View Details"
                        />
                        <SingleCard
                            image="https://img.freepik.com/free-photo/close-up-delivery-person-with-parcel_23-2149095905.jpg"
                            CardTitle="Manage delivery Person"
                            titleHref="/admin/user-management/deliveryPerson"
                            btnHref="/admin/user-management/deliveryPerson"
                            CardDescription="Optimize your logistics! Oversee delivery personnel, track shipments, and ensure timely and efficient deliveries for smooth end-to-end service."
                            Button="View Details"
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
            {/*  */}
            <div className="mb-10 overflow-hidden rounded-lg bg-gray-100 shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
                <div className="h-65">
                    <img src={image} alt="" className="w-full h-full bg-cover " />
                </div>

                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                    <h3>
                        <div
                            className="mb-4 block text-xl font-semibold text-dark hover:text-blue-700 text-black sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                        >
                            <Link to={titleHref ? titleHref : `/admin/user-management`}>
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
                            <Link to={btnHref ? btnHref : `/admin/user-management`}>{Button}</Link>
                        </button>
                    )}
                </div>
            </div>
            {/*  */}
        </>
    );
};

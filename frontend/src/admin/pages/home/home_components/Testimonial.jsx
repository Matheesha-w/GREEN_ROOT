import React, { useState, useEffect } from "react";
// import backgroundImage from "/home_extras/testimonialBack.jpeg";
import backgroundImage from "/home_extras/testimonialBack1.jpg";

const testimonials = [
    {
        id: 1,
        text: "I've been using XYZ for over a year now and their customer service is excellent! Highly recommend!",
        name: "Melissa Smith",
        role: "Marketing Manager",
        img: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        id: 2,
        text: "Fantastic experience! The team is always available and willing to help whenever needed.",
        name: "John Doe",
        role: "Software Engineer",
        img: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        id: 3,
        text: "A reliable service with great features and top-notch support!",
        name: "Sophia Lee",
        role: "Product Manager",
        img: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
        id: 4,
        text: "Amazing product! It has improved our workflow significantly.",
        name: "Michael Brown",
        role: "CEO",
        img: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
        id: 3,
        text: "A reliable service with great features and top-notch support!",
        name: "Sophia Lee",
        role: "Product Manager",
        img: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
        id: 4,
        text: "Amazing product! It has improved our workflow significantly.",
        name: "Michael Brown",
        role: "CEO",
        img: "https://randomuser.me/api/portraits/men/15.jpg",
    },
];

const Testimonial = () => {
    const [index, setIndex] = useState(0);
    const itemsPerPage = 2; // Show two cards at a time

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / itemsPerPage));
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="relative w-full min-h-[500px] flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="w-full max-w-7xl mx-auto px-6">
                <div className="overflow-hidden relative">
                    {/* Testimonials Container */}
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {Array.from({ length: Math.ceil(testimonials.length / itemsPerPage) }).map(
                            (_, i) => (
                                <div key={i} className="flex min-w-full gap-6 p-4">
                                    {testimonials
                                        .slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)
                                        .map((t) => (
                                            <div
                                                key={t.id}
                                                className="flex-1 bg-green-100 bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-lg text-center"
                                            >
                                                <p className="text-gray-700 text-lg italic">"{t.text}"</p>
                                                <div className="mt-4 flex flex-col items-center">
                                                    <img
                                                        src={t.img}
                                                        alt={t.name}
                                                        className="w-14 h-14 rounded-full shadow-md"
                                                    />
                                                    <p className="text-gray-900 font-semibold mt-2">{t.name}</p>
                                                    <p className="text-gray-500 text-sm">{t.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: Math.ceil(testimonials.length / itemsPerPage) }).map(
                        (_, i) => (
                            <button
                                key={i}
                                className={`w-3 h-3 rounded-full ${i === index ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                                onClick={() => setIndex(i)}
                            ></button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Testimonial;

import React from 'react';
import bannerVd from "./home_img/bannerimg.mp4"
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <>
            <section className="relative h-screen flex flex-col items-center justify-center text-center text-white">
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <video
                        src={bannerVd}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                        muted
                    />
                    <div className="absolute inset-0 bg-opacity-50"></div>
                </div>

                {/* Content */}
                <div className="z-10 space-y-2">
                    <h1 className="text-8xl font-extrabold">We Provide Landscaping</h1>
                    <h3 className="text-3xl">Long established fact that a reader will be distracted by the readable content of a page</h3>
                    <div className="flex justify-center space-x-4">
                        <a
                            href="#"
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            Read More
                        </a>
                        <Link
                            to={`/contact`}
                            className="px-6 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Landing;

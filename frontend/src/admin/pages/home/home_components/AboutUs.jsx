import React from 'react'

const AboutUs = () => {
    return (
        <>
            <section id='aboutHome' className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">About Us</h1>
                            <p className="mb-6">
                                It is a long established fact that a reader will be distracted by the readable
                                content of a page when looking at its layout. The point of using Lorem Ipsum is
                                that it has a more-or-less normal distribution of letters.
                            </p>
                            <a
                                href="#"
                                className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                            >
                                Read More
                            </a>
                        </div>
                        <div>
                            <img src="https://kj1bcdn.b-cdn.net/media/79663/s.jpg?width=1200" alt="About Us" className="rounded shadow-lg" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUs
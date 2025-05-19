import React from 'react'
import Services from './home_components/Services';
import AboutUs from './home_components/AboutUs';
import Testimonial from './home_components/Testimonial';
// nav bar
import NavBar2 from '@/Common/NavBar2';
import Landing from './Landing';
// footer
import Footer from './home_components/Footer';


// import the video 
import backVD from "/bannerimg.mp4";




const HomePage = () => {

    const stats = [
        { value: '25', label: 'Years Experience' },
        { value: '250', label: 'Happy Customers' },
        { value: '2+', label: 'Our Awards' },
        { value: '25', label: 'Landscaping Work Done' },
    ];



    return (
        <>
            <div className='z-50 top-0 sticky'>
                <NavBar2 />
            </div>

            <div className='top-0'>
                <Landing />
            </div>



            <div className="year_section bg-white py-16">
                <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <h1 className="text-4xl font-bold text-green-500">{stat.value}</h1>
                            <p className="text-gray-600 mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div id='serviceHome'>
                {<Services />}
            </div>

            {<AboutUs />}


            <>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-8/12 mb-10">
                        <div className="container mx-auto h-full sm:p-10">
                            <nav className="flex px-4 justify-between items-center">
                                <div className="text-4xl font-bold">
                                    Plant<span className="text-green-700">.</span>
                                </div>
                                <div>
                                    <img
                                        src="https://image.flaticon.com/icons/svg/497/497348.svg"
                                        alt=""
                                        className="w-8"
                                    />
                                </div>
                            </nav>
                            <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
                                <div className="w-full">
                                    <h1 className="text-4xl lg:text-6xl font-bold">
                                        Find your <span className="text-green-700">greeny</span> stuff for
                                        your room
                                    </h1>
                                    <div className="w-20 h-2 bg-green-700 my-4"></div>
                                    <p className="text-xl mb-10">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Recusandae maiores neque eaque ea odit placeat, tenetur illum
                                        distinctio nulla voluptatum a corrupti beatae tempora aperiam
                                        quia id aliquam possimus aut.
                                    </p>
                                    <button className="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow">
                                        Learn More
                                    </button>
                                </div>
                            </header>
                        </div>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                        alt="Leafs"
                        className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
                    />
                </div>
            </>

            {/* how we work section */}
            <div id='blogsHome' className='mt-4 mb-18 p-8'>
                <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl">
                    {/* Image */}
                    <div className="w-full h-64 lg:w-1/2 lg:h-auto">
                        {/* <img
                            className="h-full w-full object-cover"
                            src="https://picsum.photos/id/1018/2000"
                            alt="Winding mountain road"
                        /> */}

                        {/* video */}
                        <video src={backVD} width="600" height="300" controls autoPlay loop muted />
                    </div>

                    <div className="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-18 lg:ml-26 xl:mt-24 xl:ml-12">

                        <div className="flex flex-col p-12 md:px-16">
                            <h2 className="text-2xl font-medium uppercase text-green-800 lg:text-4xl">How We Work</h2>
                            <p className="mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            {/* read more button */}
                            <div className="mt-8">
                                <a
                                    href="#"
                                    className="inline-block w-full text-center text-lg font-medium text-gray-100 bg-green-600 border-solid border-2 border-gray-600 py-4 px-10 hover:bg-green-800 hover:shadow-md md:w-48"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* testimonial */}
            <div className='mt-26 mb-4'>
                {<Testimonial />}
            </div>

            {/* footer */}
            <>
                {<Footer />}
            </>
        </>
    )
}

export default HomePage
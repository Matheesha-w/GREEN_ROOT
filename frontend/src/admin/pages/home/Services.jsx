import React from 'react';
import NavBar2 from '@/Common/NavBar2';
import Footer from '@/Common/Footer';

const services = [
    { img: "https://th.bing.com/th/id/R.0881314c5451d2b1ff1b99f548d903b3?rik=uFIfX61GmIoToQ&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f50000%2fvelka%2fagriculture-13730152618Ej.jpg&ehk=7LB3PYqHK1lMjqQn%2fx39f0qs%2bnBNaRIKHt%2f%2f6NrmWWA%3d&risl=&pid=ImgRaw&r=0", title: "Garden", description: "It is a long established fact that a reader will be distracted by the readable content" },
    { img: "https://th.bing.com/th/id/OIP.afPnzqGApo6VDaOyr64S7gHaE8?rs=1&pid=ImgDetMain", title: "Planting & Upgrade", description: "It is a long established fact that a reader will be distracted by the readable content" },
    { img: "https://images.pexels.com/photos/2132277/pexels-photo-2132277.jpeg?cs=srgb&dl=agriculture-blur-cropland-2132277.jpg&fm=jpg", title: "Bonsol Core", description: "It is a long established fact that a reader will be distracted by the readable content" },
    { img: "https://foodprint.org/wp-content/uploads/2018/10/GettyImages-907966126_optimized.jpg", title: "Garden Maintenance", description: "It is a long established fact that a reader will be distracted by the readable content" },
    { img: "https://th.bing.com/th/id/OIP.sup2iHT6ZRgrKSZMkujWIgHaE7?w=673&h=448&rs=1&pid=ImgDetMain", title: "Plant Water", description: "It is a long established fact that a reader will be distracted by the readable content" },
    { img: "https://th.bing.com/th/id/R.5b4f3c6e1f8f2118ba39d3c6d1cb3ae1?rik=AmGtqlAPD%2baP0Q&pid=ImgRaw&r=0", title: "Plant Cutting", description: "It is a long established fact that a reader will be distracted by the readable content" },
];

const Services = () => {
    return (
        <>
            <div>
                <NavBar2 />

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
                                        Find your <span className="text-green-700">greeny</span> stuff for your room
                                    </h1>
                                    <div className="w-20 h-2 bg-green-700 my-4"></div>
                                    <p className="text-xl mb-10">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae maiores neque
                                        eaque ea odit placeat, tenetur illum distinctio nulla voluptatum a corrupti beatae
                                        tempora aperiam quia id aliquam possimus aut.
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

                <div>
                    <div className="services_section py-16">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-8">
                                <h1 className="text-4xl font-bold">Our Services</h1>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {services.map((service, index) => (
                                    <div key={index} className="box_main bg-white rounded-lg p-4 shadow-md hover:shadow-lg">
                                        <div className="service_img">
                                            <img src={service.img} alt={service.title} className="w-full rounded" />
                                        </div>
                                        <h4 className="development_text text-lg font-semibold mt-4">{service.title}</h4>
                                        <p className="services_text text-gray-600 mt-2">{service.description}</p>
                                        <div className="readmore_bt mt-4">
                                            <a href="#" className="text-blue-500 hover:underline">Read More</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="px-3 py-5 bg-neutral-100 lg:py-10">
                    <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
                        <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
                            <p className="text-4xl font-bold md:text-7xl text-orange-600">25% OFF</p>
                            <p className="text-4xl font-bold md:text-7xl">SUMMER SALE</p>
                            <p className="mt-2 text-sm md:text-lg">For limited time only!</p>
                            <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
                                Shop Now
                            </button>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img
                                className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]"
                                src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                                alt=""
                            />
                        </div>
                    </div>
                </section>
                <div>
                    <div
                        className="max-w-7xl mx-auto py-6 sm:px-6 sm:py-12 md:px-12 md:py-24"
                        style={{
                            backgroundColor: "#fdfdfd",
                            backgroundImage: `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzMwMCcgdmlld0JveD0nMCAwIDIwMCAzMDAnPgoJPGZpbHRlciBpZD0nZnV6eicgeD0nMCcgeT0nMCc+CgkJPGZlVHVyYnVsZW5jZSB0eXBlPSd0dXJidWxlbmNlJyBiYXNlRnJlcXVlbmN5PScwLjMnIG51bU9jdGF2ZXM9JzEwJyBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+Cgk8L2ZpbHRlcj4KCTxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNmdXp6KScgb3BhY2l0eT0nMC4xNScvPgo8L3N2Zz4=)`,
                            backgroundAttachment: "fixed",
                        }}
                    >
                        <div className="flex flex-col lg:flex-row">
                            {/* Content Section */}
                            <div className="w-full lg:w-1/3 p-10 prose">
                                <h1 className="text-7xl text-gray-600 leading-tight">Bears eat Beets</h1>
                                <h1 className="text-3xl text-gray-600">BEARS</h1>
                                <h1 className="text-3xl text-gray-600">BEATS</h1>
                                <h1 className="text-7xl text-gray-600">Battlestar Gallactica</h1>
                                <p className="text-2xl text-gray-600 font-light mt-8 leading-relaxed">
                                    Nullam tincidunt felis eget blandit aliquam. Nunc vel mollis lorem.
                                    Phasellus pharetra commodo ultricies. Mauris scelerisque elit sed arcu
                                    consectetur hendrerit et sit amet ligula.
                                </p>
                                <div className="mt-8 inline-flex gap-x-6 pt-2">
                                    <a href="#">
                                        <svg className="w-12 h-12 fill-gray-600" /* Instagram Icon */></svg>
                                    </a>
                                    <a href="#">
                                        <svg className="w-12 h-12 fill-gray-600" /* Twitter Icon */></svg>
                                    </a>
                                    <a href="#">
                                        <svg className="w-12 h-12 fill-gray-600" /* Facebook Icon */></svg>
                                    </a>
                                </div>
                            </div>

                            {/* Image Grid Section */}
                            <div className="w-full lg:w-2/3 py-8 px-10 grid grid-cols-4 gap-4">
                                <div className="h-64 col-span-4 sm:col-span-4 relative">
                                    <img
                                        className="rounded-md"
                                        src="https://images.unsplash.com/photo-1573426667638-18ccdd988a39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                                        alt="fresh beets"
                                    />
                                </div>
                                <div className="h-64 col-span-4 sm:col-span-2 relative">
                                    <img
                                        className="rounded-lg"
                                        src="https://images.unsplash.com/photo-1592201426550-83c4be24a0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                        alt="red veggies"
                                    />
                                </div>
                                <div className="h-64 col-span-4 sm:col-span-2 relative">
                                    <img
                                        className="rounded-sm"
                                        src="https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
                                        alt="asparagus"
                                    />
                                </div>
                                <div className="h-64 col-span-4 sm:col-span-3 relative">
                                    <img
                                        className="rounded-md"
                                        src="https://images.unsplash.com/photo-1522184216316-3c25379f9760?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                        alt="carrots"
                                    />
                                </div>
                                <div className="h-64 col-span-4 sm:col-span-1 relative">
                                    <img
                                        className="rounded-md"
                                        src="https://images.unsplash.com/photo-1558818498-28c1e002b655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                                        alt="tomato tomato"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Services
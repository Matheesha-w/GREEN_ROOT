import React from 'react';

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

        </>
    )
}

export default Services
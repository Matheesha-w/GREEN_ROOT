import React from "react";

function AboutSection() {
  const features = [
    {
      title: "Increase Yield",
      description: "Optimize crop production with smart farming solutions.",
      image: "https://d14a823tufvajd.cloudfront.net/images/mAbVjgm6sPUv17yvP2wN.jpg",
    },
    {
      title: "Farm-Ready Technology",
      description: "Advanced tools tailored for modern agriculture.",
      image: "https://kingstec.com/wp-content/uploads/2023/12/Smart-Farming.png",
    },
    {
      title: "Sustainable Growth",
      description: "Eco-friendly practices for long-term agricultural success.",
      image: "https://www.cmu.edu/tepper/news/assets/images/istock-1400960132.jpg",
    },
    {
      title: "Expert-Backed Solutions",
      description: "Recommendations from agronomists and industry leaders.",
      image: "https://expertgate.org/assets/frontend/img/agriculture-consultation.jpg",
    },
    {
      title: "Smart Farm Management",
      description: "AI-powered platforms to monitor and enhance efficiency.",
      image: "https://capsulesight.com/58-15EARinAgriculture-feature.webp",
    },
    {
      title: "Seamless Integrations",
      description: "Connect with weather data, IoT sensors, and marketplaces.",
      image: "https://www.zenitel.com/sites/default/files/2023-03/1358x452_Seamless%20integration.jpg",
    },
  ];

  return (
    <div>
      <section className="py-16 bg-gray-100 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-indigo-600 uppercase text-sm font-semibold">
            Features
          </h2>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            How We Revolutionize Agriculture
          </h1>
          <p className="text-gray-600 mt-4">
            We provide innovative solutions to empower farmers and
            agribusinesses with cutting-edge technology and sustainable
            practices.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-2xl text-left"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Section */}
        <div className="mt-16 max-w-6xl mx-auto flex flex-col md:flex-row items-center bg-white p-10 shadow-md rounded-2xl">
          <div className="md:w-1/2">
            <img
              src="/images/farmers.jpg"
              alt="Farmers working"
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="md:w-1/2 md:pl-10 text-left">
            <h2 className="text-3xl font-bold text-gray-900">
              Empowering Farmers for a Better Future
            </h2>
            <p className="text-gray-600 mt-4">
              Every farm and farmer is unique. Our platform tailors solutions to
              meet specific agricultural needs, ensuring sustainable and
              profitable outcomes. Join us in shaping the future of agriculture
              with technology and expertise.
            </p>
            <div className="mt-6 flex space-x-8">
              <div>
                <h3 className="text-2xl font-bold text-indigo-600">10,000+</h3>
                <p className="text-gray-600">Farmers Benefited</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-indigo-600">500+</h3>
                <p className="text-gray-600">Smart Farms</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-indigo-600">50+</h3>
                <p className="text-gray-600">Countries Reached</p>
              </div>
            </div>
            <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
              Learn More
            </button>
          </div>
        </div>
      </section>
      );
    </div>
  );
}

export default AboutSection;

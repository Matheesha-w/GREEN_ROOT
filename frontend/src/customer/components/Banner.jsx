import React from 'react'

const Banner = () => {
  return (
    <div>
             {/* matheesha updated-in here i ahve placed Two Side-by-Side Images with Overlaid Text */}
<div className="flex w-full relative">
  {/* First Image with Text */}
  <div className="relative w-1/2 h-[400px]">
    <img
      src="/customer_images/delivery_01.jpg"
      alt="Shop All"
      className="w-full h-full object-cover"
    />
    <div className="absolute top-1/4 left-6 md:left-12 z-10 text-white">
      <h2 className="text-2xl md:text-4xl font-extrabold drop-shadow-md">
        Experience customer service <br />
        honest and reliable <br />
        crafted just for you
      </h2>
    </div>
  </div>

  {/* Second Image with Text */}
  <div className="relative w-1/2 h-[400px]">
    <img
      src="/customer_images/delivery_02.jpg"
      alt="Fresh Farms"
      className="w-full h-full object-cover"
    />
    <div className="absolute top-1/4 left-6 md:left-12 z-10 text-white">
      <h2 className="text-2xl md:text-4xl font-extrabold drop-shadow-md">
        Easy shopping <br />
        Anytime <br />
        Anywhere
      </h2>
    </div>
  </div>
</div>
    </div>
  )
}

export default Banner
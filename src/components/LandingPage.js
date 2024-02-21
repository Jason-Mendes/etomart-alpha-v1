import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Img, List, Text } from '../components';
// Additional imports for components like HeroSlider, FeaturedProducts, Testimonials

function LandingPage() {
  return (
    <div className=''>
     <div className="bg-white-A700 font-montserrat w-full">
  <div className="flex flex-col justify-end pt-0 w-full">
    <div className="flex flex-col justify-start pb-[100px] rounded-sm w-full">
      <div className="relative w-full h-[696px] md:h-[703px] sm:h-[947px]">
        <div className="bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[200px] rounded-br-[200px] rounded-tr-[200px] shadow-bs h-full m-auto">
        <div className="absolute top-[5%] w-[90%] flex flex-col my-4 ml-4 mr-4  mt-0  px-4  ">
          <div className="flex flex-col justify-start w-full gap-[60px] md:gap-4 ">
            <div className="flex justify-between items-center max-w-[1050px] mt-4 mr-10 px-10">
              <Text className="text-left text-3xl md:text-5xl text-black-900 my-4 mr-4">
                Your Daily Food Delivered Hot & Fresh
              </Text>
              <Img className="h-[434px] md:h-auto object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px] ml-4" src="images/img_istockphoto141.png" alt="Delivered Food" loading="lazy"/>
            </div>
            <Text className="text-4xl md:text-[34px] sm:text-[32px] text-white-A700 ml-[700px] md:ml-0">
              Groceries, Meals, Pharmacies, anything!
            </Text>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start w-[32%] md:w-full ml-14 md:ml-0">
        <div className="flex flex-col justify-start w-full gap-[60px] md:gap-10">
          <div className="bg-white-A700 rounded-[36px] shadow-bs1 p-[9px] flex flex-col items-center justify-end w-full ">
            <div className="flex items-center justify-start gap-[53px] mt-[7px] w-[88%] md:w-full">
              <Img className="h-[67px]" src="images/img_linkedin.svg" alt="LinkedIn"/>
              <Text className="text-[32px] md:text-3xl text-gray-600">
                What's your Address?
              </Text>
            </div>
          </div>
          <div className="relative w-[78%] sm:w-full h-[60px] md:h-[57px] ml-[37px] md:ml-0">
            <div className="bg-white-A700 rounded-[30px] shadow-bs1 p-[7px] flex items-start justify-end w-full h-full">
              <Img className="h-[41px] mt-0.5 w-[42px]" src="images/img_save.svg" alt="Save"/>
            </div>
            <Text className="absolute top-[12%] right-[2%] text-[32px] md:text-3xl text-amber-700">
              Use Current Location
            </Text>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

        
      {/* Hero Section */}
      <section className="hero-section">
        {/* Hero Slider or Static Image */}
      </section>
      
      {/* Search Functionality */}
      <section className="search-bar">
        {/* Search Input */}
      </section>
      
      {/* Featured Products or Categories */}
      <section className="featured-products">
        {/* Dynamically list featured products or categories */}
      </section>
      
      {/* Testimonials or Reviews */}
      <section className="testimonials">
        {/* Display user testimonials */}
      </section>
      
      {/* Call to Action */}
      <section className="cta">
        <Link to="/products" className="btn btn-primary">Shop Now</Link>
      </section>
      
      {/* Footer */}
      <footer className="site-footer">
        {/* Footer Content */}
      </footer>
      </div>
  );
}

export default LandingPage;

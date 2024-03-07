
// import { Link } from 'react-router-dom';
import { Button, Img, Text } from '../components';

import React, { useState, useEffect } from 'react';


function LandingPage() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640); // Assuming 1024px is the threshold for a large screen
    };

    // Initial call to set screen size
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means the effect runs only once after mount

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="">
        <div className="flex flex-col pt-0 mx-auto">
          <div className="flex-col relative ">
            <div className="section flex justify-center items-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] rounded-tr-[200px] shadow-2xl h-[28rem] mt-0 relative" style={{ width: '100%', maxWidth: '1260px', margin: '0 auto' }}>
              <div className="absolute -top-0 lg:top-5 my-4 ml-0 mr-0 mt-0 px-0 w-full">
                <div className="mt-2 flex py-0 px-4 sm:px-16 md:px-6">
                  <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-4 md:gap-4 lg:gap-16  items-center">
                    {/* Conditional Rendering based on Screen Size */}
                    <div className="text-container whitespace-nowrap sm:whitespace-wrap md:whitespace-wrap lg:whitespace-wrap xl:whitespace-wrap">
                      {isLargeScreen ? (
                        <Text className="sm:text-2xl md:text-4xl lg:text-5xl text-black-900 font-montserrat font-bold sm:ml-16 sm:mr-0 md:mr-20 md:ml-14 lg:-mt-16 md:pr-4">
                          Your Daily Food <br /> Delivered <br /> Hot & Fresh
                        </Text>
                      ) : (
                        <Text className=" text-xs text-black-900 font-montserrat font-bold -mt-0 mb-0  -ml-32 px-4 ">
                          Your Daily Food Delivered Hot & Fresh
                        </Text>
                      )}
                    </div>

                    {/* Image and Second Text */}
                    <div className="flex flex-col sm:flex-col items-center">
                      {/* Image */}
                      <div className="image-container ">
                        <Img
                          className="object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px] sm:w-1/2 md:w-auto"
                          src="images/Main_groceries_reverse.jpg"
                          loading="lazy"
                          style={{ width: '650px', height: '320px' }}
                        />
                      </div>
                      {/* Second Text */}
                      <div className="text-container items-center">
                      {isLargeScreen ? (
                        <Text className=" sm:text-1xl md:text-2xl lg:text-3xl text-white font-montserrat font-bold mt-4 mb-4 sm:ml-0 md:ml-0">
                           Groceries, Meals, Pharmacies, anything!
                        </Text>
                      ) : (
                        <Text className="text-sm text-white font-montserrat font-bold mt-4">
                          Groceries, Meals, Pharmacies, anything!
                        </Text>
                      )}
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* Location stuff*/}
      <div className="container bg-white flex items-center p-5 m-8" style={{ width: '100%', maxWidth: '1260px', margin: '0 auto' }}>
        <div className="button-group flex flex-col items-start">
          <div className="button-row flex items-center mb-6">

            <Button className="flex items-center bg-white text-black px-4 py-2 ml-4 rounded-[36px] shadow-lg pr-8 font-montserrat border border-slate-100">
              <img className="h-7 mr-2" src="images/img_linkedin.svg" alt="linkedin" loading="lazy"></img>
              <p className="text-left md:text-3xl sm:text-[28px] text-[32px] text-gray-700 font-bold">What's your Address?</p>
            </Button>
          </div>


          {/* current Location stuff*/}
          <div className="button-row flex mt-2">
            <Button className="flex items-center bg-white text-black px-4 py-2 ml-4 rounded-[36px] shadow-lg pr-8 font-montserrat border border-slate-100">
              <img className="h-5 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
              <p className="text-left md:text-lg sm:text-[28px] text-[32px] text-gray-600 font-bold">Use Current Location</p>
            </Button>
          </div>



        </div>
      </div>
      {/* Locations */}
      {/* Conditional Rendering based on Screen Size */}
      <div className="section flex-col sm:flex-col justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-2xl h-auto relative" style={{ width: '100%', maxWidth: '1260px', margin: '0 auto' }}>

        <div className="text-container whitespace-nowrap sm:whitespace-wrap md:whitespace-wrap lg:whitespace-wrap xl:whitespace-wrap sd:mt-2 mt-2 md:mt-4">
          {isLargeScreen ? (
            <Text className="sm:text-4xl md:text-3xl lg:text-1xl text-black-900 font-montserrat font-bold  sm:ml-16 sm:mr-0 md:mr-20 md:ml-14 md:py-0 lg:mt-0 lg:my-0 md:pr-4">
              Explore Etomart Regions
            </Text>
          ) : (
            <Text className="flex justify-center text-2xl  text-black-900 font-montserrat font-bold  ">
              Explore Etomart Regions
            </Text>
          )}
        </div>

        {/* Second Text */}
        <div className="text-container whitespace-nowrap sm:whitespace-wrap md:whitespace-wrap lg:whitespace-wrap xl:whitespace-wrap sd:mt-2 mt-0 md:mt-4">
          {isLargeScreen ? (
            <Text className="text-1xl sm:text-1xl md:text-1xl lg:text-2xl text-white font-montserrat  mt-0 mb-4 sm:ml-16 sm:mr-0 md:mr-20 md:ml-14">
               Delivered to you at your convenience!
            </Text>
          ) : (
            <Text className="flex justify-center text-1xl  text-white font-montserrat   ">
              Delivered to you at your convenience!
            </Text>
          )}
        </div>

        <div className="">
          <div className=" button-row flex flex-col">
            <div className='w-full button-row flex flex-col'>
               <div className="button-row flex flex-col sm:flex-row gap-4 sm:gap-12 mt-2 mb-6 mx-4   sm:mx-24 h-16"> {/* Adjust the gap as needed */}
                    <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate-100 sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 1</p>
                    </Button>
                    <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate-100 sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 2</p>
                    </Button>
                    <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate- sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 3</p>
                    </Button>
                  </div>
                  <div className="button-row flex flex-col sm:flex-row gap-4 sm:gap-12 mt-2 mb-6 mx-4 sm:mx-24 h-16"> {/* Adjust the gap as needed */}
                    {/* <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate-100 sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 1</p>
                    </Button>
                    <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate-100 sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 2</p>
                    </Button>
                    <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate- sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 3</p>
                    </Button> */}
                  </div>
                  <div className="button-row flex flex-col sm:flex-row gap-4 sm:gap-12 mt-2 mb-6 mx-4 sm:mx-24 h-16"> {/* Adjust the gap as needed */}
                    {/* <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate-100 sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 1</p>
                    </Button>
                    <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate-100 sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 2</p>
                    </Button>
                    <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate- sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 3</p>
                    </Button> */}
                  </div>
                  <div className="button-row flex flex-col sm:flex-row gap-4 sm:gap-12 mt-2 mb-6 mx-4 sm:mx-24 h-16"> {/* Adjust the gap as needed */}
                    {/* <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate-100 sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 1</p>
                    </Button>
                    <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate-100 sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 2</p>
                    </Button>
                    <Button className="flex items-center bg-white text-black px-4 py-2  ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate- sm:w-[270px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 3</p>
                    </Button> */}
                  </div>
                  <div className="  button-row  flex flex-col sm:flex-row gap-4 sm:gap-12 mt-2 mb-6 mx-4 sm:mx-24 h-16">
                    {/* the following buttons width is diferent from the rest w-[260px]*/}
                    {/* <Button className="flex items-center bg-white text-black px-4 py-2 ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate-50 w-[260px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 13</p>
                    </Button>
                    <Button className="flex items-center bg-white text-black px-4 py-2 ml-16 rounded-[36px] shadow-lg pr-12 font-montserrat border border-slate-50 w-[260px]">
                      <img className="h-6 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                      <p className="text-left md:text-[24px] sm:text-[28px] text-[32px] text-gray-600 font-bold">Button 14</p>
                    </Button> */}
                    
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col font-montserrat md:gap-10 gap-[100px] h-[845px] md:h-auto items-center justify-start max-w-[1226px] mt-8 mx-auto md:px-5 py-2.5 w-full">
        <div class="flex flex-col gap-[35px] items-center justify-start w-auto md:w-full">
          <p class="text-left sm:text-[21px] md:text-[23px] text-[25px] text-orange-500 w-auto font-bold font-montserrat">Testimonials</p>
          <p class="text-left md:text-5xl text-6xl text-gray-800 w-auto font-bold font-montserrat">What They Are Saying</p>
          <p class="text-center sm:text-[21px] md:text-[23px] text-[25px] text-gray-600_01 font-montserrat font-semibold">Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.</p>

          <div class="bg-white-A700 flex flex-col gap-[34px] h-[454px] md:h-auto items-center justify-start max-w-[928px] p-2.5 rounded-[30px] shadow-bs3 w-full"> <img class="h-10 w-[232px]" src="images/img_ratings.svg" alt="ratings" loading="lazy"></img>

            <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto"><p class="text-3xl sm:text-[26px] md:text-[28px] text-center text-gray-900 w-auto font-montserrat font-semibold">John Doe</p>
            </div>
          </div>
        </div>
      </div>


      {/* Hero Slider Section */}
      <section className="hero-section">
        {/* Hero Slider or Static Image */}
      </section>

      {/* Search Functionality Section */}
      <section className="search-bar">
        {/* Search Input */}
      </section>

      {/* Featured Products or Categories Section */}
      <section className="featured-products">
        {/* Dynamically list featured products or categories */}
      </section>

      {/* Testimonials or Reviews Section */}
      <section className="testimonials">
        {/* Display user testimonials */}
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        {/* <Link to="/products" className="btn btn-primary">Shop Now</Link> */}
      </section>

      {/* Footer Section */}
      <footer className="site-footer">
        {/* Footer Content */}
      </footer>
      {/* Hero Slider Section */}
      <section className="hero-section">
        {/* Hero Slider or Static Image */}
      </section>

      {/* Search Functionality Section */}
      <section className="search-bar">
        {/* Search Input */}
      </section>

      {/* Featured Products or Categories Section */}
      <section className="featured-products">
        {/* Dynamically list featured products or categories */}
      </section>

      {/* Testimonials or Reviews Section */}
      <section className="testimonials">
        {/* Display user testimonials */}
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        {/* <Link to="/products" className="btn btn-primary">Shop Now</Link> */}
      </section>

      {/* Footer Section */}
      <footer className="site-footer">
        {/* Footer Content */}
      </footer>
    </div>
  );
}

export default LandingPage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Img, Text } from '../components';

// function LandingPage() {
//   return (
//     <div className="font-montserrat">
//       {/* Hero Section */}
//       <div className="w-full">
//         <div className="flex flex-col justify-end pt-0 w-full">
//           <div className="flex-col relative w-full h-[696px] md:h-[600px] sm:h-[947px]">
//             <div className="flex justify-between items-center bg-yellow-400 border border-solid border-white-A700_19 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl shadow-2xl h-full m-auto"
//               style={{ height: '570px' }}>
//               <div className="absolute top-5 my-4 ml-4 mr-4 mt-0 px-6">
//                 <div className="mt-0 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-0 sm:px-0 md:px-0">
//                   <Text className="text-5xl text-black-900 w-96">
//                     Your Daily Food <br /> Delivered <br /> Hot & Fresh
//                   </Text>
//                   <div className="flex justify-end md:ml-5">
//                     <Img className="object-cover rounded-bl-3xl rounded-br-3xl" src="images/img_istockphoto141.png" loading="lazy" style={{ width: '500px', height: '400px' }} />
                 
//                   <Text className="text-3xl text-white absolute top-[450px] left-[30px] md:left-[40px]">
//                     Groceries, Meals, Pharmacies, anything!
//                   </Text>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Location stuff */}
//       <div className="container flex items-center p-5 m-8">
//         <div className="button-group flex flex-col items-center">
//           <div className="button-row flex shadow">
//             <Button className="bg-slate-900 text-white px-4 py-2 ml-4 rounded-md ">Button 1</Button>
//           </div>
//           <div className="button-row flex mt-2">
//             <Button className="bg-amber-600 text-white px-4 py-2 rounded-md">Button 6</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
















// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Img, Text } from '../components';

// function LandingPage() {
//   return (
//     <div className="font-montserrat">
//       {/* Hero Section */}
//       <div className="bg-white-A700 w-full">
//         <div className="flex flex-col justify-end pt-0 w-full">
//           <div className="flex-col relative w-full h-[696px] md:h-[703px] sm:h-[947px]">
//             <div className="flex justify-between items-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[200px] rounded-br-[200px] rounded-tr-[200px] shadow-bs h-full m-auto"
//             style={{ height: '570px' }}>
//               <div className="absolute top-[5%] w-[100%] my-4 ml-4 mr-4 mt-0 px-6">
//                 <div className="mt-0 mb-16 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-0 sm:px-0 md:px-6">
//                   <Text className="text-5xl text-black-900" style={{ width: '900px', height: '170px' }}>
//                     Your Daily Food <br/> Delivered <br/> Hot & Fresh
//                   </Text>
//                   <div className="flex justify-end md:ml-5">
//                     <Img className="object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px]" src="images/img_istockphoto141.png" loading="lazy" style={{ width: '1500px', height: '400px' }} />
//                   </div>
//                 </div>
//                 <Text className="text-3xl text-white absolute top-[450px] left-[30px] md:left-[40px]"
//                 style={{ width: '600px', height: '40px', marginLeft: '35rem' }}>
//                   Groceries, Meals, Pharmacies, anything!
//                 </Text>
//               </div>
//             </div>
//             <div className="flex flex-col justify-start w-[32%] md:w-full ml-14 md:ml-0">
//               <div className="flex flex-col justify-start w-full gap-[60px] md:gap-10">
//                 {/* Additional Components */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Hero Slider Section */}
//       <section className="hero-section">
//         {/* Hero Slider or Static Image */}
//       </section>
      
//       {/* Search Functionality Section */}
//       <section className="search-bar">
//         {/* Search Input */}
//       </section>
      
//       {/* Featured Products or Categories Section */}
//       <section className="featured-products">
//         {/* Dynamically list featured products or categories */}
//       </section>
      
//       {/* Testimonials or Reviews Section */}
//       <section className="testimonials">
//         {/* Display user testimonials */}
//       </section>
      
//       {/* Call to Action Section */}
//       <section className="cta">
//         <Link to="/products" className="btn btn-primary">Shop Now</Link>
//       </section>
      
//       {/* Footer Section */}
//       <footer className="site-footer">
//         {/* Footer Content */}
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;


















// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Img, List, Text } from '../components';
// // Additional imports for components like HeroSlider, FeaturedProducts, Testimonials

// function LandingPage() {
//   return (
//     <div className=''>
//      <div className="bg-white-A700 font-montserrat w-full">
//   <div className="flex flex-col justify-end pt-0 w-full">

//       <div className="flex-col relative w-full h-[696px] md:h-[703px] sm:h-[947px]">
//         <div className="flex justify-between items-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[200px] rounded-br-[200px] rounded-tr-[200px] shadow-bs h-full m-auto "
//          style={{ width: 'auto', height: '550px' }}>
//         <div className="absolute top-[5%] w-[100%] my-4 ml-4 mr-4  mt-0  px-6  ">
          
//           <div className="mt-0 mb-16 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-0 sm:px-0 md:px-6">
//                 <Text className="w-full text-left text-5xl text-black-900 my-4 mr-0 "
//                 style={{ width: '00px', height: '170px' }}>
//                   Your Daily Food <br/> Delivered <br/> Hot & Fresh
//                 </Text>
//                 <div class="flex justify-content:flex-end md:ml-5">

//                 <Img
//                   className=" object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px] "
//                   src="images/img_istockphoto141.png"
//                   loading="lazy"
//                   style={{ width: '1500px', height: '400px' }}
//                 />
//               </div>
//               </div>
//               <Text className="text-3xl md:text-[30px] sm:text-[30px] text-white absolute top-70 left-30 md:ml-40" 
//               style={{ width: '600px', height: '40px', marginLeft: '35rem' }}>           
//     Groceries, Meals, Pharmacies, anything!
// </Text>          
//         </div>
//       </div>
//       <div className="flex flex-col justify-start w-[32%] md:w-full ml-14 md:ml-0">
//         <div className="flex flex-col justify-start w-full gap-[60px] md:gap-10">
//           <div className="bg-white-A700 rounded-[36px] shadow-bs1 p-[9px] flex flex-col items-center justify-end w-full ">
//             <div className="flex items-center justify-start gap-[53px] mt-[7px] w-[88%] md:w-full">
//               <Img className="h-[67px]" src="images/img_linkedin.svg" alt="LinkedIn"/>
//               <Text className="text-[32px] md:text-3xl text-gray-600">
//                 What's your Address?
//               </Text>
//             </div>
//           </div>
//           <div className="relative w-[78%] sm:w-full h-[60px] md:h-[57px] ml-[37px] md:ml-0">
//             <div className="bg-white-A700 rounded-[30px] shadow-bs1 p-[7px] flex items-start justify-end w-full h-full">
//               <Img className="h-[41px] mt-0.5 w-[42px]" src="images/img_save.svg" alt="Save"/>
//             </div>
//             <Text className="absolute top-[12%] right-[2%] text-[32px] md:text-3xl text-amber-700">
//               Use Current Location
//             </Text>
//           </div>
//         </div>
//       </div>
//     </div>

// </div>
// </div>

        
//       {/* Hero Section */}
//       <section className="hero-section">
//         {/* Hero Slider or Static Image */}
//       </section>
      
//       {/* Search Functionality */}
//       <section className="search-bar">
//         {/* Search Input */}
//       </section>
      
//       {/* Featured Products or Categories */}
//       <section className="featured-products">
//         {/* Dynamically list featured products or categories */}
//       </section>
      
//       {/* Testimonials or Reviews */}
//       <section className="testimonials">
//         {/* Display user testimonials */}
//       </section>
      
//       {/* Call to Action */}
//       <section className="cta">
//         <Link to="/products" className="btn btn-primary">Shop Now</Link>
//       </section>
      
//       {/* Footer */}
//       <footer className="site-footer">
//         {/* Footer Content */}
//       </footer>
//       </div>
//   );
// }

// export default LandingPage;

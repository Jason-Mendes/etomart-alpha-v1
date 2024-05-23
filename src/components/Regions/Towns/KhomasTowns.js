import React, { useState, useEffect } from "react";
import OPNavBar from '../../OPNavBar'; //or import OPNavBar from '../../components/OPNavBar';



function KhomasTowns() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      imageSrc: 'images/img_ellipse1.png',
      textBelowImage: 'Lorem ipsum dolor sit amet consectetur.',
      numStars: 1,
      testimonialAuthor: 'John Doe',
    },
    {
      imageSrc: 'images/img_ellipse1.png',
      textBelowImage: 'Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.',
      numStars: 5,
      testimonialAuthor: 'John Doe',
    },
    {
      imageSrc: 'images/img_ellipse1.png',
      textBelowImage: 'Dolor at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil Dolor at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil',
      numStars: 3,
      testimonialAuthor: 'John Doe',
    }
    // Add more testimonials as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div><div>
      <OPNavBar/>
    </div>
    <div className="relative z-10">
    <div id="LP_section_5_orange" className="relative z-10 flex justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl md:h-auto md:p-10 h-auto p-10" style={{ width: '65%', maxWidth: '100vw', margin: '0 auto' }}>
      <div className="relative z-10 flex items-center justify-center w-full mb-0">
        <div className="sc-6db52481-0 kZFPSm cb-elevated cb_elevation_elevationMedium_e16y">
          <div role="tablist" className=" flex space-x-2 gap-2">
            <a
              role="tab"
              aria-selected="false"
              className=" flex items-center space-x-2 gap-2 px-4 py-2 rounded-full bg-white shadow-md  transition-all duration-300  hover:bg-orange-300 transition duration-150"
              href="/en/discovery"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-Black">
                {/* Store SVG icon */}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M.646 0A.646.646 0 0 0 0 .646V4.5a3.5 3.5 0 0 0 6.25 2.165A3.494 3.494 0 0 0 9 8c1.116 0 2.11-.522 2.75-1.335a3.498 3.498 0 0 0 5.75-.362A3.5 3.5 0 0 0 24 4.5V.647A.646.646 0 0 0 23.354 0h-5.708a.647.647 0 0 0-.146.017.647.647 0 0 0-.146-.017H.646ZM2 2v2.5a1.5 1.5 0 1 0 3 0V2H2Zm17 0v2.5a1.5 1.5 0 0 0 3 0V2h-3Zm-6 2.5V2h3v2.5a1.5 1.5 0 0 1-3 0ZM7.5 2v2.5a1.5 1.5 0 1 0 3 0V2h-3Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 22V8.45a3.491 3.491 0 0 0 2 1.015V22h8V12h7.5v10H21V9.465a3.49 3.49 0 0 0 2-1.016V22a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2Zm12 0h3.5v-8H13v8Z"
                />
                <path d="M5.5 12a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3Z" />
              </svg>
              <span className="text-black">Stores</span>
            </a>
            <a
              role="tab"
              aria-selected="false"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md  transition-all duration-300  hover:bg-orange-300 transition duration-150"
              href="/en/discovery/restaurants"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-black">
                {/* Restaurant SVG icon */}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 1a1 1 0 112 0v5a4.009 4.009 0 01-2.667 3.772.5.5 0 00-.333.471V23a1 1 0 11-2 0V10.243a.5.5 0 00-.333-.471A4.009 4.009 0 014 6V1a1 1 0 112 0v5c0 .522.205 1.025.571 1.398A.251.251 0 007 7.223V1a1 1 0 112 0v6.225a.251.251 0 00.429.175c.367-.374.572-.877.571-1.4V1zM20.5.75a.75.75 0 00-.75-.75C17.418 0 15.064 6.055 15 13.243v.021c.004.686.563 1.24 1.25 1.236H18a.5.5 0 01.5.5v8a1 1 0 102 0V.75z"
                />
              </svg>
              <span className="text-black">Restaurants</span>
            </a>
          </div>
        </div>
      </div>
    
 
  
        </div>

        <div
            id="LP_Did_you_know_container_4"
            class="flex flex-col gap-[35px] items-center justify-start w-auto md:w-full pt-16 pb-6"
          >
            <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
              <p class="text-left md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">
              Restaurants, Stores and Supermarkets Near Me
              </p>
            </div>
            <div
          id="LP_section_5_orange_How_it_Works"
          className="flex-col sm:flex-col justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative p-16 h-auto"
          style={{ width: "100%", maxWidth: "100vw", margin: "0 auto" }}
        >
          <div className="flex flex-col items-center justify-center w-full -mt-6">
            <div
              id="how-it-works"
              className="flex flex-col items-center justify-center  p-2 w-auto"
            >
              <p className="text-center md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">
                How it Works?
              </p>
            </div>
            <div
              id="how-it-works-text"
              className="flex flex-col items-center justify-center  p-6 w-auto"
            >
          <div id="cards" className="flex flex-wrap justify-center gap-6">
            <div className="bg-white flex flex-col items-center py-[21px] rounded-[20px] shadow-md w-[480px] h-[350px]">
              <img
                className="h-[96px] w-[96px] mb-4"
                src="/images/img_materialsymbol.svg"
                alt="materialsymbol"
              />
              <div className="text-center p-2">
                <p
                  id="title"
                  className=" text-black text-lg sm:text-xl md:text-2xl lg:text-3xl  max-w-xl font-bold mb-2"
                >
                  Order at Your convenience
                </p>
                <div className="text-center p-2">
                  <p
                    id="body"
                    className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl text-black font-semibold"
                  >
                    Browse through a wide selection of restaurants and shops,
                    and order your favorite meals, groceries, or other
                    essentials.
                  </p>
                </div>
              </div>
              </div>        </div>        </div>

            <div className="bg-white flex flex-col items-center py-[21px] rounded-[20px] shadow-md w-[480px] h-[350px]">
              <img
                className="h-[96px] w-[96px] mb-4"
                src="/images/img_mdicursorpointer.svg"
                alt="mdicursorpointe"
              />
              <div className="text-center p-2">
                <p
                  id="title"
                  className=" text-black text-lg sm:text-xl md:text-2xl lg:text-3xl  max-w-xl font-bold mb-2"
                >
                  Fast Delivery
                </p>
                <div className="text-center p-2">
                  <p
                    id="body"
                    className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl text-black font-semibold"
                  >
                    Etomart's fleet of delivery partners ensures your order
                    arrives quickly, so you can enjoy your meals or items
                    wherever and whenever
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white flex flex-col items-center py-[21px] rounded-[20px] shadow-md w-[480px] h-[350px]">
              <img
                className="h-[96px] w-[96px] mb-4"
                src="/images/img_mditruckdelivery.svg"
                alt="mditruckdeliver"
              />
              <div className="text-center p-2">
                <p
                  id="title"
                  className=" text-black text-lg sm:text-xl md:text-2xl lg:text-3xl  max-w-xl font-bold mb-2"
                >
                  Convenient Tracking
                </p>
                <div className="text-center p-2">
                  <p
                    id="body"
                    className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl text-black font-semibold"
                  >
                    Track your order in real-time through the Etomart site, so
                    you always know when your delivery is on its way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>


        <div id="another_section" className="flex-col sm:flex-col justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10" style={{ width: '100%', maxWidth: '100vw', margin: '0 auto' }}>
          <div className="flex flex-col items-center w-full mb-8">
            <div id="how-it-works" className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
              <p className="text-left md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">Another Section</p>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default KhomasTowns;



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
//                     <Img className="object-cover rounded-bl-3xl rounded-br-3xl" src="/images/img_istockphoto141.png" loading="lazy" style={{ width: '500px', height: '400px' }} />
                 
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
//                     <Img className="object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px]" src="/images/img_istockphoto141.png" loading="lazy" style={{ width: '1500px', height: '400px' }} />
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
//                   src="/images/img_istockphoto141.png"
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
//               <Img className="h-[67px]" src="/images/img_linkedin.svg" alt="LinkedIn"/>
//               <Text className="text-[32px] md:text-3xl text-zinc-950">
//                 What's your Address?
//               </Text>
//             </div>
//           </div>
//           <div className="relative w-[78%] sm:w-full h-[60px] md:h-[57px] ml-[37px] md:ml-0">
//             <div className="bg-white-A700 rounded-[30px] shadow-bs1 p-[7px] flex items-start justify-end w-full h-full">
//               <Img className="h-[41px] mt-0.5 w-[42px]" src="/images/img_save.svg" alt="Save"/>
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

// {/* <section className="hero-section">
// {/* Hero Slider or Static Image */}
// </section></>
// {/* Search Functionality Section */}
// <section className="search-bar">
//   {/* Search Input */}
// </section>
// {/* Featured Products or Categories Section */}
// <section className="featured-products">
//   {/* Dynamically list featured products or categories */}
// </section>
// {/* Testimonials or Reviews Section */}
// <section className="testimonials">
//   {/* Display user testimonials */}
// </section>
// {/* Call to Action Section */}
// <section className="cta">
//   {/* <Link to="/products" className="btn btn-primary">Shop Now</Link> */}
// </section>
// {/* Footer Section */}
// <footer className="site-footer">
//   {/* Footer Content */}
// </footer>
// {/* Hero Slider Section */}
// <section className="hero-section">
//   {/* Hero Slider or Static Image */}
// </section>
// {/* Search Functionality Section */}
// <section className="search-bar">
//   {/* Search Input */}
// </section>
// {/* Featured Products or Categories Section */}
// <section className="featured-products">
//   {/* Dynamically list featured products or categories */}
// </section>
// {/* Testimonials or Reviews Section */}
// <section className="testimonials">
//   {/* Display user testimonials */}
// </section>
// {/* Call to Action Section */}
// <section className="cta">
//   {/* <Link to="/products" className="btn btn-primary">Shop Now</Link> */}
// </section>
// {/* Footer Section */}
// <footer className="site-footer">
//   {/* Footer Content */}
// </footer> */}
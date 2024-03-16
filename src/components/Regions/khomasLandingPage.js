import React, { useState, useEffect } from 'react';

function KhomasLandingPage() {
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
    <div>
      <div id="LP_section_5_orange" className="flex-col sm:flex-col justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10" style={{ width: '100%', maxWidth: '100vw', margin: '0 auto' }}>
        <div className="flex flex-col items-center w-full mb-8">
          <div id="how-it-works" className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
            <p className="text-left md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">How it Works?</p>
          </div>
        </div>
      </div>
      
      <div id='Testimonials Card' className="w-full flex justify-center">
  <div id="LP_testimonials_container_4" className="flex flex-col items-center gap-[35px] justify-start w-full pt-16 pb-16 px-4 md:px-10">
    {/* Slideshow */}
    <div className="flex transition-transform duration-500 ease-in-out transform" key={currentSlide}>
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`bg-slate-50 border border-solid border-white-A700_19 rounded-bl-[200px] rounded-br-[200px] rounded-tl-[200px] rounded-tr-[200px] shadow-xl max-w-full md:max-w-[928px] p-6 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0 absolute'
          }`}
        >
          <div className="flex flex-col items-center justify-center px-6 py-6 w-auto">
            <img
              className="flex items-center justify-center h-[117px] md:h-auto rounded-[50%] w-[117px]"
              src={testimonial.imageSrc}
              alt={`Testimonial ${index + 1}`}
            />
          </div>
          <div
            id="text part"
            className="flex flex-wrap justify-center gap-4 items-center g-white-A700 flex-row p-2 shadow-bs3 w-full"
          >
            <div className="flex flex-row items-center justify-center w-auto">
              <div className="flex items-center justify-center p-2">
                {/* Controls */}
                <button
                  onClick={handlePrevSlide}
                  className="p-4 bg-white border border-slate-200 shadow-lg w-8 h-8 flex items-center justify-center focus:outline-none z-10 rounded-full" 
                >
                  &lt;
                </button>
                <div className="flex flex-col items-center justify-center px-6 w-auto">
                  {/* Text container with fixed width and height */}
                  <div className="flex items-center justify-center overflow-hidden md:w-[550px] md:h-[100px] w-full h-auto">
                    <p className="text-center text-lg md:text-2xl font-josefin_sans font-semibold line-clamp-3">
                      {testimonial.textBelowImage}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleNextSlide}
                  className="bg-white border border-slate-200 shadow-lg w-8 h-8 flex items-center justify-center focus:outline-none z-10 rounded-full"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 items-center w-full">
            <div className="flex flex-col items-center justify-center px-6 pb-4 w-auto">
              <div className="flex flex-wrap justify-center gap-6 items-center g-white-A700 flex-col p-3 shadow-bs3 w-full pb-4">
                <div className="flex flex-wrap justify-center gap-4 items-center g-white-A700 flex-row pb-8 shadow-bs3 w-full">
                  {Array.from({ length: testimonial.numStars }, (_, starIndex) => (
                    <div
                      key={starIndex}
                      className="flex flex-wrap justify-center items-center w-10 h-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <path
                            d="M9.70801 36.6667L12.4163 24.9583L3.33301 17.0833L15.333 16.0417L19.9997 5L24.6663 16.0417L36.6663 17.0833L27.583 24.9583L30.2913 36.6667L19.9997 30.4583L9.70801 36.6667Z"
                            fill="#FE9E0D"
                          />
                        </g>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                <p className="text-xl md:text-3xl text-center text-gray-900 w-auto font-josefin_sans font-semibold">
                  {testimonial.testimonialAuthor}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
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
  );
}

export default KhomasLandingPage;



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
//               <Text className="text-[32px] md:text-3xl text-zinc-950">
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
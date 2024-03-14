import React, { useState, useEffect } from 'react';
import { Button, Img, Text } from '../components';


function LandingPage() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  //Location buttons stuff  
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState('');
  //Country stuff
  const regions = [
    { code: 'ALB', name: 'Khomas', flagPath: '/images/regions/khomas.jpeg' },
    { code: 'HRV', name: 'Erongo', flagPath: '/images/regions/erongo.jpeg' },
    { code: 'CYP', name: 'Oshana', flagPath:  '/images/regions/oshana.jpeg' },
    { code: 'ALB', name: 'Omusati ', flagPath:  '/images/regions/omusati.jpeg' },
    { code: 'HRV', name: 'Karas', flagPath: '/images/regions/kharas2.jpeg' },
    { code: 'CYP', name: 'Ohangwena', flagPath: '/images/regions/ohangwena.jpeg' },
    { code: 'ALB', name: 'Zambezi', flagPath: '/images/regions/zambezi.jpeg' },
    { code: 'HRV', name: 'Oshikoto', flagPath: '/images/regions/oshikoto.jpeg' },
    { code: 'CYP', name: 'Omaheke', flagPath: '/images/regions/omaheke.jpeg' },
    { code: 'ALB', name: 'Hardap', flagPath: '/images/regions/hardap.jpeg' },
    { code: 'HRV', name: 'Otjozondjupa', flagPath: '/images/regions/otjozondjupa.jpeg' },
    { code: 'CYP', name: 'Kunene', flagPath: '/images/regions/kunene2.jpeg' },
    { code: 'ALB', name: 'Kavango East', flagPath: '/images/regions/kavango east.jpeg' },
    { code: 'HRV', name: 'Kavango West', flagPath: '/images/regions/kavango west.jpeg' }
  ];

  const handleClick = (url) => {
    // Handle the click event here
    // You can navigate to the URL or perform any other action
    console.log('Clicked URL:', url);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    // Initial call to set screen size
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //Location buttons stuff  

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the location data here
    setIsEditing(false);
  };

  return (
    <div id="Landing_Page_Main_Body" className="content-wrapper ">
      <div className="overflow-hidden">
        {/* Hero Section */}
        {/* Orange Section */}
        <div id="LP_section_1_orange" className=" flex-col sm:flex-col justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[180px] rounded-tr-[180px] shadow-xl relative md:h-auto md:p-10 h-auto p-10" style={{ width: '100%', maxWidth: '100vw', margin: '0 auto' }}>
          {/* This is a style for the orange section to just be in the center when you zoom out and not span the whole page style={{ width: '100%', maxWidth: '1260px', margin: '0 auto' }}> */}
          {/* Orange Content section  */}
          <div id="text_1_image_container" className=' flex items-center justify-evenly md:items-center overflow-hidden md:gap-6 lg:gap-16 xl:gap-20 2xl:gap-72 sm:mr-16 md:mr-0 mr-0'>
            <div id="text_1_container" className="flex justify-center flex-grow md:-mt-20 p-6 ml-6">
              {/* First is large screens, second is normal to small screens*/}
              {isLargeScreen ? (
                <Text className="sm:text-2xl text-nowrap mt-2  md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-black-900 font-Agbalumo font-bold">
                  Your Daily Food <br /> Delivered <br /> Hot & Fresh
                </Text>
              ) : (
                <Text className="text-2xl  text-nowrap mt-2 mr-6  text-black-900 font-Agbalumo font-bold">
                  Your Daily Food <br /> Delivered <br /> Hot & Fresh
                </Text>
              )}
            </div>

            <div id="text_2_image_container" className='flex flex-col '>

              <div id="image_container">
                <Img className="object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px] mb-4 w-60 h-auto md:w-screen md:h-60 lg:w-screen lg:h-64 xl:w-screen xl:h-72 2xl:w-screen 2xl:h-80" src="images/Main_groceries_reverse.jpg" loading="lazy" />
              </div>
              {/* Wrap the additional content in a separate div */}
              <div id="text_2_container_show_large_screens" className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
                <div className="flex justify-center mt-4">
                  <p className="text-sm md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white font-josefin_sans font-bold">Groceries, Meals, Pharmacies, anything!</p>
                </div>
              </div>
            </div>
          </div>
          <div id="text_2_container_show_small_screens" className="md:hidden lg:hidden xl:hidden 2xl:hidden">
            <div className="flex justify-center mt-4">
              <p className="text-xl sm:text-xl md:text-2xl text-white font_josefin-sans  font-bold">Groceries, Meals, Pharmacies, anything!</p>
            </div>
          </div>
        </div>
        {/* Location stuff */}
        <div id="LP_location_buttons_container_2" className="flex items-center justify-center sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start p-8 mx-auto sm:max-w-full md:max-w-screen lg:max-w-screen xl:max-w-screen 2xl:max-w-screen" style={{ maxWidth: '1800px', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* different styling method to make it start at the end of the page<div  id="location_buttons_container" className=" bg-white flex items-center p-5 m-8" style={{ width: '100%', maxWidth: '1260px', margin: '0 auto' }}>*/}
          <div className="button-group flex items-start ">
            <div className="button-row flex flex-col gap-4 items-center justify-center md:items-start lg:items-start xl:items-start 2xl:items-start mb-4">
              {/* Button 1 */}
              <Button className="flex items-center bg-white text-black px-4 py-2 ml-0 rounded-[36px] shadow-lg pr-8 font-josefin_sans border border-slate-200" onClick={handleEditClick}>
                <img className="h-7 mr-2" src="images/img_linkedin.svg" alt="linkedin" loading="lazy" />
                <p className={`text-left md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl sm:text-lg text-xl text-gray-700 font-bold ${isEditing ? 'hidden' : ''}`}>What's your Address?</p>
                <input className={`text-left md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl sm:text-lg text-xl text-gray-700 font-bold focus:outline-none ${!isEditing ? 'hidden' : ''}`} type="text" value={location} onChange={handleInputChange} />
              </Button>

              {/* Button 2 */}
              <Button className="flex items-center bg-white text-black px-4 py-2 ml-0 rounded-[36px] shadow-lg pr-8 font-josefin_sans border border-slate-200" onClick={handleSaveClick}>
                <img className="h-5 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                <p className="text-left md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl sm:text-sm text-base text-gray-600 font-bold">Use Current Location</p>
              </Button>
            </div>
          </div>
        </div>

        {/* Location stuff ends */}

        {/* Location stuff*/}
        {/* <div  id="location_buttons_container" className=" bg-white flex items-center p-5 m-8" style={{ width: '100%', maxWidth: '1260px', margin: '0 auto' }}>
          <div className="button-group flex flex-col items-start">
            <div id="location_buttons_1_container" className="button-row flex items-center mb-6">
              <Button className="flex items-center bg-white text-black px-4 py-2 ml-4 rounded-[36px] shadow-lg pr-8 font-montserrat border border-slate-100">
                <img className="h-7 mr-2" src="images/img_linkedin.svg" alt="linkedin" loading="lazy"></img>
                <p className="text-left md:text-3xl sm:text-[28px] text-[32px] text-gray-700 font-bold">What's your Address?</p>
              </Button>
            </div>
            {/* current Location stuff
            <div id="location_buttons_1_container" className="button-row flex mt-2">
              <Button className="flex items-center bg-white text-black px-4 py-2 ml-4 rounded-[36px] shadow-lg pr-8 font-montserrat border border-slate-100">
                <img className="h-5 mr-2" src="images/img_save.svg" alt="save" loading="lazy" />
                <p className="text-left md:text-lg sm:text-[28px] text-[32px] text-gray-600 font-bold">Use Current Location</p>
              </Button>
            </div>
          </div>
        </div> */}
        {/* Locations */}
        {/* Conditional Rendering based on Screen Size */}

        <div id="LP_section_3_orange" className=" flex-col sm:flex-col justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10" style={{ width: '100%', maxWidth: '100vw', margin: '0 auto' }}>
          <div className="text-container whitespace-nowrap sm:whitespace-wrap md:whitespace-wrap lg:whitespace-wrap xl:whitespace-wrap sd:mt-2 mt-2 md:mt-4">
            {isLargeScreen ? (
              <Text className="sm:text-4xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-black-900 font-Agbalumo sm:ml-16 sm:mr-0 md:mr-20 md:ml-14 md:py-0 lg:mt-0 lg:my-0 md:pr-4">
                Explore Etomart Regions
              </Text>
            ) : (
              <Text className="flex justify-center text-2xl text-black-900 font-Agbalumo font-bold ">
                Explore Etomart Regions
              </Text>
            )}
          </div>
          <div className="text-container whitespace-nowrap sm:whitespace-wrap md:whitespace-wrap lg:whitespace-wrap xl:whitespace-wrap sd:mt-2 mt-0 md:mt-4">
            {isLargeScreen ? (
              <Text className="text-1xl sm:text-1xl md:text-1xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white font-josefin_sans mt-0 mb-4 sm:ml-16 sm:mr-0 md:mr-20 md:ml-14">
                Delivered to you at your convenience!
              </Text>
            ) : (
              <Text className="flex justify-center text-1xl text-white font-josefin_sans ">
                Delivered to you at your convenience!
              </Text>
            )}
 {/* Regions Buttons */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-16 gap-y-6 md:gap-x-40 py-2 px-16">
  {regions.map((country, index) => (
    <div key={country.code} className="flex justify-center">
      <div className="button-row flex flex-col gap-4 items-center justify-center md:items-center lg:items-center xl:items-center 2xl:items-center mb-4 w-full">
        <Button
          className="flex flex-wrap justif-start items-center bg-white text-black px-4 py-2 ml-0 rounded-[36px] shadow-lg pr-8 font-josefin_sans border border-slate-200 w-full"
          onClick={() => handleClick(`/en/${country.code.toLowerCase()}`)}
        >
          <img
            className="rounded-[36px] h-6 mr-2 flex-shrink-0"
            src={country.flagPath}
            alt={`${country.name} flag`}
            loading="lazy"
          />
          <p className=" text-left md:text-base lg:text-lg xl:text-xl 2xl:text-2xl sm:text-lg text-xl text-gray-700 font-bold flex-shrink">
            {country.name}
          </p>
          <div className="ml-2 flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-6 fill-current text-gray-600"
            >
              <g fill="none" fillRule="evenodd">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M16.5 18a.498.498 0 01-.37-.836L20.824 12 16.13 6.836a.499.499 0 11.74-.672l5 5.5a.5.5 0 010 .672l-5 5.5a.498.498 0 01-.37.164"
                  fill="#202125"
                />
              </g>
            </svg>
          </div>
        </Button>
      </div>
    </div>
  ))}
</div>
 {/* Regions Buttons ends*/}
</div>
</div>
<div id="LP_testimonials_container_4" class="flex flex-col gap-[35px] items-center justify-start w-auto md:w-full pt-16 pb-6">
  <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
    <p class="text-left sm:text-[21px] md:text-[23px] text-[25px] text-orange-500 w-auto font-bold font-shrikhand">Testimonials</p>
  </div>
  <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
    <p class="text-left md:text-5xl text-6xl text-gray-800 w-auto font-bold font-Agbalumo">What They Are Saying</p>
  </div>
  <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
    <p class="text-center sm:text-[21px] md:text-[23px] text-[25px] max-w-xl text-gray-600_01 font-josefin_sans font-semibold">Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.</p>
  </div>

  <div class="bg-white-A700 flex flex-col gap-[34px] h-[454px] md:h-auto items-center justify-start max-w-[928px] p-2.5 rounded-[30px] shadow-bs3 w-full">
    <img class="h-[117px] md:h-auto rounded-[50%] w-[117px]" src="images/img_ellipse1.png" alt="ellipseOne" />
  </div>
  <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
    <p class="text-center sm:text-[21px] md:text-[23px] text-[25px] max-w-xl text-gray-600_01 font-josefin_sans font-semibold">Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.</p>
  </div>
  <div class="bg-white-A700 flex flex-col gap-[34px] h-[454px] md:h-auto items-center justify-start max-w-[928px] p-2.5 rounded-[30px] shadow-bs3 w-full">
    <img class="h-10 w-[232px]" src="images/img_ratings.svg" alt="ratings" loading="lazy" />
    <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
      <p class="text-3xl sm:text-[26px] md:text-[28px] text-center text-gray-900 w-auto font-josefin_sans font-semibold">John Doe</p>
    </div>
  </div>
  <div id="LP_section_5_orange" className="flex-col sm:flex-col justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10" style={{ width: '100%', maxWidth: '100vw', margin: '0 auto' }}>
  <div className="flex flex-col items-center w-full mb-8">
    <div id="how-it-works" className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
      <p className="text-left md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">How it Works</p>
    </div>
    <div id="how-it-works-text" className="flex flex-col items-center justify-center px-2.5 pt-6 pb-6 w-auto">
      <p className="text-center sm:text-[21px] md:text-[23px] text-[25px] max-w-xl text-white font-josefin_sans font-semibold">Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.</p>
    </div>
  </div>
  <div id="cards" className="flex flex-col md:flex-row md:gap-10 gap-6 items-center justify-center mx-auto p-2.5 w-full">
    <div className="bg-white flex sm:flex-1 flex-col gap-[50px] items-center justify-center py-[21px] rounded-[20px] shadow-md w-full md:w-auto">
      <img className="h-[131px] w-[131px]" src="images/img_materialsymbol.svg" alt="materialsymbol" />
      <p className="text-3xl sm:text-[26px] md:text-[28px] text-center text-gray-800_02 w-auto font-bold">Choose How Often</p>
      <p className="max-w-[344px] md:max-w-full text-center text-gray-800_03 text-xl font-semibold">Lorem ipsum dolor sit amet consectetur. Maecenas orci et</p>
    </div>
    <div className="bg-white flex sm:flex-1 flex-col gap-[50px] items-center justify-center py-[21px] rounded-[20px] shadow-md w-full md:w-auto">
      <img className="h-[131px] w-[131px]" src="images/img_mdicursorpointer.svg" alt="mdicursorpointe" />
      <p className="text-3xl sm:text-[26px] md:text-[28px] text-center text-gray-800_02 w-auto font-bold">Choose How Often</p>
      <p className="max-w-[344px] md:max-w-full text-center text-gray-800_03 text-xl font-semibold">Lorem ipsum dolor sit amet consectetur. Maecenas orci et</p>
    </div>
    <div className="bg-white flex sm:flex-1 flex-col gap-[50px] items-center justify-center py-[21px] rounded-[20px] shadow-md w-full md:w-auto">
      <img className="h-[120px] w-[120px]" src="images/img_mditruckdelivery.svg" alt="mditruckdeliver" />
      <p className="text-3xl sm:text-[26px] md:text-[28px] text-center text-gray-800_02 w-auto font-bold">Fast Deliveries</p>
      <p className="max-w-[344px] md:max-w-full text-center text-gray-800_03 text-xl font-semibold">Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum</p>
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

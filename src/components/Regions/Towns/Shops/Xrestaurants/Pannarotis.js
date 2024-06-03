import React, { useState, useEffect, useRef } from 'react';

function Pannarotis () {

    const storescards1 = [
        {
            name: "Checkers",
            imgSrc: "/images/supermarkets/checkers.png",
            href: "/en/discovery/category/checkers",
            discount: 10, // Assuming a 10% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Supermarket",
            pickupTime: "15–30 min"
        },
        {
            name: "Shoprite",
            imgSrc: "/images/supermarkets/shoprite.png",
            href: "/en/discovery/category/shoprite",
            discount: 5, // Assuming a 5% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$",
            cuisine: "Supermarket",
            pickupTime: "10–25 min"
        },
        {
            name: "Pick n Pay",
            imgSrc: "/images/supermarkets/picknpay.png",
            href: "/en/discovery/category/picknpay",
            discount: 15, // Assuming a 15% discount
            isEtomartStore: true, // Assuming it's a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Supermarket",
            pickupTime: "20–35 min"
        },
        {
            name: "Spar",
            imgSrc: "/images/supermarkets/spar.png",
            href: "/en/discovery/category/spar",
            discount: 10, // Assuming a 10% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Supermarket",
            pickupTime: "15–30 min"
        },
        {
            name: "Woermann Brock",
            imgSrc: "/images/supermarkets/woermannbrock.png",
            href: "/en/discovery/category/woermannbrock",
            discount: 5, // Assuming a 5% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$",
            cuisine: "Supermarket",
            pickupTime: "10–25 min"
        },
        {
            name: "OK Foods",
            imgSrc: "/images/supermarkets/okfoods.png",
            href: "/en/discovery/category/okfoods",
            discount: 10, // Assuming a 10% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Supermarket",
            pickupTime: "15–30 min"
        },
        {
            name: "Choppies",
            imgSrc: "/images/supermarkets/choppies.png",
            href: "/en/discovery/category/choppies",
            discount: 5, // Assuming a 5% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$",
            cuisine: "Supermarket",
            pickupTime: "10–25 min"
        },
        {
            name: "Food Lover's Market",
            imgSrc: "/images/supermarkets/foodlovers.png",
            href: "/en/discovery/category/foodloversmarket",
            discount: 15, // Assuming a 15% discount
            isEtomartStore: true, // Assuming it's a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Supermarket",
            pickupTime: "20–35 min"
        },
        {
            name: "Metro",
            imgSrc: "/images/supermarkets/metro.png",
            href: "/en/discovery/category/metro",
            discount: 10, // Assuming a 10% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Supermarket",
            pickupTime: "15–30 min"
        },
        {
            name: "Joe's Beerhouse",
            imgSrc: "/images/restaurants/joesbeerhouse.png",
            href: "/en/discovery/category/joesbeerhouse",
            discount: 20, // Assuming a 20% discount
            isEtomartStore: true, // Assuming it's a Etomart '~' store
            priceRange: "N$$",
            cuisine: "Pub",
            pickupTime: "20–40 min"
        },
        {
            name: "The Stellenbosch Wine Bar",
            imgSrc: "/images/restaurants/stellenbosch.png",
            href: "/en/discovery/category/stellenbosch",
            discount: 15, // Assuming a 15% discount
            isEtomartStore: true, // Assuming it's a Etomart '~' store
            priceRange: "N$$",
            cuisine: "Wine Bar",
            pickupTime: "25–45 min"
        },
        {
            name: "O Portuga",
            imgSrc: "/images/restaurants/oportuga.png",
            href: "/en/discovery/category/oportuga",
            discount: 10, // Assuming a 10% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Portuguese",
            pickupTime: "20–35 min"
        },
        {
            name: "The Social",
            imgSrc: "/images/restaurants/thesocial.png",
            href: "/en/discovery/category/thesocial",
            discount: 10, // Assuming a 10% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Cafe",
            pickupTime: "15–30 min"
        },
        {
            name: "Sardinia Blue Olive",
            imgSrc: "/images/restaurants/sardiniablueolive.png",
            href: "/en/discovery/category/sardiniablueolive",
            discount: 15, // Assuming a 15% discount
            isEtomartStore: true, // Assuming it's a Etomart '~' store
            priceRange: "N$$",
            cuisine: "Mediterranean",
            pickupTime: "25–45 min"
        },
        {
            name: "Slowtown Coffee Roasters",
            imgSrc: "/images/restaurants/slowtown.png",
            href: "/en/discovery/category/slowtown",
            discount: 10, // Assuming a 10% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Coffee",
            pickupTime: "10–20 min"
        },
        {
            name: "Dis-Chem",
            imgSrc: "/images/pharmacies/dischem.png",
            href: "/en/discovery/category/dischem",
            discount: 5, // Assuming a 5% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Pharmacy",
            pickupTime: "10–20 min"
        },
        {
            name: "Clicks Pharmacy",
            imgSrc: "/images/pharmacies/clicks.png",
            href: "/en/discovery/category/clicks",
            discount: 5, // Assuming a 5% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Pharmacy",
            pickupTime: "10–20 min"
        },
        {
            name: "Nampharm Pharmacy",
            imgSrc: "/images/pharmacies/nampharm.png",
            href: "/en/discovery/category/nampharm",
            discount: 5, // Assuming a 5% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Pharmacy",
            pickupTime: "10–20 min"
        },
        {
            name: "Alpha Pharm",
            imgSrc: "/images/pharmacies/alphapharm.png",
            href: "/en/discovery/category/alphapharm",
            discount: 5, // Assuming a 5% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Pharmacy",
            pickupTime: "10–20 min"
        },
        {
            name: "Medicine World",
            imgSrc: "/images/pharmacies/medicineworld.png",
            href: "/en/discovery/category/medicineworld",
            discount: 5, // Assuming a 5% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Pharmacy",
            pickupTime: "10–20 min"
        }, 
        {
            name: "City Pharmacy",
            imgSrc: "/images/pharmacies/citypharmacy.png",
            href: "/en/discovery/category/citypharmacy",
            discount: 5, // Assuming a 5% discount
            isEtomartStore: false, // Assuming it's not a Etomart '~' store
           priceRange: "N$$",
            cuisine: "Pharmacy",
            pickupTime: "10–20 min"
        }
        ];

        const cards = [
          {
            title: "Back Pack",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
            image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          },
          {
            title: "Games",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
            image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          },
          {
            title: "Back Pack",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
            image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          },
          {
            title: "Games",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
            image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          },
          {
            title: "Back Pack",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
            image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          },
          // Add more cards as needed
        ];
        
         const [currentIndex, setCurrentIndex] = useState(0);
        const containerRef = useRef(null);
        const extendedCards = [...cards, ...cards, ...cards];
        const [isPaused, setIsPaused] = useState(false);
      
        useEffect(() => {
          if (!isPaused) {
            const interval = setInterval(() => {
              handleNext();
            }, 5000);
            return () => clearInterval(interval);
          }
        }, [isPaused, currentIndex]);
      
        const handleNext = () => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        };
      
        const handlePrev = () => {
          setCurrentIndex((prevIndex) => prevIndex - 1);
        };
      
        const handleTransitionEnd = () => {
          if (currentIndex >= extendedCards.length - cards.length) {
            setCurrentIndex(cards.length);
            containerRef.current.style.transition = 'none';
            containerRef.current.style.transform = `translateX(-${cards.length * 576}px)`;
            setTimeout(() => {
              containerRef.current.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
          }
          if (currentIndex <= 0) {
            setCurrentIndex(extendedCards.length - 2 * cards.length);
            containerRef.current.style.transition = 'none';
            containerRef.current.style.transform = `translateX(-${(extendedCards.length - 2 * cards.length) * 576}px)`;
            setTimeout(() => {
              containerRef.current.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
          }
        };
      
        const pauseScroll = () => {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
          }, 5000);
        };
      
        const handleDotClick = (index) => {
          setCurrentIndex(index);
          pauseScroll();
        };
  return (
    <div>
    <main className="my-8">
      <div className="container mx-auto px-6">
        <div className="h-64 rounded-md overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144')" }}>
          <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
            <div className="px-10 max-w-xl">
              <h2 className="text-2xl text-white font-semibold">Sport Shoes</h2>
              <p className="mt-2 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
              <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <span>Shop Now</span>
                <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

       {/* storescards1scroll Container */} 
       <div>
      <main className="my-8">
        <div className="container mx-auto px-6">
          <div className="h-64 rounded-md overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144')" }}>
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Sport Shoes</h2>
                <p className="mt-2 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
                <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  <span>Shop Now</span>
                  <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative mt-8 overflow-hidden">
            <div
              ref={containerRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 576}px)`,
                width: `${extendedCards.length * 576}px`
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedCards.map((card, index) => (
                <div key={index} className="p-2 flex-shrink-0" style={{ width: '576px', height: '276px' }}>
                  <div className="h-full w-full rounded-md overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }}>
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">{card.title}</h2>
                        <p className="mt-2 text-gray-400">{card.description}</p>
                        <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                          <span>Shop Now</span>
                          <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="absolute top-2 right-16 bg-white rounded-full p-2 shadow-md" onClick={handlePrev}>
              &lt;
            </button>
            <button className="absolute top-2 right-4 bg-white rounded-full p-2 shadow-md" onClick={handleNext}>
              &gt;
            </button>

            <div className="absolute bottom-4 w-full flex justify-center space-x-2">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
                  onClick={() => handleDotClick(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
{/* storescards1scroll Container */}


        <div className="flex flex-wrap justify-start">
          {storescards1.map((category, shopsindex) => (
            <div key={shopsindex} className="w-1/4 p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
              <a href={category.href} className="block">
                <div className="relative w-56">
                  <img
                    src={category.imgSrc}
                    alt={category.name}
                    className="object-cover w-full h-40 rounded-t-md"
                    decoding="async"
                    loading="lazy"
                    fetchPriority="high"
                  />
                  {category.discount && (
                    <div
                      data-testid="venue-discount-label"
                      className="absolute top-0 right-0 mt-2 mr-2 bg-[#ee9613] text-black text-xs px-2 py-1 rounded"
                    >
                      {`-${category.discount}%`}
                    </div>
                  )}
                  {category.isEtomartStore && (
                    <div
                      data-test-id="venue-badges"
                      className="absolute bottom-0 left-0 ml-2 mb-2 bg-[#ee9613] text-black text-xs px-2 py-1 rounded"
                    >
                      Etomart '~'
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h3 data-testid="venue-name" className="font-bold">
                    {category.name}
                  </h3>
                  <div className="flex items-center  text-sm">
                    <div className="text-[#ee9613] text-sm font-bold">
                      <span>{category.priceRange}</span>
                    </div>
                    <span className="mx-1">•</span>
                    <span>{category.cuisine}</span>
                  </div>
                  <div className="text-xs text-gray-500">{`Pickup: ${category.pickupTime}`}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
        {/* storescards1scroll Container ends */}
      </div>
    </main>
  </div>
  )
}

export default Pannarotis;

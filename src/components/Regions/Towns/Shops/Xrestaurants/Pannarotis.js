import React from 'react'

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


  return (
    <div>
    <main class="my-8">
      <div class="container mx-auto px-6">
          <div class="h-64 rounded-md overflow-hidden bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1280&amp;q=144')"}}>
              <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                  <div class="px-10 max-w-xl">
                      <h2 class="text-2xl text-white font-semibold">Sport Shoes</h2>
                      <p class="mt-2 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
                      <button class="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                          <span>Shop Now</span>
                          <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </button>
                  </div>
              </div>
          </div>
          <div class="md:flex mt-8 md:-mx-4">
              <div class="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2" style={{backgroundImage: "url('https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=750&amp;q=80')"}}>
                  <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div class="px-10 max-w-xl">
                          <h2 class="text-2xl text-white font-semibold">Back Pack</h2>
                          <p class="mt-2 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
                          <button class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                              <span>Shop Now</span>
                              <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                          </button>
                      </div>
                  </div>
              </div>
              <div class="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2" style={{backgroundImage: "url('https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80')"}}>
                  <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div class="px-10 max-w-xl">
                          <h2 class="text-2xl text-white font-semibold">Games</h2>
                          <p class="mt-2 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
                          <button class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                              <span>Shop Now</span>
                              <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          
{/* storescards1scroll Container */}
<div
                    data-testid="carousel-header"
                    className="flex items-center"
                  >
                    <h2 className="text-2xl font-bold">Stores and supermarkets near me</h2>
                    <div  className="ml-auto"
                    >
                    <button
                      data-test-id="sorting.button"
                      aria-label="Sorted by Recommended Filter 0"
                      className="flex items-center px-4 py-2 border rounded-md"
                    >
                      <div className="flex items-center">
                        Sorted by
                        <span
                          data-test-id="sorting.button.activeSorting"
                          className="ml-2 font-semibold"
                        >
                          Recommended
                        </span>
                      </div>
                      <div className="ml-2">
                        <svg
                          viewBox="0 0 20 21"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.41703 10.7133V17.085C5.41703 17.306 5.50483 17.5179 5.66111 17.6742C5.81739 17.8305 6.02935 17.9183 6.25037 17.9183C6.47138 17.9183 6.68334 17.8305 6.83962 17.6742C6.9959 17.5179 7.0837 17.306 7.0837 17.085L7.0837 10.7133C7.68556 10.5338 8.2134 10.1648 8.58871 9.66122C8.96402 9.15763 9.16675 8.54635 9.16675 7.91829C9.16675 7.29024 8.96402 6.67896 8.58871 6.17537C8.2134 5.67179 7.68556 5.3028 7.0837 5.12329V2.91829C7.0837 2.69728 6.9959 2.48532 6.83962 2.32904C6.68334 2.17276 6.47138 2.08496 6.25037 2.08496C6.02935 2.08496 5.81739 2.17276 5.66111 2.32904C5.50483 2.48532 5.41703 2.69728 5.41703 2.91829V5.12329C4.81518 5.3028 4.28734 5.67179 3.91203 6.17537C3.53672 6.67896 3.33398 7.29024 3.33398 7.91829C3.33398 8.54635 3.53672 9.15763 3.91203 9.66122C4.28734 10.1648 4.81518 10.5338 5.41703 10.7133ZM7.2897 7.22383C7.42706 7.42939 7.50037 7.67107 7.50037 7.91829C7.50037 8.24981 7.36867 8.56776 7.13425 8.80218C6.89983 9.0366 6.58189 9.16829 6.25037 9.16829C6.00314 9.16829 5.76147 9.09498 5.5559 8.95763C5.35034 8.82028 5.19013 8.62506 5.09552 8.39665C5.00091 8.16824 4.97615 7.91691 5.02439 7.67443C5.07262 7.43195 5.19167 7.20923 5.36648 7.03441C5.5413 6.85959 5.76403 6.74054 6.0065 6.69231C6.24898 6.64408 6.50031 6.66884 6.72872 6.76344C6.95713 6.85805 7.15235 7.01827 7.2897 7.22383ZM12.917 15.2966L12.917 17.085C12.917 17.306 13.0048 17.5179 13.1611 17.6742C13.3174 17.8305 13.5294 17.9183 13.7504 17.9183C13.9714 17.9183 14.1833 17.8305 14.3396 17.6742C14.4959 17.5179 14.5837 17.306 14.5837 17.085V15.2966C15.1856 15.1171 15.7134 14.7481 16.0887 14.2445C16.464 13.741 16.6667 13.1297 16.6667 12.5016C16.6667 11.8736 16.464 11.2623 16.0887 10.7587C15.7134 10.2551 15.1856 9.88613 14.5837 9.70663V2.91829C14.5837 2.69728 14.4959 2.48532 14.3396 2.32904C14.1833 2.17276 13.9714 2.08496 13.7504 2.08496C13.5294 2.08496 13.3174 2.17276 13.1611 2.32904C13.0048 2.48532 12.917 2.69728 12.917 2.91829V9.70663C12.3152 9.88613 11.7873 10.2551 11.412 10.7587C11.0367 11.2623 10.834 11.8736 10.834 12.5016C10.834 13.1297 11.0367 13.741 11.412 14.2445C11.7873 14.7481 12.3152 15.1171 12.917 15.2966ZM14.7897 11.8072C14.9271 12.0127 15.0004 12.2544 15.0004 12.5016C15.0004 12.8331 14.8687 13.1511 14.6342 13.3855C14.3998 13.6199 14.0819 13.7516 13.7504 13.7516C13.5031 13.7516 13.2615 13.6783 13.0559 13.541C12.8503 13.4036 12.6901 13.2084 12.5955 12.98C12.5009 12.7516 12.4762 12.5002 12.5244 12.2578C12.5726 12.0153 12.6917 11.7926 12.8665 11.6177C13.0413 11.4429 13.264 11.3239 13.5065 11.2756C13.749 11.2274 14.0003 11.2522 14.2287 11.3468C14.4571 11.4414 14.6523 11.6016 14.7897 11.8072ZM10.2754 3.58829C10.4964 3.58829 10.7084 3.67609 10.8646 3.83237C11.0209 3.98865 11.1087 4.20061 11.1087 4.42163C11.1087 4.64264 11.0209 4.8546 10.8646 5.01088C10.7084 5.16716 10.4964 5.25496 10.2754 5.25496C10.0544 5.25496 9.84242 5.16716 9.68614 5.01088C9.52986 4.8546 9.44206 4.64264 9.44206 4.42163C9.44206 4.20061 9.52986 3.98865 9.68614 3.83237C9.84242 3.67609 10.0544 3.58829 10.2754 3.58829Z"
                            fill="#121E28"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </div>
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

{/*  storescards1scroll Container  ends*/}
{/*  storescards1scroll Container  ends*/}
          <div class="mt-16">
              <h3 class="text-gray-600 text-2xl font-medium">Fashions</h3>
              <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                  <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                      <div className="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=376&q=80")' }}>
                          <button class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                              <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                          </button>
                      </div>
                      <div class="px-5 py-3">
                          <h3 class="text-gray-700 uppercase">Chanel</h3>
                          <span class="text-gray-500 mt-2">$12</span>
                      </div>
                  </div>
                  
              </div>
          </div>
          <div class="mt-16">
              <h3 class="text-gray-600 text-2xl font-medium">Fashions</h3>
              <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                  
                  <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                      <div class="flex items-end justify-end h-56 w-full bg-cover" style={{backgroundImage: `url('https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1500&amp;q=80')`}}>
                          <button class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                              <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                          </button>
                      </div>
                      <div class="px-5 py-3">
                          <h3 class="text-gray-700 uppercase">Man Mix</h3>
                          <span class="text-gray-500 mt-2">$12</span>
                      </div>
                  </div>
                  
              </div>
          </div>
      </div>
  </main>
  </div>
  )
}

export default Pannarotis;

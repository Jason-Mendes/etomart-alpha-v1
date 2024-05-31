import React from 'react'

function Storestest() {
  return (
    <div>
      <div lang="en">
        <div id="appsFlyerBanner" aria-hidden="true"></div>
        <div id="app">
          <div
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              pointerEvents: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100000,
            }}
          ></div>
          <div className="relative">
            <main
              id="mainContent"
              tabIndex="-1"
              className="flex flex-col items-center"
            >
              <div style={{ height: '0px' }}></div>
              <div>
                <div className="rtl" data-test-id="MainDiscoveryContent">
                  <div>
                  <div className="flex flex-col space-y-2">
      <div className="text-gray-700">
        The store isn't delivering to your location, but you can still place an order for pickup.
      </div>
      <div className="flex items-center justify-between space-x-28">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <svg
              viewBox="0 0 16 16"
              width="16"
              aria-hidden="true"
              className="text-primary"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C15.9949 3.58385 12.4161 0.00514317 8 0ZM8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6626 11.6802 11.6802 14.6626 8 14.6667ZM11.4227 10.54L8.33333 7.70733V4.33333C8.33333 3.96514 8.03486 3.66667 7.66667 3.66667C7.29848 3.66667 7 3.96514 7 4.33333V8C6.99979 8.18704 7.07817 8.36556 7.216 8.492L10.522 11.522C10.7947 11.7672 11.2135 11.7492 11.464 11.4813C11.7123 11.2099 11.6938 10.7886 11.4227 10.54Z"
              ></path>
            </svg>
            <span>Opens today at 10:00</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              viewBox="0 0 24 24"
              width="16"
              aria-hidden="true"
              className="text-yellow-400"
            >
              <circle cx="12" cy="12" r="12" fill="yellow" />
            </svg>
            <span>9.8</span>
          </div>
          <button
            type="button"
            className="text-blue-500 flex items-center space-x-1"
          >
            <svg viewBox="0 0 24 24" width="16">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.993 5.376 18.624.007 12 0zm.25 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75c0 .138.112.25.25.25h.75a1 1 0 010 2z"></path>
            </svg>
            <span>See more information</span>
          </button>
        </div>
        <div className="flex items-end justify-end space-x-2">
          <button
            className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700"
          >
            Delivery
          </button>
          <button
            className="px-4 py-2 rounded-full border border-gray-300 bg-gray-200 text-gray-700"
          >
            Pickup
          </button>
        </div>
      </div>
    </div>

                    <div
                      data-test-id="discovery.offersSection"
                      className="py-4"
                    >
                      </div>

                    <div
                      data-test-id="discovery.nearbySection"
                      className="py-4"
                    >
                      <h2 className="text-lg font-bold">Nearby</h2>
                      <div className="flex flex-col gap-4 py-2">
                        <a
                          href="/en/stores/vennes-cafe/"
                          className="flex items-center"
                          data-test-id="merchant-container-link"
                        >
                          <div className="relative w-24">
                            <img
                              src="/images/supermarkets/woermannbrock.png"
                              alt="Vennes Cafe"
                              className="object-cover w-full h-24 rounded-md"
                              decoding="async"
                              loading="lazy"
                              fetchPriority="high"
                            />
                          </div>
                          <div className="ml-4">
                            <h3
                              data-testid="venue-name"
                              className="font-bold"
                            >
                              Vennes Cafe
                            </h3>
                            <div className="flex items-center text-sm">
                              <span>€€€</span>
                              <span className="mx-1">•</span>
                              <span>Cafe</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Pickup: 10–30 min
                            </div>
                          </div>
                        </a>
                        <a
                          href="/en/stores/istanbul-kebab-house/"
                          className="flex items-center"
                          data-test-id="merchant-container-link"
                        >
                          <div className="relative w-24">
                            <img
                              src="/images/supermarkets/woermannbrock.png"
                              alt="Istanbul Kebab House"
                              className="object-cover w-full h-24 rounded-md"
                              decoding="async"
                              loading="lazy"
                              fetchPriority="high"
                            />
                          </div>
                          <div className="ml-4">
                            <h3
                              data-testid="venue-name"
                              className="font-bold"
                            >
                              Istanbul Kebab House
                            </h3>
                            <div className="flex items-center text-sm">
                              <span>€€€</span>
                              <span className="mx-1">•</span>
                              <span>Kebab</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Pickup: 20–40 min
                            </div>
                          </div>
                        </a>
                        <a
                          href="/en/stores/teater-kvarteret-barista/"
                          className="flex items-center"
                          data-test-id="merchant-container-link"
                        >
                          <div className="relative w-24">
                            <img
                              src="/images/supermarkets/woermannbrock.png"
                              alt="Teater Kvarteret Barista"
                              className="object-cover w-full h-24 rounded-md"
                              decoding="async"
                              loading="lazy"
                              fetchPriority="high"
                            />
                          </div>
                          <div className="ml-4">
                            <h3
                              data-testid="venue-name"
                              className="font-bold"
                            >
                              Teater Kvarteret Barista
                            </h3>
                            <div className="flex items-center text-sm">
                              <span>€€€</span>
                              <span className="mx-1">•</span>
                              <span>Coffee</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Pickup: 15–35 min
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      data-test-id="discovery.popularSection"
                      className="py-4"
                    >
                      <h2 className="text-lg font-bold">Popular</h2>
                      <div className="flex flex-col gap-4 py-2">
                        <a
                          href="/en/stores/vennes-cafe/"
                          className="flex items-center"
                          data-test-id="merchant-container-link"
                        >
                          <div className="relative w-24">
                            <img
                              src="/images/supermarkets/woermannbrock.png"
                              alt="Vennes Cafe"
                              className="object-cover w-full h-24 rounded-md"
                              decoding="async"
                              loading="lazy"
                              fetchPriority="high"
                            />
                          </div>
                          <div className="ml-4">
                            <h3
                              data-testid="venue-name"
                              className="font-bold"
                            >
                              Vennes Cafe
                            </h3>
                            <div className="flex items-center text-sm">
                              <span>€€€</span>
                              <span className="mx-1">•</span>
                              <span>Cafe</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Pickup: 10–30 min
                            </div>
                          </div>
                        </a>
                        <a
                          href="/en/stores/istanbul-kebab-house/"
                          className="flex items-center"
                          data-test-id="merchant-container-link"
                        >
                          <div className="relative w-24">
                            <img
                              src="/images/supermarkets/woermannbrock.png"
                              alt="Istanbul Kebab House"
                              className="object-cover w-full h-24 rounded-md"
                              decoding="async"
                              loading="lazy"
                              fetchPriority="high"
                            />
                          </div>
                          <div className="ml-4">
                            <h3
                              data-testid="venue-name"
                              className="font-bold"
                            >
                              Istanbul Kebab House
                            </h3>
                            <div className="flex items-center text-sm">
                              <span>€€€</span>
                              <span className="mx-1">•</span>
                              <span>Kebab</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Pickup: 20–40 min
                            </div>
                          </div>
                        </a>
                        <a
                          href="/en/stores/teater-kvarteret-barista/"
                          className="flex items-center"
                          data-test-id="merchant-container-link"
                        >
                          <div className="relative w-24">
                            <img
                              src="/images/supermarkets/woermannbrock.png"
                              alt="Teater Kvarteret Barista"
                              className="object-cover w-full h-24 rounded-md"
                              decoding="async"
                              loading="lazy"
                              fetchPriority="high"
                            />
                          </div>
                          <div className="ml-4">
                            <h3
                              data-testid="venue-name"
                              className="font-bold"
                            >
                              Teater Kvarteret Barista
                            </h3>
                            <div className="flex items-center text-sm">
                              <span>€€€</span>
                              <span className="mx-1">•</span>
                              <span>Coffee</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Pickup: 15–35 min
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="px-4 pb-4"
                  data-test-id="discovery.venuesList"
                >
                  <div className="py-4 border-b border-gray-200">
                    <div
                      data-testid="venue-list-header"
                      className="flex items-center"
                    >
                      <h2 className="text-lg font-bold">All venues</h2>
                      <button
                        data-test-id="venue-list-header-sort"
                        className="ml-auto text-blue-600"
                      >
                        Sort by
                      </button>
                    </div>
                    <div className="flex flex-col gap-4 py-2">
                      <a
                        href="/en/stores/vennes-cafe/"
                        className="flex items-center"
                        data-test-id="merchant-container-link"
                      >
                        <div className="relative w-24">
                          <img
                            src="/images/supermarkets/woermannbrock.png"
                            alt="Vennes Cafe"
                            className="object-cover w-full h-24 rounded-md"
                            decoding="async"
                            loading="lazy"
                            fetchPriority="high"
                          />
                        </div>
                        <div className="ml-4">
                          <h3
                            data-testid="venue-name"
                            className="font-bold"
                          >
                            Vennes Cafe
                          </h3>
                          <div className="flex items-center text-sm">
                            <span>€€€</span>
                            <span className="mx-1">•</span>
                            <span>Cafe</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Pickup: 10–30 min
                          </div>
                        </div>
                      </a>
                      <a
                        href="/en/stores/istanbul-kebab-house/"
                        className="flex items-center"
                        data-test-id="merchant-container-link"
                      >
                        <div className="relative w-24">
                          <img
                            src="/images/supermarkets/woermannbrock.png"
                            alt="Istanbul Kebab House"
                            className="object-cover w-full h-24 rounded-md"
                            decoding="async"
                            loading="lazy"
                            fetchPriority="high"
                          />
                        </div>
                        <div className="ml-4">
                          <h3
                            data-testid="venue-name"
                            className="font-bold"
                          >
                            Istanbul Kebab House
                          </h3>
                          <div className="flex items-center text-sm">
                            <span>€€€</span>
                            <span className="mx-1">•</span>
                            <span>Kebab</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Pickup: 20–40 min
                          </div>
                        </div>
                      </a>
                      <a
                        href="/en/stores/teater-kvarteret-barista/"
                        className="flex items-center"
                        data-test-id="merchant-container-link"
                      >
                        <div className="relative w-24">
                          <img
                            src="/images/supermarkets/woermannbrock.png"
                            alt="Teater Kvarteret Barista"
                            className="object-cover w-full h-24 rounded-md"
                            decoding="async"
                            loading="lazy"
                            fetchPriority="high"
                          />
                        </div>
                        <div className="ml-4">
                          <h3
                            data-testid="venue-name"
                            className="font-bold"
                          >
                            Teater Kvarteret Barista
                          </h3>
                          <div className="flex items-center text-sm">
                            <span>€€€</span>
                            <span className="mx-1">•</span>
                            <span>Coffee</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Pickup: 15–35 min
                          </div>
                        </div>
                      </a>
                      <a
                        href="/en/stores/nordic-food/?show_wolt_plus_offer=true"
                        className="flex items-center"
                        data-test-id="merchant-container-link"
                      >
                        <div className="relative w-24">
                          <img
                            src="/images/supermarkets/woermannbrock.png"
                            alt="Nordic Food"
                            className="object-cover w-full h-24 rounded-md"
                            decoding="async"
                            loading="lazy"
                            fetchPriority="high"
                          />
                          <div
                            data-testid="venue-discount-label"
                            className="absolute top-0 right-0 mt-2 mr-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded"
                          >
                            -20%
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3
                            data-testid="venue-name"
                            className="font-bold"
                          >
                            Nordic Food
                          </h3>
                          <div className="flex items-center text-sm">
                            <span>€€€</span>
                            <span className="mx-1">•</span>
                            <span>Nordic</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Pickup: 20–40 min
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center px-6 pt-6">
                <div className="flex flex-col">
                  <button
                    className="text-gray-600 text-xs"
                  >
                    Home
                  </button>
                  <button
                    className="text-gray-600 text-xs"
                  >
                    Order history
                  </button>
                  <button
                    className="text-gray-600 text-xs"
                  >
                    Profile
                  </button>
                  <button
                    className="text-gray-600 text-xs"
                  >
                    Contact us
                  </button>
                  <button
                    className="text-gray-600 text-xs"
                  >
                    Help
                  </button>
                </div>
              </div>  </main>
          </div> </div> </div> </div>







  );
};


export default Storestest;

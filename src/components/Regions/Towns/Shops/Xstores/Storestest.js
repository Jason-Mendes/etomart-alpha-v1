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

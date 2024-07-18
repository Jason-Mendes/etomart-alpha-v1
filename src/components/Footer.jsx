import React from "react";

function Footer() {
  //Footer stuff
  const companyLinks = [
    {
      label: "Jobs",
      url: "https://careers.wolt.com",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Security",
      url: "/en/alb/security",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Investors",
      url: "https://ir.doordash.com/overview/default.aspx",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Wolt Market",
      url: "/en/alb/wolt-market",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Developers",
      url: "https://developer.wolt.com",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  const GetToKnowUs = [
    {
      label: "About us",
      url: "/en/alb/about",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "What we stand for",
      url: "/en/alb/about/wolt-values",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Support",
      url: "https://wolt.com/help",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Contact",
      url: "/en/alb/contact",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Sustainability",
      url: "/en/alb/about/better-cities",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  const usefulLinks = [
    {
      label: "For couriers",
      url: "/en/alb/couriers",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "For merchants",
      url: "/en/alb/merchant",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "For affiliates",
      url: "/en/alb/affiliates",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Promo codes",
      url: "https://life.wolt.com/en/alb/howto/wolt-promo-codes",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Wolt Ads",
      url: "/en/alb/wolt-ads",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  const followLinks = [
    {
      label: "Blog",
      url: "https://blog.wolt.com/",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Instagram",
      url: "https://instagram.com/woltapp",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/woltapp/",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/woltapp",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/wolt-oy/",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  const handleLanguageChange = () => {
    // Handle language change logic here
  };

  const handleAccessibilitySettingsOpen = () => {
    // Handle accessibility settings opening logic here
  };

  return (
    <div>
      <div
        id="LP_section_3_orange"
        className="bg-[#ee9613] p-4 border border-solid border-white-A700_19 rounded-tl-[150px] rounded-tr-[150px] shadow-xl relative"
        style={{ width: "100%", maxWidth: "100vw", margin: "0 auto" }}
      >
        <div className="flex items-center justify-center mx-16  flex-col md:flex-row ">
          <div className="flex items-center justify-center ">
            <div className="flex justify-start items-center m-4">
              <h1 className="text-3xl font-shrikhand text-[#000000] whitespace-nowrap">
                <a href="/LP">Etomart</a>
              </h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-0 flex flex-col md:flex-row justify-between items-center ">
          <div className="flex flex-col items-center justify-between">
            <div className="flex items-center justify-between flex-col md:flex-col gap-2 m-2">
              <a
                href="https://wolt.onelink.me/Uy67?af_adset=not-available-web-to-app&af_keywords=not-available-web-to-app&af_r=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.wolt.android&af_sub1=https%3A%2F%2Fwww.google.com%2F&af_sub2=%2Fen&c=not-available-web-to-app&pid=not-available-web-to-app"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Download the Wolt Android app on Google Play"
                title="Download the Wolt iOS app on the App Store"
                data-test-id="platform-badge-consumer-android"
                className="wpt-ui-AppLink_Link_l1ld7axn"
                style={{ width: "120px", height: "50px" }}
              >
                <img
                  src="https://images.ctfassets.net/23u853certza/7xaqvusYmbDlca5umD9bZo/a0fa3e1c7ca41a70c6285d6c7b18c92b/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                  loading="lazy"
                  className="wpt-ui-AppLink_StyledImage_s1lunxia"
                  alt="Download the Wolt iOS app on the App Store"
                />
              </a>
              <a
                href="https://wolt.onelink.me/Uy67?af_adset=not-available-web-to-app&af_keywords=not-available-web-to-app&af_r=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.wolt.android&af_sub1=https%3A%2F%2Fwww.google.com%2F&af_sub2=%2Fen&c=not-available-web-to-app&pid=not-available-web-to-app"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Download the Wolt Android app on Google Play"
                title="Download the Wolt iOS app on the App Store"
                data-test-id="platform-badge-consumer-android"
                className="wpt-ui-AppLink_Link_l1ld7axn"
                style={{ width: "120px", height: "50px" }}
              >
                <img
                  src="https://images.ctfassets.net/23u853certza/1Djo4jOj0doR5PfWVzj9O6/d52acac7f94db66263f5ad9e01c41c82/google-play-badge.png"
                  loading="lazy"
                  className="wpt-ui-AppLink_StyledImage_s1lunxia"
                  alt="Download the Wolt Android app on Google Play"
                />
              </a>
            </div>
          </div>

          <div className="flex items-end gap-4 md:gap-32">
            <div className="flex flex-col items-center">
              <nav>
                <div className="flex text-center p-2 mb-0">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-Agbalumo text-black">
                    Company Links
                  </p>
                </div>
                <div className="p-2 wpt-ui-FooterLinkColumn_LinkRegion_lrl0tag">
                  <ul className="wpt-ui-FooterLinkColumn_Links_ln8lzpy space-y-0">
                    {companyLinks.map((link, index) => (
                      <li key={index.label}>
                        <a
                          href={link.url}
                          target={link.target}
                          className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-xl font-josefin_sans hover:text-black transition duration-150 ease-in-out"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
            <div className="flex flex-col items-center">
              <nav>
                <div className="flex text-center p-2 mb-0">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-Agbalumo text-black">
                    Useful Links
                  </p>
                </div>
                <div className="p-2 wpt-ui-FooterLinkColumn_LinkRegion_lrl0tag">
                  <ul className="wpt-ui-FooterLinkColumn_Links_ln8lzpy space-y-0">
                    {usefulLinks.map((link, index) => (
                      <li key={index.label}>
                        <a
                          href={link.url}
                          target={link.target}
                          className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-xl font-josefin_sans hover:text-black transition duration-150 ease-in-out"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
            <div className="flex flex-col items-center">
              <nav>
                <div className="flex text-center p-2 mb-0">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-Agbalumo text-black">
                    Get to Know US
                  </p>
                </div>
                <div className="p-2 wpt-ui-FooterLinkColumn_LinkRegion_lrl0tag">
                  <ul className="wpt-ui-FooterLinkColumn_Links_ln8lzpy space-y-0">
                    {GetToKnowUs.map((link, index) => (
                      <li key={index.label}>
                        <a
                          href={link.url}
                          target={link.target}
                          className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-xl font-josefin_sans hover:text-black transition duration-150 ease-in-out"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
            <div className="flex flex-col items-center">
              <nav>
                <div className="flex text-center p-2 mb-0">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-Agbalumo text-black">
                    Follow Links
                  </p>
                </div>
                <div className="p-2 wpt-ui-FooterLinkColumn_LinkRegion_lrl0tag">
                  <ul className="wpt-ui-FooterLinkColumn_Links_ln8lzpy space-y-0">
                    {followLinks.map((link, index) => (
                      <li key={index.label}>
                        <a
                          href={link.url}
                          target={link.target}
                          className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-xl font-josefin_sans hover:text-black transition duration-150 ease-in-out"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center bg-[#ee9613] py-4">
          <div className="flex flex-row md:flex-row items-center md:items-start space-x-4 md:space-x-8">
            <button
              aria-label="Change language"
              data-test-id="Footer.OpenLanguageSelectionDialogButton"
              className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl flex font-Agbalumo items-center text-zinc-950 hover:text-zinc-50 transition-colors"
              onClick={handleLanguageChange}
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
              >
                <g fill="currentColor">
                  <path d="M21 21.53c0-.29.24-.53.53-.53c.29 0 .53.23.53.53v1.06c0 .29-.24.53-.53.53c-.29 0-.53-.24-.53-.53z" />
                  <path
                    fillRule="evenodd"
                    d="M16 1C7.716 1 1 7.716 1 16c0 8.284 6.716 15 15 15c8.284 0 15-6.716 15-15c0-8.284-6.716-15-15-15m-3.975 2.619C6.79 5.299 3 10.207 3 16c0 7.18 5.82 13 13 13s13-5.82 13-13c0-1-.113-1.975-.327-2.911L27.32 15.12c-.12.18-.32.29-.54.29h-.34c-.17 0-.31-.14-.31-.31v-.54c0-1.2-.8-3.15-2-3.15h-1.55c-.53 0-.73.66-.42.93l.23.19c.44.37.35 1.06-.16 1.32l-1.15.58h-.35c-.36 0-.66-.3-.66-.66v-.85c0-.27-.22-.5-.5-.5h-.006c-.29 0-1.434 0-1.434 1.4v.5c0 1.01 1.74 1.82 2.73 1.98c.16.02.29.16.29.32v.36c0 .22-.05.44-.15.64l-1.91 2.85h-.34c-.33 0-.6.26-.61.59l-.06 2.42l-1.7 1.7c-.2.21-.47.32-.76.32h-.49c-.6 0-1.08-.49-1.08-1.08v-2.25c0-.56-.29-.7-.5-.7h-.35c-.36 0-.66-.3-.66-.66v-1.72c0-.93-.75-1.68-1.68-1.68H8c-.89 0-2-1.69-2-2.58v-.71c0-.45.17-.88.47-1.2l1.07-1.13c.24-.25.58-.39.93-.38h1.06c.31 0 .6-.12.82-.34l.32-.32c.22-.22.52-.34.83-.34h1.04c.23 0 .49.12.48.39v.28c-.03.58 1.1.32 1.1.32s.96-.87 1.4-.97c.45-.11 1.35.14 1.88.46c.29.17.65-.03.65-.36c0-.63-.52-1.14-1.15-1.14h-.37a.49.49 0 0 1-.49-.49v-.72a.29.29 0 0 0-.29-.29h-.37c-.21 0-.41.1-.53.28l-.62.92c-.12.19-.33.3-.56.3h-.14c-.32 0-.62-.12-.85-.35l-.44-.34c-.36-.3-.82-.31-.91-.31h-.97c-.2 0-.35.16-.35.35l-.04.3c0 .36-.25.85-.61.85h-.58c-.36 0-.65-.29-.65-.64v-1.2c0-.37.3-.66.66-.66c.2 0 .35-.16.35-.35v-.31c0-.79.57-.91.99-.81c.179.047.365.126.553.207c.297.127.6.257.887.263h1.58c.59 0 .98-.4.98-.98c0-.145.007-.296.014-.445c.031-.663.06-1.287-.544-1.165l-.28.28c-.18.19-.29.44-.29.71v.14c0 .25-.2.47-.45.49c-.24.01-.55-.03-.55-.34c0-.26-.008-.41-.015-.547c-.01-.21-.02-.383.005-.863a.546.546 0 0 1 .005-.051m6.21-.428a13.033 13.033 0 0 0-1.537-.173l.352.352h1.01z"
                    clipRule="evenodd"
                  />
                </g>
              </svg>
              <span>English</span>
            </button>
            <button
              aria-label="Open accessibility settings"
              className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl flex font-Agbalumo items-center space-x-2 text-zinc-950 hover:text-zinc-50 transition-colors"
              onClick={handleAccessibilitySettingsOpen}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                  clipRule="evenodd"
                />
                <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
              </svg>
              <span>Accessibility</span>
            </button>
          </div>
          <div className="flex items-center space-x-4 text-zinc-950 font-Agbalumo mt-4 md:mt-0">
            <div className="flex items-center space-x-4">
              <button
                aria-label="Open accessibility settings"
                className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl flex font-Agbalumo items-center space-x-2 text-zinc-950 hover:text-zinc-50 transition-colors"
                onClick={handleAccessibilitySettingsOpen}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  {/* SVG icon path */}
                </svg>
                <span>Privacy Statement</span>
              </button>
              <button
                aria-label="Open accessibility settings"
                className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl flex font-Agbalumo items-center space-x-2 text-zinc-950 hover:text-zinc-50 transition-colors"
                onClick={handleAccessibilitySettingsOpen}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  {/* SVG icon path */}
                </svg>
                <span>User Terms of Service</span>
              </button>
            </div>
            <div className="flex flex-col ">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl">
                ©️ Etomart 2024{" "}
              </p>
              <p className="flex items-center justify-center text-sm sm:text-sm md:text-sm lg:text-sm max-w-base">
                {" "}
                All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

import React, { useState, useCallback } from "react";

const Footer = () => {
  const [language, setLanguage] = useState("English");

  const linkCategories = {
    companyLinks: [
      { label: "Jobs", url: "https://careers.wolt.com" },
      { label: "Security", url: "/en/alb/security" },
      { label: "Investors", url: "https://ir.doordash.com/overview/default.aspx" },
      { label: "Wolt Market", url: "/en/alb/wolt-market" },
      { label: "Developers", url: "https://developer.wolt.com" },
    ],
    usefulLinks: [
      { label: "For couriers", url: "/en/alb/couriers" },
      { label: "For merchants", url: "/en/alb/merchant" },
      { label: "For affiliates", url: "/en/alb/affiliates" },
      { label: "Promo codes", url: "https://life.wolt.com/en/alb/howto/wolt-promo-codes" },
      { label: "Wolt Ads", url: "/en/alb/wolt-ads" },
    ],
    getToKnowUs: [
      { label: "About us", url: "/en/alb/about" },
      { label: "What we stand for", url: "/en/alb/about/wolt-values" },
      { label: "Support", url: "https://wolt.com/help" },
      { label: "Contact", url: "/en/alb/contact" },
      { label: "Sustainability", url: "/en/alb/about/better-cities" },
    ],
   followLinks: [
      { label: "Blog", url: "https://blog.wolt.com/" },
      { label: "Instagram", url: "https://instagram.com/woltapp" },
      { label: "Facebook", url: "https://www.facebook.com/woltapp/" },
      { label: "Twitter", url: "https://twitter.com/woltapp" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/wolt-oy/" },
    ],
  };

  const handleLanguageChange = useCallback(() => {
    // Implement language change logic
    setLanguage(prevLang => prevLang === "English" ? "Español" : "English");
  }, []);

  const handleAccessibilitySettingsOpen = useCallback(() => {
    // Implement accessibility settings logic
    console.log("Accessibility settings opened");
  }, []);

  const renderLinkColumn = useCallback((title, links) => (
    <div className="flex flex-col items-center">
      <nav>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-Agbalumo text-black mb-2">
          {title}
        </h2>
        <ul className="space-y-1">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm sm:text-base md:text-lg font-josefin_sans hover:text-black transition duration-150 ease-in-out"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  ), []);

  return (
    <footer className="bg-[#ee9613] rounded-tl-[150px] rounded-tr-[150px] shadow-xl">
      <div className="container mx-auto px-4 py-8">
        {/* Centered Etomart logo */}
        <div className="flex justify-center mb-8">
          <a href="/LP" className="text-3xl font-shrikhand text-black">
            Etomart
          </a>
        </div>

        {/* Link categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {renderLinkColumn("Company Links", linkCategories.companyLinks)}
          {renderLinkColumn("Useful Links", linkCategories.usefulLinks)}
          {renderLinkColumn("Get to Know Us", linkCategories.getToKnowUs)}
          {renderLinkColumn("Follow Links", linkCategories.followLinks)}
        </div>

        {/* Mobile download tags - hidden on small screens, visible below links on larger screens */}
        <div className="hidden md:flex justify-center gap-4 mb-8">
          <a
            href="https://apps.apple.com/app/id943905271"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download the Etomart iOS app on the App Store"
          >
            <img
              src="https://images.ctfassets.net/23u853certza/7xaqvusYmbDlca5umD9bZo/a0fa3e1c7ca41a70c6285d6c7b18c92b/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
              alt="Download on the App Store"
              className="h-10"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.wolt.android"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get the Etomart Android app on Google Play"
          >
            <img
              src="https://images.ctfassets.net/23u853certza/1Djo4jOj0doR5PfWVzj9O6/d52acac7f94db66263f5ad9e01c41c82/google-play-badge.png"
              alt="Get it on Google Play"
              className="h-10"
            />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-4 border-t border-white">
           {/* Mobile download tags for small screens */}
           <div className="flex md:hidden gap-4 mb-4">
            <a
              href="https://apps.apple.com/app/id943905271"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download the Etomart iOS app on the App Store"
            >
              <img
                src="https://images.ctfassets.net/23u853certza/7xaqvusYmbDlca5umD9bZo/a0fa3e1c7ca41a70c6285d6c7b18c92b/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                alt="Download on the App Store"
                className="h-10"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.wolt.android"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get the Etomart Android app on Google Play"
            >
              <img
                src="https://images.ctfassets.net/23u853certza/1Djo4jOj0doR5PfWVzj9O6/d52acac7f94db66263f5ad9e01c41c82/google-play-badge.png"
                alt="Get it on Google Play"
                className="h-10"
              />
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-0">
            <button
              onClick={handleLanguageChange}
              aria-label="Change language"
              className="flex items-center text-black hover:text-white transition-colors"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                <path d="M9.6 7.2h4.8v1.6h-4.8z" />
              </svg>
              {language}
            </button>
            <button
              onClick={handleAccessibilitySettingsOpen}
              aria-label="Open accessibility settings"
              className="flex items-center text-black hover:text-white transition-colors"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                <path d="M12 6a2 2 0 110 4 2 2 0 010-4zm-1 6h2v6h-2v-6z" />
              </svg>
              Accessibility
            </button>
          </div>

         

          <div className="text-center sm:text-right">
            <p className="text-sm">&copy; 2024 Etomart. All Rights Reserved.</p>
            <div className="flex justify-center sm:justify-end mt-2">
              <a href="/privacy" className="text-sm text-black hover:text-white mr-4">Privacy Statement</a>
              <a href="/terms" className="text-sm text-black hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
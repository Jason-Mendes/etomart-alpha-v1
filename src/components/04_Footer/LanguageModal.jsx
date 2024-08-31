import React from "react";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const LanguageModal = ({
  isOpen,
  onClose,
  onLanguageChange,
  currentLanguage,
}) => {
  if (!isOpen) return null;

  const languages = [
    "Azerbaijani",
    "Dansk",
    "Deutsch",
    "Deutsch (Österreich)",
    "Eesti",
    "English",
    "Français",
    "Hrvatski",
    "Kazakh",
    "Latviešu",
    "Lietuvių",
    "Magyar",
    "Maltese",
    "Norsk",
    "Polski",
    "Portuguese",
    "Slovak",
    "Slovenščina",
    "Srpski",
    "Suomi",
    "Svenska",
    "Íslenska",
    "Čeština",
    "Ελληνικά",
    "Русский",
    "Українська",
    "עִבְרִית",
    "العربية (إسرائيل)",
    "عربي",
    "ქართული",
    "日本語",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex max-h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Choose your language
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 transition-colors hover:text-gray-700"
            aria-label="Close the dialog"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="grow overflow-y-auto pr-4">
          {" "}
          {/* Added right padding */}
          <ul className="space-y-2">
            {languages.map((lang) => (
              <li
                key={lang}
                className="flex items-center justify-between border-b border-gray-200 py-2 last:border-b-0"
              >
                <span className="text-gray-800">{lang}</span>
                <button
                  onClick={() => onLanguageChange(lang)}
                  className={`rounded px-4 py-2 font-semibold transition-colors ${
                    lang === currentLanguage
                      ? "cursor-default bg-gray-200 text-orange-400"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                  disabled={lang === currentLanguage}
                >
                  {lang === currentLanguage ? "Chosen" : "Choose"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;

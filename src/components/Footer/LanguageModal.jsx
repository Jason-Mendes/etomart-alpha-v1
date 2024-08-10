import React from 'react';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const LanguageModal = ({ isOpen, onClose, onLanguageChange, currentLanguage }) => {
  if (!isOpen) return null;

  const languages = [
    "Azerbaijani", "Dansk", "Deutsch", "Deutsch (Österreich)", "Eesti", "English", "Français", "Hrvatski",
    "Kazakh", "Latviešu", "Lietuvių", "Magyar", "Maltese", "Norsk", "Polski", "Portuguese",
    "Slovak", "Slovenščina", "Srpski", "Suomi", "Svenska", "Íslenska", "Čeština", "Ελληνικά",
    "Русский", "Українська", "עִבְרִית", "العربية (إسرائيل)", "عربي", "ქართული", "日本語"
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] shadow-lg overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Choose your language</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close the dialog"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow pr-4"> {/* Added right padding */}
          <ul className="space-y-2">
            {languages.map((lang) => (
              <li key={lang} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-800">{lang}</span>
                <button
                  onClick={() => onLanguageChange(lang)}
                  className={`px-4 py-2 font-semibold rounded transition-colors ${
                    lang === currentLanguage
                      ? 'bg-gray-200 text-orange-400 cursor-default'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                  disabled={lang === currentLanguage}
                >
                  {lang === currentLanguage ? 'Chosen' : 'Choose'}
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
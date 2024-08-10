import React from "react";

const AccessibilityModal = ({ isOpen, onClose, isHighContrastEnabled, onContrastToggle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Accessibility</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-800">Increase contrast</span>
          <button
            onClick={onContrastToggle}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              isHighContrastEnabled ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                isHighContrastEnabled ? "transform translate-x-6" : ""
              }`}
            />
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Improves readability with higher colour contrast and text styling adjustments.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2  bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AccessibilityModal;

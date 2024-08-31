import React from "react";

const AccessibilityModal = ({
  isOpen,
  onClose,
  isHighContrastEnabled,
  onContrastToggle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Accessibility</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-800">Increase contrast</span>
          <button
            onClick={onContrastToggle}
            className={`h-6 w-12 rounded-full p-1 transition-colors ${
              isHighContrastEnabled ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`size-4 rounded-full bg-white transition-transform ${
                isHighContrastEnabled ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Improves readability with higher colour contrast and text styling
          adjustments.
        </p>
        <button
          onClick={onClose}
          className="mt-4 rounded bg-orange-500  px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AccessibilityModal;

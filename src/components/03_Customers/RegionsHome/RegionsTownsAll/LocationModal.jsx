import React from "react";

// LocationModal component: handles displaying and controlling the modal for selecting a delivery location
const LocationModal = ({ showModal, closeModal, openNewLocationModal }) => {
  // Handle click event for "Continue" button
  const handleNewLocationButtonClick = () => {
    openNewLocationModal();
  };

  return (
    <>
      {/* Modal wrapper */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${showModal ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        {/* Modal background: overlay with a semi-transparent black background */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${showModal ? "duration-300 ease-out" : "duration-300 ease-in"
            }`}
          onClick={closeModal} // Close modal when clicking outside the content
        />

        {/* Modal content */}
        <div
          id="Orange_container"
          className={`fixed bottom-6 left-1/2 top-24 flex -translate-x-1/2 flex-col rounded-lg bg-[#ee9613] p-4 transition-all${showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          style={{
            width: "90%",
            maxWidth: "600px",
            maxHeight: "85vh",
            overflow: "auto",
          }} // Responsive and constrained dimensions
        >
          {/* Close button */}
          <div className="flex justify-end">
            <button
              className="text-[#000000] hover:text-white"
              onClick={closeModal}
            >
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal header */}
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-center font-shrikhand text-4xl text-[#000000]">
              Choose where to deliver
            </h1>
            <span className="mb-4 text-center text-lg text-white">
              Please enter your details
            </span>

            {/* Suburb selector */}
            <div className="mb-4 w-full">
              <label
                className="mb-2 block text-lg font-bold text-gray-700"
                htmlFor="town"
              >
                Suburb
              </label>
              <select
                id="town"
                data-test-id="TownsSelect"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Windhoek_Central">Windhoek Central</option>
                <option value="Windhoek_East">Windhoek East</option>
                <option value="Windhoek_West">Windhoek West</option>
                <option value="Windhoek_North">Windhoek North</option>
                <option value="Windhoek_South">Windhoek South</option>
                <option value="Khomasdal">Khomasdal</option>
                <option value="Katutura">Katutura</option>
                <option value="Eros">Eros</option>
                <option value="Ludwigsdorf">Ludwigsdorf</option>
                <option value="Olympia">Olympia</option>
                <option value="Pioneers_Park">Pioneers Park</option>
                <option value="Klein_Windhoek">Klein Windhoek</option>
                <option value="Hochland_Park">Hochland Park</option>
              </select>
            </div>

            {/* Address input */}
            <div className="mb-4 w-full">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="address-query-input"
              >
                Street name and number
              </label>
              <input
                id="address-query-input"
                data-test-id="AddressQueryInput"
                placeholder="Street name and number"
                autoComplete="off"
                spellCheck="false"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Continue button */}
            <button
              onClick={handleNewLocationButtonClick}
              className="w-full rounded-lg bg-black py-2 text-white transition-colors duration-200 hover:border hover:border-gray-300 hover:bg-white hover:text-black"
            >
              Continue
            </button>
          </div>

          {/* Image section */}
          <div className=" m-8 w-10/12 rounded-lg bg-white p-4 pt-8">
            <div className="relative">
              <img
                src="/images/Mais_rdedeverse.jpg"
                alt="img"
                className="max-h-[30vh] w-full rounded-b-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationModal;

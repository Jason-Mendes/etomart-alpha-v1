import React from 'react';

const LocationModal = ({ showModal, closeModal, openNewLocationModal }) => {
  const handleNewLocationButtonClick = () => {
    openNewLocationModal();
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
          showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Modal background */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${
            showModal ? 'ease-out duration-700' : 'ease-in duration-700'
          }`}
          onClick={closeModal}
        />

        {/* Modal content */}
        <div
          id="Orange_container"
          className={`bg-[#ee9613] rounded-lg p-4 z-50 fixed bottom-6 top-24  left-1/2 transform -translate-x-1/2 transition-all flex flex-col ${
            showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ width: '600px', maxHeight: '85vh', overflow: 'auto' }}
        >
          <div className="flex justify-end">
            <button className="text-[#000000] hover:text-white" onClick={closeModal}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-center text-[#000000] text-4xl font-shrikhand mb-4">
              Choose where to deliver
            </h1>
            <span className="text-center text-lg text-white mb-4">
              Please enter your details
            </span>

            <div className="w-full mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="town">
                Suburb
              </label>
              <select
                id="town"
                data-test-id="TownsSelect"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
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

            <div className="w-full mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address-query-input">
                Street name and number
              </label>
              <input
                id="address-query-input"
                data-test-id="AddressQueryInput"
                placeholder="Street name and number"
                autoComplete="off"
                spellCheck="false"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              onClick={handleNewLocationButtonClick}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Continue
            </button>
          </div>

          <div className="w-10/12 bg-white rounded-lg p-4 pt-8 m-8 z-50">
            <div className="relative">
              <img
                src="/imagess/Mais_reverse.jpg"
                alt="img"
                className="w-full max-h-[30vh] object-cover rounded-b-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationModal;

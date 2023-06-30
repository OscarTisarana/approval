import React from 'react';

const ModalComponent = ({newQuantity, setNewQuantity, setModalOpen, handleMinus, handlePlus, handleSave}) => {
    return (
        <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        onClick={() => setModalOpen(false)}
      >
        <div className="bg-white p-4 rounded-lg md:w-1/3" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-center mb-4">
            <button
              className="px-2 py-1 bg-gray-300 rounded-l focus:outline-none"
              onClick={handleMinus}
              disabled={parseInt(newQuantity) <= 1} // Disable the button when newQuantity is less than or equal to 1
            >
              -
            </button>
            <input
              className="mx-2 w-12 text-center border-t border-b"
              type="number"
              value={newQuantity}
              //disabled
              min="1"
              max="1000"
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                if (newValue >= 1) {
                  setNewQuantity(newValue);
                }
              }}
            />
            <button
              className="px-2 py-1 bg-gray-300 rounded-r focus:outline-none"
              onClick={handlePlus}
            >
              +
            </button>
          </div>
          <div className="mt-4 flex justify-between space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded md:w-full lg:w-1/3"
                onClick={handleSave}
              >
                Save
              </button>
              <div className="lg:w-1/3"></div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded md:w-full lg:w-1/3"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
          </div>
        </div>
      </div>
    );
}

export default ModalComponent;
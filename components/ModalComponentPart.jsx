import React from 'react';

const ModalComponentPart = ({selectedItemPart, setNewQuantity, newQuantity, setModalOpenPart, handleMinus, handlePlus, handleSaveDataToTable}) => {
    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
            onClick={() => setModalOpenPart(false)}
          >
            <div></div>
            <div className="bg-white p-4 rounded-lg md:w-1/3" onClick={(e) => e.stopPropagation()}>
                {   
                    selectedItemPart !== null && (
                        <div className="mb-4">
                            <p className="font-semibold text-lg">Name  : <span className="font-normal">{selectedItemPart.part_name}</span></p> 
                            <p className="font-semibold text-lg">SKU   : <span className="font-normal">{selectedItemPart.sku}</span></p>
                            <p className="font-semibold text-lg">Stock : <span className="font-normal">{selectedItemPart.stock}</span></p>
                        </div>
                    )
                }                
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
                  //disabled
                  min="1"
                  max="1000"
                  value={newQuantity}
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
                  onClick={handleSaveDataToTable}
                >
                  Save
                </button>
                <div className="lg:w-1/3"></div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded md:w-full lg:w-1/3"
                  onClick={() => setModalOpenPart(false)}
                >
                  Cancel
                </button>
            </div>
            </div>
        </div>
    );
}

export default ModalComponentPart;

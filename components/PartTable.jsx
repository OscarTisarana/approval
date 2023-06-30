import React from 'react';

const PartTable = ({ dataTable, handleEditTable, handleDeleteTable, part }) => {
  return (
    <table className="w-full text-sm text-gray-500 text-center">
      {/* table headers */}
      <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
        <tr>
          <th scope="col" className="px-3 py-6 w-20">
            No
          </th>
          <th scope="col" className="px-3 py-6 w-20">
            Part Name
          </th>
          <th scope="col" className="px-3 py-6 w-20">
            SKU
          </th>
          <th scope="col" className="px-3 py-6 w-20">
            Stock
          </th>
          <th scope="col" className="px-3 py-6 w-20">
            Quantity
          </th>
          <th scope="col" className="px-3 py-6 w-20">
            Action
          </th>
        </tr>
      </thead>
      {/* table body */}
      <tbody>
        {dataTable && dataTable.length > 0 ? (
            dataTable.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-200">
                    <td className="px-6 py-4">{index + 1}</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.part_name}
                    </th>
                    <td className="px-6 py-4">{item.sku}</td>
                    <td className="px-6 py-4">
                        {
                            part !== undefined ? (
                                part.find(parts => parts.part_name === item.part_name)?.stock ?? 'Not found'
                            ) : (
                                item.stock
                            )
                        }
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">
                        <div className='flex gap-2 justify-center items-center'>
                            <button className="inline-flex items-center px-4 py-2 w-12 h-10 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium rounded-md"
                                onClick={(e) => handleEditTable(e, index)}>
                                <img src="/images/edit_icon.png" className="h-full w-full" alt="Edit" />
                            </button>
                            <button className="inline-flex items-center px-4 py-2 w-12 h-10 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                                onClick={(e) => handleDeleteTable(e, index)}>
                                <img src="/images/delete_icon.png" className="h-full w-full" alt="Trash" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))
        ) : (
            <p></p>
        )}
      </tbody>
    </table>
  );
};

export default PartTable;

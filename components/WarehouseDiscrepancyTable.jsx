import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';

const WarehouseDiscrepancyTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null); // Add selectedKey state

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleDelete = async () => {
    try {
        const response = await axios.delete(`http://localhost:8009/part_discrepancy/delete?id=${selectedId}`);
  
      // Update the local state
      setTableData(prevData => {
        const updatedData = prevData.filter(item => item.discrepancyId !== selectedId); // Use the correct property name here too
        return updatedData;
      });
  
      console.log('Deleted item with id:', selectedId);
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };
  
  const handleClickEdit = (key) => {
    setSelectedId(key);
    setShouldNavigate(true);
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/partdiscrepancy/edit', { state: { key: selectedId } });
      setShouldNavigate(false);
    }
  }, [shouldNavigate]);

  const handleKeyClick = (key) => {
    setSelectedKey(selectedKey === key ? null : key);
  };

  return (
    <div className="relative rounded-lg h-full sm:h-96 md:w-144 h-96 lg:h-144 overflow-y-auto border border-gray-300 mb-4 mr-4">
      <table className="w-full text-sm text-gray-500 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">No</th>
            <th scope="col" className="px-6 py-3">Discrepancy ID</th>
            <th scope="col" className="px-6 py-3">Part Name</th>
            <th scope="col" className="px-6 py-3">Requester</th>
            <th scope="col" className="px-6 py-3">Requester Division</th>
            <th scope="col" className="px-6 py-3">Discrepancy Note</th>
            <th scope="col" className="px-6 py-3">Discrepancy Quantity</th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {tableData !== null && tableData.map((datas, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-200">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{datas.DiscrepancyId}</td>
              <td className="px-6 py-4">{datas.part_name}</td>
              <td className="px-6 py-4">{datas.requester_division}</td>
              <td className="px-6 py-4">{datas.note}</td>
              <td className="px-6 py-4">{datas['Discrepancy Quantity']}</td>
              <td className="px-6 py-4">
                <button
                  className="inline-flex items-center w-12 h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium rounded-md"
                  onClick={() => {
                    handleClickEdit(datas.DiscrepancyId);
                  }}
                >
                  <img src="/images/edit_icon.png" className="w-full h-full" alt="Edit" />
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  className="inline-flex items-center w-12 h-10 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md"
                  onClick={() => {
                    setSelectedId(datas.DiscrepancyId);
                    setModalOpen(true);
                  }}
                >
                  <img src="/images/delete_icon.png" className="w-full h-full" alt="Trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal
        isOpen={isModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default WarehouseDiscrepancyTable;

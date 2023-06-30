import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';

const AdminDiscrepancyTable = (props) => {
  const [data, setData] = useState(props.data);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null); // Add selectedKey state

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const handleDelete = async () => {
    try {
        const response = await axios.delete(`http://localhost:8009/part_discrepancy/delete/${selectedId}`);
  
      // Update the local state
      setData(prevData => {
        const updatedData = prevData.filter(item => item.DiscrepancyId !== selectedId); // Use the correct property name here too
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
    <div className="relative overflow-x-auto overflow-y-auto max-h-[34rem] border">
      <table className="w-full text-sm text-gray-500 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
          <tr>
            <th scope="col" className="px-3 py-6 w-20">No</th>
            <th scope="col" className="px-3 py-6 w-20">Discrepancy ID</th>
            <th scope="col" className="px-3 py-6 w-20">Division Name</th>
            <th scope="col" className="px-3 py-6 w-20">Discrepancy Note</th>
            <th scope="col" className="px-3 py-6 w-20">Discrepancy Quantity</th>
            <th scope="col" className="px-3 py-6 w-20">Action</th>
          </tr>
        </thead>
        <tbody>
          {data !== null && data.map((datas, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-200">
              <td className="py-2 h-24">{index + 1}</td>
              <td className="py-2 h-24 font-medium text-gray-900 whitespace-nowrap">{datas.DiscrepancyId}</td>
              <td className="py-2 h-24">{datas.division_name}</td>
              <td className="py-2 h-24">{datas.note}</td>
              <td className="py-2 h-24">{datas['Discrepancy Quantity']}</td>
              <td className="py-2 h-24">
                  <div className="flex gap-2 justify-center items-center pr-2">
                    <button
                      className="inline-flex items-center w-12 h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium rounded-md"
                      onClick={() => {
                        handleClickEdit(datas.DiscrepancyId);
                      }}
                    >
                      <img src="/images/edit_icon.png"  className="w-full h-full" alt="Edit"  />
                    </button>
                    <button className="inline-flex items-center w-12 h-10 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md"
                      onClick={() => {
                        setSelectedId(datas.DiscrepancyId);
                        setModalOpen(true);
                      }}
                    >
                      <img src="/images/delete_icon.png"  className="w-full h-full" alt="Trash"/>
                  </button>
                  </div>
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

export default AdminDiscrepancyTable;

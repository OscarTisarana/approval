import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal'
import axios from 'axios';


const ManagerTable = (props) => {
  const [data, setTableData] = useState(props.data);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // delete
  const [selectedId, setSelectedId] = useState(null); // delete 
  const navigate = useNavigate(); // edit
  const [shouldNavigate, setShouldNavigate] = useState(false); // edit

  useEffect(() => {
    setTableData(props.data);
  }, [props.data]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8009/part_request/delete/${selectedId}`);
      
      // Update the local state
      setTableData(Object.keys(data).reduce((result, key) => {
        if (key !== selectedId) {
          result[key] = data[key];
        }
        return result;
      }, {}));

      console.log('Deleted item with id:', selectedId);
      setModalOpen(false); 
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  // passing value dari dashboard ke edit part request
  const handleClickEdit = (key) => {
    console.log(key)
    setSelectedId(key)
    setShouldNavigate(true)
    //navigate('/partrequest/edit', {state: { keys: selectedId}})
  }
  
  useEffect(() => {
    if (shouldNavigate) {
      navigate('/partrequest/edit', {state: { key: selectedId}});
      setShouldNavigate(false); // reset shouldNavigate to false after navigate
    }
  }, [shouldNavigate]);

  const handleKeyClick = (key) => {
    setSelectedKey(selectedKey === key ? null : key);
  };



    const getStatusColor = (status) => {
        if (status === 'Denied') {
            return 'text-red-500';
        } else if (status === 'Approved') {
            return 'text-green-500';
        } else if (status === 'Pending') {
            return 'text-yellow-500';
        }
        return 'text-gray-900';
    };

    if (!data || Object.keys(data).length === 0) {
        return <div>No data available</div>;
      }
    
    return(
      <div className="relative overflow-x-auto overflow-y-auto max-h-[34rem] border">
      <table className="w-full border text-sm text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
          <tr>
            <th scope="col" className="px-3 py-6 w-20">Part Request ID</th>
            <th scope="col" className="px-3 py-6 w-20">Part Name</th>
            <th scope="col" className="px-3 py-6 w-20">Quantity</th>
            <th scope="col" className="px-3 py-6 w-20">SKU</th>
            <th scope="col" className="px-3 py-6 w-20">Division Status</th>
            <th scope="col" className="px-3 py-6 w-20">Warehouse Status</th>
            <th scope="col" className="px-3 py-6 w-20">Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => (
            <React.Fragment key={key}>
              <tr onClick={() => handleKeyClick(key)} className="bg-white border-b cursor-pointer hover:bg-gray-200">
                <td scope="row" className="py-2 h-24 font-medium text-gray-900 whitespace-nowrap">{key}</td>
                <td className="py-2 h-24">{data[key][0].part_name}</td>
                <td className="py-2 h-24">{data[key][0].quantity}</td>
                <td className="py-2 h-24">{data[key][0].sku}</td>
                <td className={`py-2 h-24 ${getStatusColor(data[key][0].division_request_status)}`}>{data[key][0].division_request_status}</td>
                <td className={`py-2 h-24 ${getStatusColor(data[key][0].warehouse_request_status)}`}>{data[key][0].warehouse_request_status}</td>
                <td className="py-2 h-24">
                  <div className="flex gap-2 justify-center items-center pr-2">
                    <button className="inline-flex items-center w-12 h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium rounded-md"
                      onClick={() => {
                        handleClickEdit(key);
                      }
                    }>
                        <img src="/images/edit_icon.png"  className="w-full h-full" alt="Edit"  />
                    </button>
                    <button className="inline-flex items-center w-12 h-10 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md"
                      onClick={() => {
                        setSelectedId(key);
                        setModalOpen(true);
                      }}>
                      <img src="/images/delete_icon.png"  className="w-full h-full" alt="Trash"/>
                    </button>
                  </div>
                </td>
              </tr>
              {selectedKey === key &&
                (data[key].length > 1 ? (
                  data[key].slice(1).map((datas, index) => (
                    <tr key={index} className={`bg-white border-b hover:bg-gray-200 ${selectedKey === key ? 'expand-row' : ''}`}>
                      <td></td>
                      <td className="py-2 h-24">{datas.part_name}</td>
                      <td className="py-2 h-24">{datas.quantity}</td>
                      <td className="py-2 h-24">{datas.sku}</td>
                      <td className={`py-2 h-24 ${getStatusColor(datas.division_request_status)}`}>{datas.division_request_status}</td>
                      <td className={`py-2 h-24 ${getStatusColor(datas.warehouse_request_status)}`}>{datas.warehouse_request_status}</td>
                      <td></td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b hover:bg-gray-200">
                    <td colSpan="7" className="py-2 h-24 text-center text-gray-500">
                      No other items!
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <DeleteModal
              isOpen={isModalOpen}
              onConfirm={handleDelete}
              onCancel={() => setModalOpen(false)}
            />  
    </div>
    )
}

export default ManagerTable;
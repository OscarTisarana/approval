import React from 'react';
import Button from '../../../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Layout from '../../Layout';

const ApprovalPartDiscrepancy = () => {

    const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;
    const PART_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_Part_Service;
    
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState({})
 
    const [note, setNote] = useState("");
	const location = useLocation();

    //data api 
    const [data, setData] = useState([]);

    // data dalam tabel
    const [dataTable, setDataTable] = useState([]);
    
    // Search query
    const [query, setQuery] = useState("")
    const prevQueryRef = useRef(query);

    // for modal edit
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [newQuantity, setNewQuantity] = useState(1);

    // modal for part 
    const [modalOpenPart, setModalOpenPart] = useState(false);
    const [selectedItemPart, setSelectedItemPart] = useState(null);
    const [user, setUser] = useState({})
    
    // useEffect User
    useEffect(()=>{
        if(window.localStorage.getItem('token') === "" || window.localStorage.getItem('token') === null){
            navigate("/login");
        }
        else {
            getUser()
              .then(() => getPartWarehouseAPI())
              .catch((error) => console.error(error));
        }
    },[])
 
    const getUser = async () => {
      try {
          const response = await axios.get(`${USER_SERVICE_BASE_URL}auth/user`, { headers: { Authorization: 'Bearer ' + window.localStorage.getItem('token') } });
          console.log(response.data)
          setUser(response.data)
      } catch (error) {
          console.log(error);
          throw error;
      }
    }

    const handleSearchAPI = useCallback( async() => {
        return axios
          .get(`${PART_SERVICE_BASE_URL}part?search=${query}`)
          .then((response) => {
            const jsonData = response.data;
            console.log(query);
            console.log(jsonData);
            setData(jsonData);
            return jsonData;
          })
          .catch((error) => {
            console.log(error);
            throw error;
          });
      }, [query]);
      
    const getPartWarehouseAPI = useCallback( async() => {
      return axios
        .get(`${PART_SERVICE_BASE_URL}part_discrepancy/warehouse/trash?user_id=${user.UserId}&search=${query}`)
        .then((response) => {
          const jsonData = response.data;
          return jsonData;
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }, [query]);

    useEffect( () => {
      if (user.UserId) {
        getPartWarehouseAPI().then((data)=> {
          let table = []
          for (let items in data) {
            for (let item in data[parseInt(items)]) {
              // console.log(data[items][item]["Part Name"])
              // console.log((data[items][item]))
              table.push(data[items][item])
            }
          }
          setDataTable(table)
          console.log(table)
        })
      }
    }, [user, query])

    useEffect(() => {
      if (query !== prevQueryRef.current) {
          handleSearchAPI().then((jsonData) => {
          console.log(jsonData)
        }).catch((err) => {
          console.log(err)
        })
        prevQueryRef.current = query;
      }

      console.log(selectedItemPart);
      if (selectedItemPart !== null) {
          //setModalOpenPart(true);
      }
    }, [query, setData, handleSearchAPI, selectedItemPart]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };
    
    const handleEditTable = (e, index) => {
      e.preventDefault();
      e.stopPropagation();  
      setSelectedItemIndex(index);
      setNewQuantity(dataTable[index].quantity);
      setModalOpen(true);
    };
  
    const handleMinus = (e) => {
      e.preventDefault();
      const updatedQuantity = newQuantity - 1;
      setNewQuantity(updatedQuantity);
    };
  
    const handlePlus = (e) => {
      e.preventDefault();
      const updatedQuantity = newQuantity + 1;
      setNewQuantity(updatedQuantity);
    };
  
    const handleSave = (e) => {
      e.preventDefault();
      if (selectedItemIndex != null && dataTable[selectedItemIndex]) {
        const updatedData = [...dataTable];
        updatedData[selectedItemIndex].quantity = newQuantity;
        setDataTable(updatedData);
      }
      setModalOpen(false);
    };

    const handleDeleteTable = (e, index) => {
        e.preventDefault();
        const updatedData = [...dataTable];
        updatedData.splice(index, 1);
        //console.log(index);
        setDataTable(updatedData);
    };
    
    const handleAddDataToTable = (item) => {
        // e.preventDefault();
        console.log(item);
        setSelectedItemPart(item);
        setNewQuantity(1);
        console.log(selectedItemPart);
        // const newData = [];
        // console.log(selectedItemPart);
        setModalOpenPart(true);
    }

    const handleSaveDataToTable = () => {
        // Create a new data object with the selected item and the new quantity
        const newData = {
          ...selectedItemPart,
          quantity: newQuantity 
        };
      
        // Check if the part_name already exists in the table data
        const existingIndex = dataTable.findIndex(
          item => item.part_name === newData.part_name
        );
      
        if (existingIndex !== -1) {
          // If the part_name already exists, increment the quantity of the existing entry
          const updatedTableData = [...dataTable];
          updatedTableData[existingIndex].quantity += newData.quantity;
      
          setDataTable(updatedTableData);
        } else {
          // If the part_name doesn't exist, add the new data item to the table data
          setDataTable(prevData => [...prevData, newData]);
        }
      
        // Close the modal
        setModalOpenPart(false);
      };

    const ApprovePartDiscrepancyAction = (e) => {
        //setValidationErrors({})
        e.preventDefault();

        const newError = {};

        // check if tableData is empty
        if (dataTable.length === 0) {
            newError.tableData = 'Table data cannot be empty';
        }

        // check if note is empty
        if (note.length === 0 || note === "") {
            newError.note = 'Note cannot be empty';
        }

        if (Object.keys(newError).length > 0) {
            setError(newError);
        } else {
          setIsSubmitting(true)

          let payload = {
              UserId: user.UserId,
              PartDiscrepanciesId: location.state.key,
			        status: "Approved"
          };

		  //ambil Data, trus di PUT
          console.log(payload) //ganti jadi reqJson

          axios.put(`${PART_SERVICE_BASE_URL}part_discrepancy/approve`, payload)//pake PUT.
          .then((r) => {
              console.log(r)
              navigate('/') // belum ada dashboard
              setIsSubmitting(false)
          })
          .catch((e) => {
              console.log(e)
              setIsSubmitting(false)
          });
        } 
    };

    const modalComponent = useMemo(() => {
      return (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div className="bg-white p-4 rounded-lg w-1/2" onClick={(e) => e.stopPropagation()}>
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
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded w-full"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
            </div>
          </div>
        </div>
      );
    }, [newQuantity]);
  

      const modalComponentPart = useMemo(() => {
        return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
            onClick={() => setModalOpenPart(false)}
          >
            <div></div>
            <div className="bg-white p-4 rounded-lg w-1/2" onClick={(e) => e.stopPropagation()}>
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
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                  onClick={handleSaveDataToTable}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded w-full"
                  onClick={() => setModalOpenPart(false)}
                >
                  Cancel
                </button>
            </div>
            </div>
        </div>
        );
      }, [selectedItemPart, newQuantity]);
    

    return (
       <Layout>
        <div className="container mx-auto justify-center items-center lg:flex pt-40 pl-40">  
            <div class="flow-root pl-5 pr-5">
            <form name="create-part-request" onSubmit={(e) => {ApprovePartDiscrepancyAction(e)}}>
                <div class="pr-5 pl-5 lg:float-left">
                <h1 className="text-3xl font-bold mb-4 text-start">Approval Part Discrepancy</h1>
                <div className="sm:grid grid-cols-2">
                    {/* NAME INPUT */}
                    {/* ////////// */}
                    <div className="py-3 pr-3">
                        <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
                        <input 
                            className="py-3 px-3 border-0 border-gray-200 drop-shadow-md rounded-md text-sm w-full " 
                            value={user.User}
                            disabled
                            onChange={(e)=>{onchange(e.target.value)}}/>
                    </div>
                    {/* DIVISION */}
                    <div className="py-3 pr-3">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Division</label>
                        <input 
                            className="py-3 px-3 border-0 border-gray-200 drop-shadow-md rounded-md text-sm w-full " 
                            value={user.DivisionName}
                            disabled
                            onChange={(e)=>{onchange(e.target.value)}}/>
                    </div>
                </div>
                {/* SEARCH */}
                <div className="search">
                    <div className="py-3 pr-3">
                        <label className="mb-1 block text-sm font-medium text-slate-700">Search</label>
                        <input 
                        className="py-3 px-3 border-0 border-gray-200 drop-shadow-md rounded-md text-sm w-full" 
                        value={query}
                        onChange={handleChange} 
                        />
                        <div className="search-results overflow-y-auto max-h-48 mt-3">
                        {data.map((item, index) => (
                            <div
                                className="text-left border-black border-ridge border-1 rounded-10 m-3 w-80 pl-10" 
                                key={index}
                                onClick={() => handleAddDataToTable(item)}
                                >
                                <p>Name  : {item.part_name}</p>
                                <p>SKU   : {item.sku}</p>
                                <p>Stock : {item.stock}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            
                {/* NOTE */}
                <div className="flex items-center flex-row">
                    <div className="w-full py-2 pr-3 text-lg rounded-lg">
                        <label className="mb-1 block text-sm font-medium text-slate-700">Note</label>
                        <textarea
                            className="border border-gray-400 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight drop-shadow-md rounded-md focus:outline-none focus:shadow-outline"
                            id="note"
                            rows="4"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                { error.note && 
                    <span className="text-xs text-red-500 italic">{error.note}</span>
                }
                {/* BUTTON SUBMIT */}
                 
                <div className="py-2 pr-3">
                    <Button text={"Approve"} type={"submit"} disabled={isSubmitting} classname="bg-[#5AA6FF] py-2 px-3  w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90"/>
                </div>
				<div>
				<button style={{justifyContent:'space-between'}}className="btn btn-approve">Approval by Warehouse: <h6 style={{color: "orange"}}className="status">pending</h6></button>
				</div>
                </div>   
                {/* SISI KANAN FULL SIZE SCREEN */}
                <div className="float-right">
                </div>
                {/* TABLE DATA PART REQUEST */}
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-gray-500 text-center">
                    {/* table headers */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Part Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                SKU
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    {/* table body */}
                    <tbody>
                    {dataTable.map((item, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b hover:bg-gray-200"
                        >
                        <td className="px-6 py-4">{index+1}</td>
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                            {item["Part Name"]}
                        </th>
                            <td className="px-6 py-4">{item["ListId"]}</td>
                            <td className="px-6 py-4">{item.stock}</td>
                            <td className="px-6 py-4">{item["Discrepancy Quantity"]}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="inline-flex items-center px-4 py-2 w-12 h-10 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium rounded-md"
                                    onClick={(e) => handleEditTable(e, index)}
                                    >
                                        <img src="/images/edit_icon.png" className="h-full w-full" alt="Edit"/>
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                <button class="inline-flex items-center px-4 py-2 w-12 h-10 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                                        onClick={(e) => handleDeleteTable(e, index)}>
                                     <img src="/images/delete_icon.png" className="h-full w-full" alt="Trash"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {modalOpen && modalComponent}
                {modalOpenPart && modalComponentPart}
                </div>
                { error.tableData && 
                    <span className="text-xs text-red-500 italic">{error.tableData}</span>
                }
                {/* BUTTON SUBMIT
                <div className="pr-3 w-full lg:hidden md:visible">
                    <Button 
                    text={"Submit"} 
                    type={"submit"} 
                    disabled={isSubmitting}
                    onClick={(e) => {CreatePartDiscrepancyAction(e)}}
                    />
                </div>                     */}
            </form>
            </div>
        </div>
       </Layout>
    )
}

export default ApprovalPartDiscrepancy;
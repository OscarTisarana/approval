import React from 'react';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Layout from '../../Layout';
import ModalComponent from '../../../components/ModalComponent';
import ModalComponentPart from '../../../components/ModalComponentPart';
import SuccessCheckmark from '../../../components/SuccessCheckmark';
import PartTable from '../../../components/PartTable';
import SubmitLoadingSpinner from '../../../components/SubmitLoadingSpinner';
import FailureCheckmark from '../../../components/FailureCheckmark';

const CreatePartDiscrepancy = () => {

    const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;
    const PART_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_Part_Service;

    //custom styling
    const styleSubmitButton = "bg-[#17479d] py-2 px-3 w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90"
    const styleCancelButton = "bg-[#FF0000] py-2 px-3 w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90"

    // animation success
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({})
 
    const [note, setNote] = useState("");

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
        }
    },[])
 
    const getUser = () => {
        axios.get(`${USER_SERVICE_BASE_URL}auth/user`, { headers:{Authorization: 'Bearer ' + window.localStorage.getItem('token')}})
        .then((r) => {
           console.log(r.data)
           setUser(r.data)
        })
        .catch((e) => {
            console.log(e)
        });
    }

    const handleSearchAPI = useCallback( async() => {
        return axios
          .get(`${PART_SERVICE_BASE_URL}part?search=${query}&page=1&page_size=1000`)
          .then((response) => {
            const jsonData = response.data.parts;
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

    const CreatePartDiscrepancyAction = (e) => {
        //setValidationErrors({})
        e.preventDefault();

        const newError = {};

        // check if tableData is empty
        if (dataTable.length === 0) {
            newError.tableData = 'Table data cannot be empty';
        }

        // check if note is empty
        if (note === "") {
            newError.note = 'Note cannot be empty';
        }

        if (Object.keys(newError).length > 0) {
            setError(newError);
        } else {
          setIsSubmitting(true)
          setIsLoading(true)

          let payload = {
              PartDiscrepancyNote: note,
              UserId: user.UserId,
              DivisionId: user.DivisionId,
              RoleId: user.RoleId,
              data: dataTable.map((item) => {
                return {
                  PartId: item.part_id,
                  ReqQty: item.quantity
                };
              }),
          };

          console.log(payload)

          axios.post(`${PART_SERVICE_BASE_URL}part_discrepancy/trash`, payload, { headers:{Authorization: 'Bearer ' + window.localStorage.getItem('token')}})
          .then((r) => {
              console.log(r)
              if (r.status === 200) {
                setShowSuccess(true);
                setTimeout(() => {
                  setShowSuccess(false);
                  navigate('/partdiscrepancy') // belum ada dashboard
                }, 2000);
              }
              //navigate('/') 
              setIsSubmitting(false)
              setIsLoading(false)
          })
          .catch((e) => {
            console.log(e)
            setShowFailure(true);
            setTimeout(() => {
              setShowFailure(false);
            }, 2000);
            setIsSubmitting(false)
            setIsLoading(false)
          });
        } 
    };


    return (
        <Layout>
        {isLoading && (
            <SubmitLoadingSpinner/>
        )}
        <div className="container md:pl-40 flex lg:flex-row flex-col pt-32 justify-center">  
          <div className="lg:basis-1/3 pl-3">
            <form name="create-part-Discrepancy" onSubmit={(e) => {CreatePartDiscrepancyAction(e)}}>           
                <h1 className="text-3xl font-bold mb-4 text-start">Create Part Discrepancy</h1>
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
                <div className="py-3 pr-3">
                    <div className="search bg-white shadow-md rounded-md pl-3 pr-3">
                    
                        <label className="mb-1 block text-sm font-medium text-slate-700">Search</label>
                            <input 
                                className="py-3 pl-10 pr-3 border-0 border-gray-200 shadow-md rounded-md text-sm w-full" 
                                value={query}
                                onChange={handleChange} 
                            />
                        <div className="search-results overflow-y-auto max-h-48 mt-3 border-t border-gray-200">
                        {data.map((item, index) => (
                            <div
                                className="text-left border-black border-ridge border-1 rounded-md my-3 px-4 py-2 w-full bg-gray-50" 
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
                            className="border border-gray-400 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight drop-shadow-md rounded-md focus:outline-none focus:shadow-outline resize-none"
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
                <div className='flex gap-4 pr-3 md:gap-8'>
                  <Button text={"Submit"} type={"submit"} disabled={isSubmitting} classname={styleSubmitButton} />
                  <Button text={"Cancel"} type={'button'} classname={styleCancelButton} onclick={()=>{navigate('/partdiscrepancy')}}/>
                </div>

              </form>
            </div> 
            <div className="lg:basis-2/3 mx-3 my-8">
                {/* TABLE DATA PART Discrepancy */}
                <div className="relative overflow-x-auto overflow-y-auto max-h-[34rem] shadow-md">
                <PartTable dataTable={dataTable} handleEditTable={handleEditTable} handleDeleteTable={handleDeleteTable} />
                {modalOpen && (
                  <ModalComponent 
                      newQuantity={newQuantity} 
                      setNewQuantity={setNewQuantity}
                      setModalOpen={setModalOpen} 
                      handleMinus={handleMinus} 
                      handlePlus={handlePlus} 
                      handleSave={handleSave}
                  /> 
                  )
                }
                {modalOpenPart && (
                  <ModalComponentPart
                    selectedItemPart={selectedItemPart} 
                    setNewQuantity={setNewQuantity}
                    newQuantity={newQuantity} 
                    setModalOpenPart={setModalOpenPart} 
                    handleMinus={handleMinus} 
                    handlePlus={handlePlus} 
                    handleSaveDataToTable={handleSaveDataToTable}
                  />
                )}
                
                </div>   
                { error.tableData && 
                    <span className="text-xs text-red-500 italic">{error.tableData}</span>
                }
            </div>
        </div>
        <SuccessCheckmark showSuccess={showSuccess}/>
        <FailureCheckmark showFailure={showFailure}/>
      </Layout>
    )
}

export default CreatePartDiscrepancy;
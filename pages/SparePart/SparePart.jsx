import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import DeleteModal from '../../components/DeleteModal'
import Layout from '../Layout'
import IconSort from '../../Icons/IconSort'
import IconSortUp from '../../Icons/IconSortUp'
import IconSortDown from '../../Icons/IconSortDown'

const SparePart = () => {
  const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;
  const PART_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_Part_Service;

  const navigate = useNavigate()
  const [part,setPart] = useState([])
  const [user, setUser] = useState({})
  const [isModalOpen, setModalOpen] = useState(false); // delete
  const [selectedId, setSelectedId] = useState(null); // delete 
  // const [selectedSort, setSelectedSort] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false) //edit

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  const [query, setQuery] = useState("")
  const prevQueryRef = useRef(query);

  //pagination
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalParts, setTotalParts] = useState(0)
  
  // useEffect(() => {
  //   if(window.localStorage.getItem('token') !== "" && window.localStorage.getItem('token') === null){
  //     navigate("/");
  //   } else{
  //     getUser();
  //     if (selectedSort) {
  //       getSortBy()
  //     } else {
  //       getPart();
  //     }
  // }
  // },[selectedSort])

  useEffect(() => {
    if (window.localStorage.getItem('token') !== "" && window.localStorage.getItem('token') === null) {
      navigate("/");
    } else {
      getUser();

    }
  }, []);

  useEffect(()=>{
    if (sortColumn) {
      getSortBy();
    } else {
      getPart();
    }
  },[sortColumn, sortOrder, pageSize, currentPage])

  const handleSearchAPI = useCallback( async() => {
    return axios
      .get(`${PART_SERVICE_BASE_URL}part?search=${query}&page=${currentPage}&page_size=${pageSize}`)
      .then((response) => {
        const jsonData = response.data.parts;
        console.log(query);
        console.log(jsonData);
        setPart(jsonData);
        return jsonData;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
};

  useEffect(() => {
    if (query !== prevQueryRef.current) {
        handleSearchAPI().then((jsonData) => {
        console.log(jsonData)
      }).catch((err) => {
        console.log(err)
      })
      prevQueryRef.current = query;
    }
}, [query, setPart, handleSearchAPI]);
  
    
    const getPart = () => {
      axios.get(`${PART_SERVICE_BASE_URL}part?page=${currentPage}&page_size=${pageSize}`)
        .then((r) => {
          // console.log(r.data)
          // console.log(r.data.parts)
          setPart(r.data.parts);
          setTotalParts(r.data.total_data)
        })
        .catch((e) => {
          console.log(e);
        })
    }

    const getSortBy = () => {
      axios.get(`${PART_SERVICE_BASE_URL}part?asc_or_desc=${sortOrder}&sort_by=${sortColumn}&page=${currentPage}&page_size=${pageSize}`)
        .then((r) => {
          console.log(r.data.parts)
          setPart(r.data.parts);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    
    const getUser = () => {
      axios.get(`${USER_SERVICE_BASE_URL}auth/user`, { headers:{Authorization: 'Bearer ' + window.localStorage.getItem('token')}})
      .then((r) => {
        //  console.log(r.data)
         setUser(r.data)
      })
      .catch((e) => {
          console.log(e)
      });
  }

  const handleSelectSort = (selectedColumn) => {
    // Toggle the sort order if the selected column is the same as the current sort column
    const newSortOrder = selectedColumn === sortColumn && sortOrder === "ASC" ? "DESC" : "ASC";
    console.log(newSortOrder)
    console.log("selected column: ",selectedColumn)
    setSortColumn(selectedColumn);
    setSortOrder(newSortOrder);
  };

    const handleDelete = async () => {
      try {
        const response = await axios.delete(`${PART_SERVICE_BASE_URL}part/delete/${selectedId}`);
    
        console.log('Deleted item with id:', selectedId);
        setModalOpen(false); // Close the modal
        // You might want to update the state of your component here to reflect the deleted item
        // setPart(part.filter(item => item.part_id !== selectedId));
        getPart()
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    };

  // passing value dari dashboard ke edit spare part 
  const handleClickEdit = (key) => {
    console.log(key)
    setSelectedId(key)
    setShouldNavigate(true)
  }
  
  useEffect(() => {
    if (shouldNavigate) {
      navigate('/sparepart/edit', {state: { key: selectedId}});
      setShouldNavigate(false); // reset shouldNavigate to false after navigate
    }
  }, [shouldNavigate]);

  return (
    <Layout>
      <div className='pl-3 md:pl-48 pt-32 md:pt-38 md:pr-4 w-full h-100 flex flex-col justify-center text-center'>
          <p className='text-3xl font-medium pb-6 md:pb-3 mb-4'>Spare Parts</p>
            <div className='flex justify-between mb-2 h-10 md:h-10 text-sm'>
              <p className='md:pt-4 pt-1 italic text-red-900'>Showing results of: {totalParts} parts</p>
              <div className='flex gap-1 md:gap-2'>
                {user.RoleName !== 'Employee' &&
                    <Button classname={'bg-[#17479d] text-center py-1 md:py-2 px-2 border-solid border-0 rounded-md md:rounded text-xs md:text-sm text-white font-semibold hover:opacity-90'} text={"Add Part"} onclick={()=>{navigate('/sparepart/create')}}/>                
                }
                <div className='flex items-center border-2 border-gray-300 rounded-md bg-white'>
                  <img src="../images/search_icon.png" alt="" className='md:w-5 md:h-5 w-4 h-4 ml-2'/>
                  <input onChange={handleChange} type="text" value={query} placeholder='Search...' className="px-1 py-2 w-full ml-2 md:w-36 italic border-gray-300"/>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg h-96 sm:h-96 md:h-96 lg:h-128 mb-4">
              <div className="relative border overflow-x-auto scroll-smooth">
                  <table className="text-sm text-gray-500 text-center px-4 min-w-full border-gray-300"> 
                      {/* table headers */}
                     <thead className='sticky top-0'>
                          <tr className="text-xs text-gray-700 uppercase bg-gray-100">
                              <th scope="col" className="px-3 py-6 w-20 cursor-pointer"onClick={() => handleSelectSort("id")}>Id {sortColumn === "id" ? <span className='inline-block'>{sortOrder === "ASC" ? <IconSortUp/> : <IconSortDown/>}</span> : <span className='inline-block'><IconSort/></span>}</th>
                              <th scope="col" className="px-3 py-6 w-32 cursor-pointer" onClick={() => handleSelectSort("part_name")}>Part Name {sortColumn === "part_name" ? <span className='inline-block'>{sortOrder === "ASC" ? <IconSortUp/> : <IconSortDown/>}</span> : <span className='inline-block'><IconSort/></span>}</th>
                              <th scope="col" className=" px-3 py-6 w-32 cursor-pointer" onClick={() => handleSelectSort("sku")}>SKU {sortColumn === "sku" ? <span className='inline-block'>{sortOrder === "ASC" ? <IconSortUp/> : <IconSortDown/>}</span> : <span className='inline-block'><IconSort/></span>}</th>
                              <th scope="col" className=" px-3 py-6 w-32 cursor-pointer" onClick={() => handleSelectSort("stock")}>Stock {sortColumn === "stock" ? <span className='inline-block'>{sortOrder === "ASC" ? <IconSortUp/> : <IconSortDown/>}</span> : <span className='inline-block'><IconSort/></span>}</th>
                              <th scope="col" className="px-3 py-6 w-56">Part Description</th>
                              {user.RoleName !== "Employee" &&
                              <th scope="col" className="px-3 py-6 w-32">Action</th>
                              }
                          </tr>
                      </thead> 
                      {/* table body */}
                      <tbody>
                    {part && part.length > 0 ?
                      part.map((item, index) => { 
                        // const actualIndex = (currentPage - 1) * pageSize + index + 1;
                        return (
                          <tr key={index} className="bg-white border-b hover:bg-gray-200">
                              <td className="py-2 h-24">{item.part_id}</td>
                              <td className="py-2 h-24 font-medium text-gray-900 whitespace-nowrap">{item.part_name}</td>
                              <td className="py-2 h-24">{item.sku}</td>
                              <td className="py-2 h-24">{item.stock}</td>
                              <td className="py-2 h-24 text-start">{item.part_desc}</td>                               
                              {user.RoleName  !== "Employee" &&                              
                                <td className="py-2">
                                  <div className='flex gap-2 justify-center items-center'>
                                    <button
                                        className="md:inline-flex items-center w-12 h-10 px-4 py-2 mr-2 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium rounded-md"
                                          onClick={() => handleClickEdit(item.part_id)}
                                        >
                                        <img src="/images/edit_icon.png"  className="w-full h-full" alt="Edit"  />
                                    </button>
                                    <button className="md:inline-flex items-center w-12 h-10 px-4 py-2 bg-[#d24d57] hover:bg-[#d24d57] text-white text-sm font-medium rounded-md"
                                      onClick={() => {
                                        setSelectedId(item.part_id);
                                        setModalOpen(true);
                                      }}
                                        >
                                        <img src="/images/delete_icon.png"  className="w-full h-full" alt="Trash"/>
                                    </button>
                                  </div>
                                </td>
                              }
                          </tr>
                      )})
                      :
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-2xl font-bold">
                          Parts Not Found
                        </td>
                    </tr>
                    }
                      </tbody>
                  </table>
            </div>
            <DeleteModal
              isOpen={isModalOpen}
              onConfirm={handleDelete}
              onCancel={() => setModalOpen(false)}
            />  
            <div className="mt-6 pb-8 flex justify-center">
                <span className="block pr-4">Page {currentPage} of {Math.ceil(totalParts/pageSize)}</span>
                <div className="space-x-1">
                  {
                    currentPage === 1 ? "" :
                      <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                  }
                  {
                    currentPage < Math.ceil(totalParts/pageSize) ?
                      <button onClick={() => setCurrentPage(currentPage + 1)} title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                      :
                      ""
                  }
                </div>
                <div>
                  <select
                      id="pageSize"
                      name="pageSize"
                      className="py-1 px-3 border drop-shadow-md rounded-md text-sm font-normal ml-4"
                      onChange={(e) => setPageSize(e.target.value)}
                      value={pageSize}
                      >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>  
                      <option value={100}>100</option>  
                  </select>
                </div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default SparePart
import React, { useRef, useState } from 'react'
import Layout from '../Layout'

const Log = () => {
    const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;

    const [logs, setLogs] = useState([])

    //searching
    const [query, setQuery] = useState("")
    const prevQueryRef = useRef(query);

    //pagination
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalLogs, setTotalLogs] = useState(0)

    // const getLogs = async() => {
    //   await axios.get(`${USER_SERVICE_BASE_URL}`)
    //   .then((r) => {
    //     setLogs(r)
    //     setTotalLogs(r)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })
    // }

    // const handleSearchAPI = useCallback( async() => {
    //   return axios
    //     .get(`${PART_SERVICE_BASE_URL}part?search=${query}&page=${currentPage}&page_size=${pageSize}`)
    //     .then((response) => {
    //       const jsonData = response.data.parts;
    //       console.log(query);
    //       console.log(jsonData);
    //       setPart(jsonData);
    //       return jsonData;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       throw error;
    //     });
    // }, [query]);

    // useEffect(() => {
    //     if (query !== prevQueryRef.current) {
    //         handleSearchAPI().then((jsonData) => {
    //         console.log(jsonData)
    //       }).catch((err) => {
    //         console.log(err)
    //       })
    //       prevQueryRef.current = query;
    //     }
    // }, [query, setLogs, handleSearchAPI]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

  return (
    <Layout>
        <div className='pl-3 md:pl-48 pt-32 md:pt-38 md:pr-4 h-100 flex flex-col justify-center text-center'>
            <p className='text-3xl font-medium pb-6 md:pb-3 mb-4'>User Logs</p>
            <div className='flex justify-end mb-2 h-10 md:h-10'>
                <div className='flex items-center mb-2 h-full border-2 border-gray-300 rounded-md bg-white'>
                    <img src="../images/search_icon.png" alt="" className='md:w-5 md:h-5 w-4 h-4 ml-2'/>
                    <input onChange={handleChange} type="text" value={query} placeholder='Search...' className="px-1 py-2 w-full ml-2 md:w-36 text-sm italic border-gray-300"/>
                </div>
            </div>
            <div className="relative rounded-lg h-96 sm:h-96 md:h-96 lg:h-128 mb-4">
              <div className="relative border overflow-x-auto scroll-smooth">
                  <table className="text-sm text-gray-500 text-center px-4 min-w-full border-gray-300"> 
                      {/* table headers */}
                     <thead className='sticky top-0'>
                          <tr className="text-xs text-gray-700 uppercase bg-gray-100">
                              <th scope="col" className="px-3 py-6 w-16">No</th>
                              <th scope="col" className="px-3 py-6 w-48">Time</th>
                              <th scope="col" className="px-3 py-6 w-32">Username</th>
                              <th scope="col" className="px-3 py-6 w-24">Division</th>
                              <th scope="col" className="px-3 py-6 w-24">Role</th>
                              <th scope="col" className=" px-3 py-6 w-32">Action</th>
                              <th scope="col" className=" px-3 py-6 w-24">Status</th>
                          </tr>
                      </thead> 
                      {/* table body */}
                      <tbody>
                    {/* {logs && logs.length > 0 ?
                      logs.map((item, index) => { 
                        return ( */}
                          {/* <tr key={index} className="bg-white border-b hover:bg-gray-200">
                              <td className="py-2 h-24">{item.log_id}</td>
                              <td className="py-2 h-24 font-medium text-gray-900 whitespace-nowrap">{item.created_at}</td>
                              <td className="py-2 h-24">{item.user_name}</td>
                              <td className="py-2 h-24">{item.division_name}</td>
                              <td className="py-2 h-24">{item.role_name}</td>
                              <td className="py-2 h-24">{item.action}</td>
                              <td className="py-2 h-24 text-start">{item.result}</td>                              
                          </tr> */}
                      {/* )}) */}
                      {/* : */}
                        <tr>
                            <td colSpan="7" className="text-center py-4 text-2xl font-bold">
                            Logs are still empty
                            </td>
                        </tr>
                      </tbody>
                  </table>
            </div>
            <div className="mt-6 pb-8 flex justify-center">
                <span className="block pr-4">Page {currentPage} of {Math.ceil(totalLogs/pageSize)}</span>
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
                    currentPage < Math.ceil(totalLogs/pageSize) ?
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

export default Log
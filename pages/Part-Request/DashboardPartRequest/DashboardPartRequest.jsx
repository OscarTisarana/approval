import React from 'react'
import RoleButtons from '../../../components/RoleButtons';
import ManagerTable from '../../../components/ManagerTable';
import EmployeeTable from '../../../components/EmployeeTable';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'
import axios from 'axios'
import Layout from '../../Layout';
import WarehouseManagerTable from '../../../components/WarehouseManagerTable';

const DashboardPartRequest = () => {
    const navigate = useNavigate();
      
    const [query, setQuery] = useState("")


    const [data, setData] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);

    const [user, setUser] = useState({})
  
    useEffect(()=>{
        if(window.localStorage.getItem('token') === "" || window.localStorage.getItem('token') === null){
            navigate("/login");
        }
        else {
            getUser()
            // .then(() => fetchData())
            // .catch((error) => console.error(error));
        }
    },[])

    useEffect(() => {
      if (user.UserId) {  // This will check if UserId is not undefined, null, etc.
        fetchData();
      }
    }, [user]);  // This will run every time `user` changes.
  
    const getUser = () => {
        axios.get('http://localhost:8008/auth/user', { headers:{Authorization: 'Bearer ' + window.localStorage.getItem('token')}})
        .then((r) => {
            console.log(r.data)
            setUser(r.data)
        })
        .catch((e) => {
            console.log(e)
        });
    }

    // useEffect(() => {
    const fetchData = async() => {
        try {
          const response = await axios.get(`http://localhost:8009/part_request?user_id=${user.UserId}`);
          console.log(response.data);
          setData(response.data);
          setHasFetched(true);
        } catch (error) {
          console.error(error);
        }
      };
    
      // if (user && !hasFetched) {
      //   fetchData();
      // }
    // }, [user, hasFetched]);

    return (
      <Layout>
        {/* <div className="container md:pl-40 flex lg:flex-row flex-col pt-32 justify-center"> */}
        <div className="container md:pl-40 flex flex-col pt-32 justify-center">    
            <div class="w-full">
                <div class="flex flex-col w-full px-4">
                  <h1 className=" font-size: 1vw text-3xl font-bold mb-4 text-start">Part Request Activity</h1>
                  <RoleButtons role={user.RoleName} page="partrequest " />
  
                  {/* PRODUCT STATUS */}
                  {/* <div className="flex gap-4 mb-4 sm:text-base">      
                    <div style={{border: "2px solid #ccc",
                      borderRadius: "4px",
                      textAlign: "center",
                      padding: "10px",
                      width: "100px",
                      backgroundColor: "#FFFFFF"}}>Parts Requested
                    </div>
                    <div style={{border: "2px solid #ccc",
                      borderRadius: "4px",
                      textAlign: "center",
                      padding: "10px",
                      width: "100px",
                      backgroundColor: "#FFFFFF"}}>Parts Need Approval</div>
                    <div style={{border: "2px solid #ccc",
                      borderRadius: "4px",
                      textAlign: "center",
                      padding: "10px",
                      width: "100px",
                      backgroundColor: "#FFFFFF"}}>Parts In Delivery</div>
                    <div style={{border: "2px solid #ccc",
                      borderRadius: "4px",
                      textAlign: "center",
                      padding: "10px",
                      width: "100px",
                      backgroundColor: "#FFFFFF"}}>Parts Delivered</div>
                  </div> */}

                  {/* TABLE PRODUCT DETAILS */}
                  {/* <div class ="table w-full" style={{border: "1px solid #ccc",
                      marginBottom: "18px",
                      borderRadius: "4px",
                      padding:"16px",
                      width: "450px",
                      backgroundColor: "#FFFFFF"}}>
                    <div class="table-header-group ..." >
                      <div class="table-row" >
                        <div class="table-cell text-left ...">Product Details</div>
                        <div class="table-cell text-left ...">Quantity</div>
                      </div>
                    </div>
                  <div class="table-row-group">
                    <div class="table-row">
                      <div class="table-cell ...">Low Stock Items</div>
                      <div class="table-cell ...">3</div>
                    </div>
                    <div class="table-row">
                      <div class="table-cell ...">Current Capacity</div>
                      <div class="table-cell ...">8000</div>
                    </div>
                    <div class="table-row">
                      <div class="table-cell ...">Stock Capacity</div>
                      <div class="table-cell ...">10000</div>
                    </div>
                    <div class="table-row">
                      <div class="table-cell ...">Unconfirmed Items</div>
                      <div class="table-cell ...">50</div>
                    </div>
                  </div> */}
                
                  {/* TOP REQUESTED PART */}
                  {/* <div class="flex" style={{border: "2px solid #ccc",
                    borderRadius: "4px",
                    textAlign: "center",
                    padding: "10px",
                    width: "450px",
                    backgroundColor: "#FFFFFF"}}>
                    <div  className="w-full">
                      <div className="text-start">
                        <h1 className= "text-xl font-bold mb-4">Top Requested Parts</h1>
                      </div>
                      <div className="flex gap-4 justify-evenly" >
                        <div>
                          <img src="images/RAM.jpeg" alt="" />
                            Item 1
                        </div>
                        <div>
                          <img src="images/RAM.jpeg" alt="" />
                            Item 2
                        </div>
                        <div>
                          <img src="images/RAM.jpeg" alt="" />
                            Item 3
                        </div>
                        <div>
                          <img src="images/RAM.jpeg" alt="" />
                            Item 4
                        </div>
                      </div>
                    </div>                 
                  </div>      */}
                </div>
            </div>
          
            {/* SISI KANAN FULL SIZE SCREEN */}
            <div className="w-full px-4">
                <div className="max-h-[34rem]">
                    {console.log(data)}
                        {user.RoleName === 'Manager' ? (
                          <WarehouseManagerTable data={data} />
                        ) : user.RoleName === 'Admin' ? (
                          <ManagerTable data={data} />
                        ) : user.RoleName === 'Employee' ? (
                          <EmployeeTable data={data} />
                        ) : null}
                </div>
            </div>
          </div>

        </Layout>
    
    )

 }
export default DashboardPartRequest
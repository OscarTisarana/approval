import React from 'react'
import RoleButtons from '../../../components/RoleButtons';
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect} from 'react'
import axios from 'axios'
import Layout from '../../../pages/Layout';
import AdminDiscrepancyTable from '../../../components/AdminDiscrepancyTable';
import WarehouseDiscrepancyTable from '../../../components/WarehouseDiscrepancyTable';

const DashboardPartDiscrepancy = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const [user, setUser] = useState({})
 
    useEffect(()=>{
        if(window.localStorage.getItem('token') === "" || window.localStorage.getItem('token') === null){
            navigate("/login");
        }
        else {
            getUser()
        }
    },[])
  
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

    {/* GET API UNTUK ADMIN DAN WAREHOUSE */}
    useEffect(() => {
      const fetchData = async () => {
        try {
          if(user.RoleName === "Admin"){
            const response = await axios.get(`http://localhost:8009/part_discrepancy/admin/trash?user_id=${user.UserId}`, { headers: { Authorization: 'Bearer ' + window.localStorage.getItem('token') } });
            console.log(response.data);
            setData(response.data);
          } 
          else {
            const response = await axios.get(`http://localhost:8009/part_discrepancy/warehouse/trash?user_id=${user.UserId}`, { headers: { Authorization: 'Bearer ' + window.localStorage.getItem('token') } });
            console.log(response.data);
            setData(response.data);
          }
          setHasFetched(true);
        } catch (error) {
          console.error(error);
        }
      };
  
      if (user && !hasFetched) {
        fetchData();
      }
    }, [user, hasFetched]);
    
    return (
      <Layout>
        <div className="container md:pl-40 flex flex-col pt-32 justify-center">  
            <div class="w-full">
                <div class="flex flex-col w-full px-4">
                  <h1 className="font-size: 1vw text-3xl font-bold mb-4 text-start lg:w-full">Part Discrepancy Activity</h1>
                  <RoleButtons role={user.RoleName}  page="partdiscrepancy" />
  
              {/* PRODUCT STATUS
                <div className="flex gap-4 mb-4 sm:text-base">      
                  
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
                </div>

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
            <h1 className= "text-xl font-bold mb-4">Top Requested Parts</h1></div>
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
          </div>                  */} 
            </div>
          </div>
        
           
          {/* SISI KANAN FULL SIZE SCREEN */}
          <div className="w-full px-4">
            <div className="rounded-lg">
              {console.log(data)}
              {user.RoleName === 'Manager' && <WarehouseDiscrepancyTable data={data} />}
              {user.RoleName === 'Admin' && <AdminDiscrepancyTable data={data} />}
            </div>
          </div>

        </div>
      </Layout>
    
    )
 }
export default DashboardPartDiscrepancy
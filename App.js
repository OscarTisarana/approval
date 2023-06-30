import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import EmailVerification from "./pages/EmailVerification/EmailVerification";
import EmailNotification from "./pages/EmailVerification/EmailNotification";
import Home from "./pages/Home";
import SparePart from "./pages/SparePart/SparePart";
import CreateSparePart from "./pages/SparePart/CreateSparePart";
import EditSparePart from "./pages/SparePart/EditSparePart";
import DashboardPartRequest from "./pages/Part-Request/DashboardPartRequest/DashboardPartRequest";
import CreatePartRequest from "./pages/Part-Request/CreatePartRequest/CreatePartRequest";
import EditPartRequest from "./pages/Part-Request/EditPartRequest/EditPartRequest";
import ApprovalPartManager from "./pages/Part-Request/ApprovaPart/ApprovalPart-manager";
import ApprovalPartWarehouse from "./pages/Part-Request/ApprovaPart/ApprovalPart-warehouse";
import DashboardPartDiscrepancy from "./pages/Part-Discrepancy/DashboardPartDiscrepancy/DashboardPartDiscrepancy"
import CreatePartDiscrepancy from "./pages/Part-Discrepancy/CreatePartDiscrepancy/CreatePartDiscrepancy";
import EditPartDiscrepancy from "./pages/Part-Discrepancy/EditPartDiscrepancy/EditPartDiscrepancy"
import ApprovalPartDiscrepancy from "./pages/Part-Discrepancy/AppovalPartDiscrepancy/ApprovalPartDiscrepancy";
import UserManagement from "./pages/UserManagementAdmin/UserManagement";
import EditUser from "./pages/UserManagementAdmin/EditUser";
import Log from "./pages/UserLogs/Log";
import NotFound from './pages/NotFound';
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/email/verification/:code/:email' element={<EmailVerification/>}/>
            <Route path='/email/notification' element={<EmailNotification/>}/>
            <Route path='/sparepart' element={<SparePart/>}/>
            <Route path='/sparepart/create' element={<CreateSparePart/>}/>
            <Route path='/sparepart/edit' element={<EditSparePart/>}/>
            <Route path='/partrequest' element={<DashboardPartRequest/>}/>
            <Route path='/partrequest/create' element={<CreatePartRequest/>}/>
            <Route path='/partrequest/edit' element={<EditPartRequest/>}/>
	          <Route path='/partrequest/approval/manager' element={<ApprovalPartManager/>}/>
            <Route path='/partrequest/approval/warehouse' element={<ApprovalPartWarehouse/>}/>
            <Route path='/partdiscrepancy' element={<DashboardPartDiscrepancy/>}/>
            <Route path='/partdiscrepancy/create' element={<CreatePartDiscrepancy/>}/>
            <Route path='/partdiscrepancy/edit' element={<EditPartDiscrepancy/>}/>
            <Route path='/partdiscrepancy/approval' element={<ApprovalPartDiscrepancy/>}/>
            <Route path='/usermanagement' element={< UserManagement/>}/>
            <Route path='/usermanagement/edit' element={<EditUser/>}/>
            <Route path='/userlog' element={<Log/>}/>
            <Route path="/*" element={<NotFound/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
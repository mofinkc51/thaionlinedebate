import React, { useEffect, useState } from 'react';
import './AdminMenu.css'
import AdminNavBar from '../../components/Navbar/AdminNavBar'
import AdminSidemenu from '../../components/admin-sidemenu/AdminSidemenu'
import AdminManageUser from './AdminManageUser'
import AdminDownloadRequestList from './AdminDownloadRequestList'
import AdminManageRequest from './AdminManageRequest'
import AdminManageAcitivity from './AdminManageActivity'
import AdminManageProblem from './AdminManageProblem'
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';


const AdminMenu = () => {
  const [activeMenu, setActiveMenu] = useState('manageUser'); 

  const handleMenuClick = (menu) => { 
    setActiveMenu(menu);
  };
  const navigate = useNavigate();
  const checkadmin = async () => {
    try {
      const res = await makeRequest.get("/auth/admin-checked")
      if (res.data === "false") {
        navigate("/signin");
      }
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    checkadmin()
  }, [])
  return (
    <>
    <AdminNavBar />
      <AdminSidemenu onMenuClick={handleMenuClick} />
      <div className="admin-menu-content-container">
        {activeMenu === 'manageUser' && <AdminManageUser />}
        {activeMenu === 'downloadRequest' && <AdminDownloadRequestList />}
        {activeMenu === 'manageactivity' && <AdminManageAcitivity />}
        {activeMenu === 'manageProblem' && <AdminManageProblem />}
      </div>
    </>
    
  );
}

export default AdminMenu
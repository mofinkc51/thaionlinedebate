import React from 'react'
import './AdminMenu.css'
import AdminNavBar from '../../components/Navbar/AdminNavBar'
import AdminSidemenu from '../../components/admin-sidemenu/AdminSidemenu'
import AdminManageUser from './AdminManageUser'
import AdminDownloadRequestList from './AdminDownloadRequestList'
import AdminManageRequest from './AdminManageRequest'
import AdminManageAcitivity from './AdminManageActivity'
import AdminManageProblem from './AdminManageProblem'
function AdminMenu() {
  return (
    <>
    {/* <AdminNavBar/> */}
    <AdminSidemenu/>  
    <div className="admin-menu-content-container">
        {/* <AdminManageUser/> */}
        {/* <AdminDownloadRequestList/> */}
        {/* <AdminManageRequest/> */}
        {/* <AdminManageAcitivity/>  */}
        <AdminManageProblem/>
    </div>
    </>
  )
}

export default AdminMenu
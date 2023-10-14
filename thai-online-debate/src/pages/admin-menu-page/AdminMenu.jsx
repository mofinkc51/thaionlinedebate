import React from 'react'
import './AdminMenu.css'
import AdminNavBar from '../../components/Navbar/AdminNavBar'
import AdminSidemenu from '../../components/admin-sidemenu/AdminSidemenu'
import AdminManageUser from './AdminManageUser'
function AdminMenu() {
  return (
    <>
    <AdminNavBar/>
    <AdminSidemenu/>
    <div className="admin-menu-content-container">
        <AdminManageUser/>


    </div>
    </>
  )
}

export default AdminMenu
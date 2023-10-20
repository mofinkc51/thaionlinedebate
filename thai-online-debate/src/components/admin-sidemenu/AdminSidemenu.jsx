import React from 'react'
import AdminNavbar from '../Navbar/AdminNavBar'
import './Sidemenu.css'
import manageUserIcon from '../../assets/icon/sidebar/group.png'

function AdminSidemenu() {
  return (
    <>
    <AdminNavbar/>
      <div className="admin-side-menu">
        {/* <div className='side-menu-container' >
          <button className='side-menu-button'>จัดการบัญชีผู้ใช้</button>
        </div> */}
        
        <ul>
          <li><a href="#">จัดการบัญชีผู้ใช้</a></li>
          <li><a href="#">อนุมัติคำร้องการดาวน์โหลด</a></li>
          <li><a href="#">จัดการกิจกรรมโต้แย้ง</a></li>
          <li><a href="#">จัดการปัญหา</a></li>
        </ul>
      </div>

    </>
  )
}

export default AdminSidemenu
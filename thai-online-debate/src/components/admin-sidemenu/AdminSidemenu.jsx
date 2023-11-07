import React from 'react'
import AdminNavbar from '../Navbar/AdminNavBar'
import './Sidemenu.css'
import manageUserIcon from '../../assets/icon/sidebar/group.png'
import AdminManageUser from '../../pages/admin-menu-page/AdminManageUser'


function AdminSidemenu({ onMenuClick }) {

  return (
    <>
      <div className="admin-side-menu">
        {/* <div className='side-menu-container' >
          <button className='side-menu-button'>จัดการบัญชีผู้ใช้</button>
        </div> */}
      <ul>
        <li><a href="#" onClick={() => onMenuClick('manageUser')}>จัดการบัญชีผู้ใช้</a></li>
        <li><a href="#" onClick={() => onMenuClick('downloadRequest')}>อนุมัติคำร้องการดาวน์โหลด</a></li>
        <li><a href="#" onClick={() => onMenuClick('manageactivity')}>จัดการกิจกรรมโต้แย้ง</a></li>
        <li><a href="#" onClick={() => onMenuClick('manageProblem')}>จัดการปัญหา</a></li>
      </ul>
    </div>
 
    </>
  )
}

export default AdminSidemenu
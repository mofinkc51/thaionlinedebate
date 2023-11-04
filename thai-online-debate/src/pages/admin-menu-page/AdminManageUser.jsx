import React from 'react'
import searchIcon from '../../assets/icon/search.png'
import './AdminManageUser.css'
import AdminManageUserRow from '../../components/admin-manage-user-row/AdminManageUserRow'


function AdminManageUser() {
  return (
    <>
        <div className="admin-manage-user-title-row">
            <h2>จัดการบัญชีผู้ใช้</h2>
            <div className="admin-manage-user-search-container">
                <button> <img src={searchIcon} alt="" /></button>
                <input type="text" placeholder="ค้นหาบัญชีผู้ใช้" />
            </div>
            
        </div>
        <table className='admin-manage-user-table'>
            {/* table header  */}
            <tr className='admin-manage-user-table-header'>
                <th>ชื่อบัญชีผู้ใช้</th>
                <th>อีเมล</th>
                <th>สถานะ</th>
                <th>ตรวจสอบ</th>
            </tr>
            {/* table body */}
            {<AdminManageUserRow/>}
            {/* <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/>
            <AdminManageUserRow/> */}

            


            

            
        </table>
    </>
  )
}

export default AdminManageUser
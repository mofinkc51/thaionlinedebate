import React from 'react'
import './AdminManageRequest.css'
import AdminManageRequestRow from '../../components/admin-manage-request-row/AdminManageRequestRow'

function AdminManageRequest() {
    
  return (
    <>
        <div className="admin-manage-request-title-row">
            <h2>อนุมัติคำร้องการดาวน์โหลดชุดข้อมูล</h2>
        </div>
        {/* table part */}
        <table className='admin-manage-request-table'>

            {/* table header  */}
            <tr className='admin-manage-request-table-header'>
                <th className='request-header-requester-name'>ชื่อผู้ร้อง</th>
                <th className='request-header-date'>วัน-เวลา</th>
                <th>เวลาคงเหลือ</th>
                <th className='request-header-topic-quantity'>จำนวนประเด็นโต้แย้ง</th>
                <th>สถานะ</th>
                <th className='request-header-manage'>จัดการ</th>
            </tr>

            {/* table body */}
            <AdminManageRequestRow/>
        </table>
    </>
  )
}

export default AdminManageRequest
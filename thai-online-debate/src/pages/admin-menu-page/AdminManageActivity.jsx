import React from 'react'
import './AdminManageActivity.css'
import AdminManageActivityRow from '../../components/admin-manage-activity-row/AdminManageActivityRow'

function AdminManageActivity() {
  return (
    <>
      <div className="admin-manage-activity-title-row">
        <h2 className='admin-manage-activity-title'>จัดการกิจกรรมโต้แย้ง</h2>
        <button>สร้างกิจกรรมโต้แย้ง</button>
      </div>

      {/* table part */}
      {/* table part */}
      <table className='admin-download-activity-table'>

        {/* table header  */}
        <tr className='admin-manage-activity-table-header'>
            <th className='activity-table-header-topic-name'>ชื่อกิจกรรมโต้แย้ง</th>
            <th className='activity-table-header-time'>วัน-เวลาที่เริ่ม</th>
            <th className='activity-table-header-time'>วัน-เวลาที่สิ้นสุด</th>
            <th>สร้างโดย</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
        </tr>

        {/* table body */}
        <AdminManageActivityRow/>
      </table>


    </>
  )
}

export default AdminManageActivity
import React from 'react'
import AdminManageProblemRow from '../../components/admin-manage-problem-row/AdminManageProblemRow'
import DeleteProblemPopup from '../../components/admin-popup/DeleteProblemPopup'
import EditProblemPopup from '../../components/admin-popup/EditProblemPopup'

function AdminManageProblem() {
  return (
    <>
        <div className="admin-manage-activity-title-row">
            <h2 className='admin-manage-activity-title'>จัดการปัญหา</h2>
        </div>
        {/* table part */}
        <table className='admin-download-activity-table'>

            {/* table header  */}
            <tr className='admin-manage-activity-table-header'>
                <th >ชื่อผู้ร้อง</th>
                <th>วัน-เวลา</th>
                <th>รายละเอียดปัญหา</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
            </tr>
            {/* table body */}
            <AdminManageProblemRow/>
        </table>
        {/* <DeleteProblemPopup/> */}
        <EditProblemPopup/>
    </>
  )
}

export default AdminManageProblem
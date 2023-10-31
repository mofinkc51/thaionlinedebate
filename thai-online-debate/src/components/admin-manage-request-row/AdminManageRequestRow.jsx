import React from 'react'
import './AdminManageRequestRow.css'
import editButtonIcon from '../../assets/icon/edit.png'
import deleteButtonIcon from '../../assets/icon/trash.png'

function AdminManageRequestRow() {
    const requestData ={
        requester: "Nathan Kuan",
        date: "13/05/2022  16.30",
        time: "6 วัน 23 ชั่วโมง",
        topicQuantity: "2",
        status: "อนุมัติ"
    }

    const handleEdit = () => {
        console.log("edit button clicked")
    }

    const handleDelete = () => {
        console.log("delete button clicked")
    }
  return (
    <>
    <tr className='admin-manage-request-row'>
            <td>{requestData.requester}</td>
            <td>{requestData.date}</td>
            <td>{requestData.time}</td>
            <td>{requestData.topicQuantity}</td>
            <td>{requestData.status}</td>
            <td>
                <button><img src={editButtonIcon} alt="" /></button>
                <button><img src={deleteButtonIcon} alt="" /></button>
            </td>
    </tr>
    </>
  )
}

export default AdminManageRequestRow
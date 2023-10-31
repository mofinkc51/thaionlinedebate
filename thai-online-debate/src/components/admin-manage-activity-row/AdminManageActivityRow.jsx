import React from 'react'
import './AdminManageActivityRow.css'
import editButtonIcon from '../../assets/icon/edit.png'
import deleteButtonIcon from '../../assets/icon/trash.png'


function AdminManageActivityRow() {
  return (
    <>
    <tr className='admin-manage-activity-row'>
            <td className='admin-manage-activity-topic-name'><p>จอดรถหน้าบ้านคนอื่นได้เพราะเป็นที่สาธาณะ</p></td>
            <td><p>05/04/2022  21.00 </p></td>
            <td><p>15/04/2022  11.00</p></td>
            <td><p>admin mf</p></td>
            <td>กำลังดําเนินการ</td>
            <td>
                <button><img src={editButtonIcon} alt="" /></button>
                <button><img src={deleteButtonIcon} alt="" /></button>
            </td>
    </tr>
    </>
  )
}

export default AdminManageActivityRow
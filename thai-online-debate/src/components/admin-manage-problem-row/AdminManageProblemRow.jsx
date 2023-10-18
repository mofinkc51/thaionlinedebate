import React from 'react'
import './AdminManageProblemRow.css'
import checkButtonIcon from '../../assets/icon/check.png'
import deleteButtonIcon from '../../assets/icon/trash.png'


function AdminManageProblemRow() {
  return (
    <>
    <tr className='admin-manage-problem-row'>
            <td className='admin-manage-problem-topic-name'><p>Nathat Kuan</p></td>
            <td><p>05/04/2022  21.00 </p></td>
            <td className='admin-manage-problem-desc'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo cumque quia quo aliquam! Fugit veniam iste dolore accusamus nam quibusdam!</p></td>
            <td>กำลังดําเนินการ</td>
            <td>
                <button><img src={checkButtonIcon} alt="" /></button>
                <button><img src={deleteButtonIcon} alt="" /></button>
            </td>
    </tr>
    </>
  )
}

export default AdminManageProblemRow
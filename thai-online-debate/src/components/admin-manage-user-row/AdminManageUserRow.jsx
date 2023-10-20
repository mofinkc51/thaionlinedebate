import React from 'react'
import inspectIcon from '../../assets/icon/inspect.png'
import './AdminManageUserRow.css'

function AdminManageUserRow() {
    // if (document.getElementById("user_status").value == "active") {
    //     document.getElementById("user_status").style.background = "#EBF9F1;";
    // } else {
    //     document.getElementById("user_status").style.background = "red";
    // }
    
  return (
    <>
    <tr className='admin-manage-user-row'>
            <td>Nathan Kuan</td>
            <td>email@gmail.com</td>
            <td>
            <select id="user_status" name="user_status">
                <option value="active">ปกติ</option>
                <option value="suspension">บัญชีถูกระงับ</option>
            </select>
            </td>
            <td>
                <button><img src={inspectIcon} alt="" /></button>
            </td>
        </tr>
    </>
  )
}

export default AdminManageUserRow
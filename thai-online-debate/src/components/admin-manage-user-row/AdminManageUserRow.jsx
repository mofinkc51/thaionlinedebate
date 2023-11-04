import React from 'react';
import inspectIcon from '../../assets/icon/inspect.png';
import './AdminManageUserRow.css';

function AdminManageUserRow(props) {
  const { user_name, user_email, role_id } = props.user; // รับข้อมูลผู้ใช้ผ่าน props

  return (
    <tr className='admin-manage-user-row'>
      <td>{user_name}</td>
      <td>{user_email}</td>
      <td>{}</td>
      <td>
        <button><img src={inspectIcon} alt="" /></button>
      </td>
    </tr>
  );
}

export default AdminManageUserRow;

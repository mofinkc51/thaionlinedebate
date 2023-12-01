import React from 'react';
import './AdminManageProblemRow.css';
import checkButtonIcon from '../../assets/icon/check.png';
import deleteButtonIcon from '../../assets/icon/trash.png';

function AdminManageProblemRow({ problem, onEditClick, onDelete }) {
  const { user_name, rp_timestamp, rp_description, rp_status, rp_id } = problem;

  // console.log('rp_id:', rp_id); // ใส่ console.log เพื่อดูค่า rp_id

  return (
    <tr className='admin-manage-problem-row'>
      <td className='admin-manage-problem-topic-name'>
        <p>{user_name}</p>
      </td>
      <td>
        <p>{rp_timestamp}</p>
      </td>
      <td className='admin-manage-problem-desc'>
        <p>{rp_description}</p>
      </td>
      <td>{rp_status}</td>
      <td>
        <button onClick={onEditClick}><img src={checkButtonIcon} alt="" /></button>
        <button onClick={() => onDelete(rp_id)}><img src={deleteButtonIcon} alt="" /></button> 
      </td>
    </tr>
  );
}

export default AdminManageProblemRow;

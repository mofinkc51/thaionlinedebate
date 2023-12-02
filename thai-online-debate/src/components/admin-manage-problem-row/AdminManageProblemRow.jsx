import React from 'react';
import './AdminManageProblemRow.css';
import checkButtonIcon from '../../assets/icon/check.png';

function AdminManageProblemRow({ problem, onEditClick }) {
  const { user_name, rp_timestamp, rp_description, rp_status, rp_id } = problem;

  // console.log('rp_id:', rp_id); // ใส่ console.log เพื่อดูค่า rp_id
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(dateString).toLocaleString('th-TH', options);
  };
  return (
    <tr className='admin-manage-problem-row'>
      <td className='admin-manage-problem-topic-name'>
        <p>{user_name}</p>
      </td>
      <td>
        <p>{formatDate(rp_timestamp)}</p>
      </td>
      <td className='admin-manage-problem-desc'>
        <p>{rp_description}</p>
      </td>
      <td>{rp_status}</td>
      <td>
        <button onClick={onEditClick}><img src={checkButtonIcon} alt="" /></button>
      </td>
    </tr>
  );
}

export default AdminManageProblemRow;

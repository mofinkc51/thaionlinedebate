import React from 'react';
import './AdminManageProblemRow.css';
import checkButtonIcon from '../../assets/icon/check.png';

function AdminManageProblemRow({ problem, onEditClick }) {
  const { user_name, rp_timestamp, rp_description, rp_status, rp_id } = problem;
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

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return <div className="download-row-status-box-approved"><p>ดำเนินการแล้ว</p></div>;
      case 'pending':
        return <div className="download-row-status-box-pending"><p>รอตรวจสอบ</p></div>;
      // Add more cases for other statuses if needed
      default:
        return <div className="download-row-status-box-rejected"><p>unknown</p></div>;; // Default text
    }
  };
  return (
    <tr className='admin-manage-problem-row'>
      <td className='admin-manage-problem-topic-name'>
        <p className='admin-manage-problem-row-p'>{user_name}</p>
      </td>
      <td>
        <p className='admin-manage-problem-row-p'>{formatDate(rp_timestamp)}</p>
      </td>
      <td className='admin-manage-problem-desc'>
        <p className='admin-manage-problem-row-p'>{rp_description}</p>
      </td>
      <td className='admin-manage-problem-row-status'><div>{getStatusText(rp_status)}</div></td>
      <td className='admin-manage-problem-row-manage'>
        <div>
          <button onClick={onEditClick}><img src={checkButtonIcon} alt="" /></button>

        </div>
      </td>
    </tr>
  );
}

export default AdminManageProblemRow;

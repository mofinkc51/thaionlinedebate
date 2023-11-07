import React from 'react';
import './AdminManageActivityRow.css'
import editButtonIcon from '../../assets/icon/edit.png'
import deleteButtonIcon from '../../assets/icon/trash.png'


function AdminManageActivityRow({ activity }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  const getActivityStatus = (start_date, end_date) => {
    const now = new Date();
    const start = new Date(start_date);
    const end = new Date(end_date);
    // ตรวจสอบว่าเวลาปัจจุบันอยู่ภายในช่วงเวลาของกิจกรรมหรือไม่
    return now >= start && now <= end ? 'กำลังดำเนินการ' : 'หมดเวลา';
  };

  

  return (
    <>
      <tr className='admin-manage-activity-row'>
        <td className='admin-manage-activity-topic-name'><p>{activity ? activity.dbt_title : 'Loading...'}</p></td>
        <td><p>{activity ? formatDate(activity.act_start_date) : 'Loading...'}</p></td>
        <td><p>{activity ? formatDate(activity.act_end_date) : 'Loading...'}</p></td>
        <td><p>{activity ? activity.admin_name : 'Loading...'}</p></td>
        <td>{activity ? getActivityStatus(activity.act_start_date, activity.act_end_date) : 'Loading...'}</td>
        <td>
            <button><img src={editButtonIcon} alt="Edit" /></button>
            <button><img src={deleteButtonIcon} alt="Delete" /></button>
        </td>
      </tr>
    </>
  );
}

export default AdminManageActivityRow;
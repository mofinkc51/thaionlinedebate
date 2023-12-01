import React, { useState } from 'react';
import './AdminManageActivityRow.css';
import editButtonIcon from '../../assets/icon/edit.png';
import deleteButtonIcon from '../../assets/icon/trash.png';
import EditActivityPopup from '../admin-popup/EditActivityPopup';

function AdminManageActivityRow({ activity }) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isEditPopupReopen, setIsEditPopupReopen] = useState(false);

  const handleEditButtonClick = () => {
    console.log('Edit Button Clicked. Activity:', activity);
    setIsEditPopupOpen(true);
    setIsEditPopupReopen(true);
  };
  

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setIsEditPopupReopen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  const getActivityStatus = (start_date, end_date) => {
    const now = new Date();
    const start = new Date(start_date);
    const end = new Date(end_date);
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
          <button onClick={handleEditButtonClick}><img src={editButtonIcon} alt="Edit" /></button>
          <button><img src={deleteButtonIcon} alt="Delete" /></button>
        </td>
      </tr>

      {isEditPopupOpen && (
        <EditActivityPopup
          activity={activity}
          onClose={closeEditPopup}
          isReopen={isEditPopupReopen}
        />
      )}
    </>
  );
}

export default AdminManageActivityRow;

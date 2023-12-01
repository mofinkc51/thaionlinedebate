import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminManageRequestRow.css';
import editButtonIcon from '../../assets/icon/edit.png';
import deleteButtonIcon from '../../assets/icon/trash.png';
import DeleteRequestPopup from '../admin-popup/DeleteRequestPopup';

function AdminManageRequestRow({ data, onEdit }) {
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const navigate = useNavigate();

  const handleNavigateEdit = () => {
    console.log("edit button clicked", data);
    navigate(`/manage/main/request/${data.dr_id}`);
    console.log('dr_id:', data.dr_id);
  };

  const getCountdownTime = (timestamp) => {
    const createdAt = new Date(timestamp);
    const sevenDaysLater = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const timeRemaining = sevenDaysLater - now;

    if (timeRemaining < 0) {
      return 'หมดเวลา';
    }

    let seconds = Math.floor((timeRemaining / 1000) % 60);
    let minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    let hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    days = days < 10 ? '0' + days : days;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${days} วัน ${hours} ชั่วโมง ${minutes} นาที `;
  };

  const [countdown, setCountdown] = useState(() => getCountdownTime(data.dr_timestamp));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(getCountdownTime(data.dr_timestamp));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data.dr_timestamp]);

  const handleEdit = () => {
    console.log("edit button clicked", data);
    navigate(`/manage/main/request/${data.dr_id}`);
  };

  const handleDelete = () => {
    console.log("delete button clicked", data);
    setDeletePopupVisible(true);
  };

  const handleCancelDelete = () => {
    setDeletePopupVisible(false);
  };

  const handleConfirmDelete = (deletedData) => {
    console.log('Deleting request:', deletedData);
    // Perform the actual delete action here
    setDeletePopupVisible(false); // Close the popup after deletion
  };

  // Helper function to format the timestamp
  const formatDate = (timestamp) => {
    const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543; // Add 543 for the Buddhist calendar year
    return `${day} ${month} ${year}`;
  };

  return (
    <tr className='admin-manage-request-row'>
      <td>{data.user_name}</td>
      <td>{formatDate(data.dr_timestamp)}</td>
      <td>{countdown}</td>
      <td>{data.dr_total_topic}</td>
      <td>{/* proof one */}</td>
      <td className='request-header-manage'>
        <button onClick={() => onEdit(data)}><img src={editButtonIcon} alt="Edit" /></button>
        <button onClick={handleDelete}><img src={deleteButtonIcon} alt="Delete" /></button>

        {/* Render the DeleteRequestPopup if isVisible state is true */}
        {isDeletePopupVisible && (
          <DeleteRequestPopup
            data={data}
            onClose={handleCancelDelete}
            onDelete={handleConfirmDelete}
          />
        )}
      </td>
    </tr>
  );
}

export default AdminManageRequestRow;

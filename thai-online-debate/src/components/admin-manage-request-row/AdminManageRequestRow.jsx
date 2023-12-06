import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminManageRequestRow.css';
import editButtonIcon from '../../assets/icon/edit.png';
import deleteButtonIcon from '../../assets/icon/trash.png';
import DeleteRequestPopup from '../admin-popup/DeleteRequestPopup';

function AdminManageRequestRow({ id, data, onEdit, approveData,getDetail}) {
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const navigate = useNavigate();

  const getCountdownTime = (timestamp) => {
    const createdAt = new Date(timestamp);
    const sevenDaysLater = new Date(createdAt.getTime());
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

  const [countdown, setCountdown] = useState();
  useEffect(() => {
    if (!approveData) {
      return;
    }
    const intervalId = setInterval(() => {
      setCountdown(getCountdownTime(approveData.ap_download_expired_date));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [approveData]);

  // Helper function to format the timestamp
  const formatDate = (timestamp) => {
    const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543; // Add 543 for the Buddhist calendar year
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} ${month} ${year} - ${hours}:${minutes}`;
  };
  const EditAndGetDetail = (data) => {
    onEdit(data)
    getDetail(data.dr_id)
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return <div className="download-row-status-box-approved"><p>อนุมัติแล้ว</p></div>;
      case 'pending':
        return <div className="download-row-status-box-pending"><p>รออนุมัติ</p></div>;
      case 'rejected':
        return <div className="download-row-status-box-rejected"><p>ไม่อนุมัติ</p></div>;
      // Add more cases for other statuses if needed
      default:
        return 'Unknown'; // Default text
    }
  };
  return (
    <tr className='admin-manage-request-row'>
      <td className='admin-manage-request-row-name'>{data.dr_name}</td>
      <td className='admin-manage-request-row-date'>{formatDate(data.dr_timestamp)}</td>
      <td className='admin-manage-request-row-remain'>{approveData ?
            countdown :
            "N/A"}</td>
      <td className='admin-manage-request-row-quantity'><div>{data.dr_total_topic}</div></td>
      <td className='admin-manage-request-row-status'><div>{getStatusText(data.dr_status)}</div></td>
      <td className='admin-manage-request-row-manage'>
        <div>
          <button onClick={() => EditAndGetDetail(data)}><img src={editButtonIcon} alt="Edit" /></button>
          
        </div>
      </td>
    </tr>
  );
}

export default AdminManageRequestRow;

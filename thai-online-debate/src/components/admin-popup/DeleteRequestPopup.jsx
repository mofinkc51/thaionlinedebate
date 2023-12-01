import React from 'react';
import axios from 'axios';
import closeButtonIcon from '../../assets/icon/close.png';
import './DeleteRequestPopup.css';

function DeleteRequestPopup({ data, onClose, onDelete }) {
  const handleConfirmDelete = () => {
    // console.log('Deleting request:', data);
    onDelete();
    axios.put('http://localhost:8800/api/admin/approval_status', { dr_id: data.dr_id })
      .then(response => {
        console.log('Approval status:', response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching approval status:', error);
      });
    onClose();
  };

  const handleCancel = () => {
    onClose(); // Close the popup without deleting
  };

  return (
    <>
      <div className="delete-request-bg-opacity">
        <div className="delete-request-popup-box">
          <button className='delete-request-close-button' onClick={handleCancel}><img src={closeButtonIcon} alt="" /></button>

          <div className="delete-request-popup-container">
            <h3 className='delete-request-popup-title'>ยืนยันการลบคำร้อง</h3>
            {/* button row */}
            <div className="delete-request-button-row">
              <button className='delete-request-confirm-button' onClick={handleConfirmDelete}>ยืนยัน</button>
              <button className='delete-request-cancel-button' onClick={handleCancel}>ยกเลิก</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteRequestPopup;

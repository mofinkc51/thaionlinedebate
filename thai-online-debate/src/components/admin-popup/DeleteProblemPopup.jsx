import React from 'react';
import closeButtonIcon from '../../assets/icon/close.png';
import axios from 'axios';

function DeleteProblemPopup({ onCancel, onConfirm, rp_id }) {

  const handleConfirmClick = async () => {
    try {
      const response = await axios.put('http://localhost:8800/api/admin/reportproblem_status', { rp_id });
      onConfirm();
    } catch (error) {
      console.error('Error updating status:', error);
    
    }
  };

  
  const handleCancelClick = () => {
    onCancel(); 
  };
  
  return (
    <>
      <div className="delete-activity-bg-opacity">
        <div className="delete-activity-popup-box">
          <button className='delete-activity-close-button' onClick={handleCancelClick}>
            <img src={closeButtonIcon} alt="" />
          </button>

          <div className="delete-activity-popup-container">
            <h3 className='delete-activity-popup-title'>ยืนยันการลบปัญหา</h3>
            {/* Button row */}
            <div className="delete-activity-button-row">
              <button className='delete-activity-confirm-button' onClick={handleConfirmClick}>ยืนยัน</button>
              <button className='delete-activity-cancel-button' onClick={handleCancelClick}>ยกเลิก</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteProblemPopup;

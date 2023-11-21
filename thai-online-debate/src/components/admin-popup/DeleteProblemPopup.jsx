import React, { useEffect, useState } from 'react';
import closeButtonIcon from '../../assets/icon/close.png';
import axios from 'axios';

function DeleteProblemPopup({ onCancel, onConfirm, rp_id }) {
  const [problems, setProblems] = useState([]);

  const handleConfirmClick = () => {
    onConfirm();
  };
  useEffect(() => {
    axios.put('http://localhost:8800/api/admin/reportproblem_status', { rp_id })
      .then((response) => {
        setProblems(response.data);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  }, [rp_id]);
  return (
    <>
      <div className="delete-activity-bg-opacity">
        <div className="delete-activity-popup-box">
          <button className='delete-activity-close-button' onClick={onCancel}><img src={closeButtonIcon} alt="" /></button>

          <div className="delete-activity-popup-container">
            <h3 className='delete-activity-popup-title'>ยืนยันการลบปัญหา</h3>
            {/* Button row */}
            <div className="delete-activity-button-row">
              <button className='delete-activity-confirm-button' onClick={handleConfirmClick}>ยืนยัน</button>
              <button className='delete-activity-cancel-button' onClick={onCancel}>ยกเลิก</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteProblemPopup;

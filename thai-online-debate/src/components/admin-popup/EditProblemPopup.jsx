import React, { useState, useEffect } from 'react';
import closeButtonIcon from '../../assets/icon/close.png';
import axios from 'axios'; // Import Axios
import Swal from 'sweetalert2';
import './EditProblemPopup.css';
import { makeRequest } from '../../axios';

function EditProblemPopup({ onClose, problem, onConfirm ,refreshProblems}) {
  const [rp_admin_note, SetAdmin_note] = useState();
  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleClosePopup = () => {
    setPopupVisible(false);
    if (onClose) onClose();
  };

  const handleConfirmClick = async () => {
    if (!rp_admin_note) {
      Swal.fire( {
        icon: 'error',
        title: 'กรุณาใส่รายละเอียดการแก้ไขปัญหา',
      })
      return
    }
    try {
      const response = await makeRequest.put('/admin/rereportproblem_admindescription', {
        rp_id : problem.rp_id,
        rp_admin_note : rp_admin_note
      })
      onConfirm();
      refreshProblems();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };
  


  if (!isPopupVisible) {
    return null;
  }

  return (
    <div className="edit-problem-bg-opacity">
      <div className="edit-problem-popup-box">
        <div className="edit-problem-popup-box-container">
          <form action="">
            <div className="edit-problem-title-row">
              <h2>ดำเนินการแก้ไขปัญหาเสร็จสิ้น</h2>
              <button type="button" className="edit-problem-close-button" onClick={handleClosePopup}>
                <img src={closeButtonIcon} alt="ปิด" />
              </button>
            </div>
            <div className="edit-problem-popup-problemdesc-row">
              <label className="edit-problem-popup-label">รายละเอียดปัญหา</label>
              <p>{problem.rp_description}</p>
            </div>
            <div className="edit-problem-popup-problemdesc-row">
              <label className="edit-problem-popup-label">รายละเอียดการดำเนินการแก้ไขปัญหา</label>
              <textarea
                className="edit-problem-popup-problemdesc-input"
                cols="30"
                rows="5"
                name='rp_admin_note'
                value={rp_admin_note}
                onChange={(e) => SetAdmin_note(e.target.value)}
              ></textarea>
            </div>
            <div className="edit-problem-button-row">
              <button type="button" className="edit-problem-confirm-button" onClick={handleConfirmClick}>
                ยืนยัน
              </button>
              <button type="button" className="edit-problem-cancel-button" onClick={handleClosePopup}>
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProblemPopup;

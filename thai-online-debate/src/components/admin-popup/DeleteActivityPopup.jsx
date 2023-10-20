import React from 'react'
import './DeleteActivityPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'
function DeleteActivityPopup() {
  return (
    <>
        <div className="delete-activity-bg-opacity">
            <div className="delete-activity-popup-box">
                <button className='delete-activity-close-button'><img src={closeButtonIcon} alt="" /></button>

                <div className="delete-activity-popup-container">
                    <h3 className='delete-activity-popup-title'>ยืนยันการลบกิจกรรมโต้แย้ง</h3>
                    {/* button row */}
                    <div className="delete-activity-button-row">
                        <button className='delete-activity-confirm-button'>ยืนยัน</button>
                        <button className='delete-activity-cancel-button'>ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DeleteActivityPopup
import React from 'react'
import closeButtonIcon from '../../assets/icon/close.png'
import './DeleteRequestPopup.css'

function DeleteRequestPopup() {
  return (
    <>
        <div className="delete-request-bg-opacity">
            <div className="delete-request-popup-box">
                <button className='delete-request-close-button'><img src={closeButtonIcon} alt="" /></button>

                <div className="delete-request-popup-container">
                    <h3 className='delete-request-popup-title'>ยืนยันการลบคำร้อง</h3>
                    {/* button row */}
                    <div className="delete-request-button-row">
                        <button className='delete-request-confirm-button'>ยืนยัน</button>
                        <button className='delete-request-cancel-button'>ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DeleteRequestPopup
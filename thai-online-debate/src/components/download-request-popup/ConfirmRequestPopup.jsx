import React from 'react'
import closeButtonIcon from '../../assets/icon/close.png'
import './ConfirmRequestPopup.css'
    
function ConfirmRequestPopup() {
    // const {onCloseClick} = props;
  return (
    <>
        <div className="confirm-request-bg-opacity">
            <div className="confirm-request-popup-box">
                <button className='confirm-request-close-button' ><img src={closeButtonIcon} alt="" /></button>

                <div className="confirm-request-popup-container">
                    <h3 className='confirm-request-popup-title'>ยืนยันการส่งคำร้องการดาวน์โหลดชุดข้อมูล</h3>
                    {/* button row */}
                    <div className="confirm-request-button-row">
                        <button className='confirm-request-confirm-button'>ยืนยัน</button>
                        <button className='confirm-request-cancel-button' >ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ConfirmRequestPopup
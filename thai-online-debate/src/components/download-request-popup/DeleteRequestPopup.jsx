import React from 'react'
import closeButtonIcon from '../../assets/icon/close.png'
import './DeleteRequestPopup.css'
    
function DeleteRequestPopup() {
    // const {onCloseClick} = props;
  return (
    <>
        <div className="delete-request-bg-opacity">
            <div className="delete-request-popup-box">
                <button className='delete-request-close-button' ><img src={closeButtonIcon} alt="" /></button>

                <div className="delete-request-popup-container">
                    <h3 className='delete-request-popup-title'>ยืนยันการลบรายการประเด็นโต้แย้ง<br/>ที่ต้องการดาวน์โหลด</h3>
                    {/* button row */}
                    <div className="delete-request-button-row">
                        <button className='delete-request-confirm-button'>ยืนยัน</button>
                        <button className='delete-request-cancel-button' >ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DeleteRequestPopup
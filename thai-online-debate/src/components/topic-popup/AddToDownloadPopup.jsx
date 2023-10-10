import React from 'react'
import './AddToDownloadPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'
function AddToDownloadPopup(props) {
  const {onCloseClick} = props;

  return (
    <>
        <div className="add-to-download-bg-opacity">
            <div className="add-to-download-popup-box">
                <button className='add-to-download-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt="" /></button>

                <div className="add-to-download-popup-container">
                    <h3 className='add-to-download-popup-title'>เพิ่มเข้ารายการดาวน์โหลดแล้ว</h3>
                    {/* button row */}
                    <div className="add-to-download-button-row">
                        <button className='add-to-download-confirm-button' onClick={onCloseClick}>ยืนยัน</button>
                        {/* <button className='add-to-fav-cancel-button' onClick={onCloseClick}>ยกเลิก</button> */}
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default AddToDownloadPopup
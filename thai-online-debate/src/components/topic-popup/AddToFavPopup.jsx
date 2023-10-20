import React from 'react'
import './AddToFavPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'
function AddToFavPopup(props) {
  const {onCloseClick} = props;

  return (
    <>
        <div className="add-to-fav-bg-opacity">
            <div className="add-to-fav-popup-box">
                <button className='add-to-fav-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt="" /></button>

                <div className="add-to-fav-popup-container">
                    <h3 className='add-to-fav-popup-title'>เพิ่มเข้ารายการที่ชื่นชอบแล้ว</h3>
                    {/* button row */}
                    <div className="add-to-fav-button-row">
                        <button className='add-to-fav-confirm-button' onClick={onCloseClick}>ยืนยัน</button>
                        {/* <button className='add-to-fav-cancel-button' onClick={onCloseClick}>ยกเลิก</button> */}
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default AddToFavPopup
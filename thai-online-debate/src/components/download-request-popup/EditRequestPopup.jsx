import React from 'react'
import './EditRequestPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'

function EditRequestPopup(props) {
    const {onCloseClick} = props;
  return (
    <>
    <div className="edit-request-bg-opacity">
        <div className="edit-request-popup-box">
            <div className="edit-request-popup-box-container">
                {/* request title row */}
                <div className="edit-request-title-row">
                    <h2>แก้ไขรายการประเด็นโต้แย้ง<br/>ที่ต้องการดาวน์โหลด</h2>
                    <button className='edit-request-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt="" /></button>
                </div>

                {/* stance row */}
                <div className="edit-request-stance-row">
                        {/* Stance one */}
                        <div className="edit-request-stance">
                            <label className='edit-request-popup-label'>ฝั่งที่ 1</label>
                            <input type="text" className='edit-request-popup-stance-input'/>
                        </div>
                        {/* Stance two */}
                        <div className="edit-request-stance">
                            <label className='edit-request-popup-label'>ฝั่งที่ 2</label>
                            <input type="text" className='edit-request-popup-stance-input'/>
                        </div>

                </div>

                {/* button row */}
                <div className="edit-request-button-row">
                    <button className='edit-request-confirm-button'>ยืนยัน</button>
                    <button className='edit-request-cancel-button' onClick={onCloseClick}>ยกเลิก</button>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default EditRequestPopup
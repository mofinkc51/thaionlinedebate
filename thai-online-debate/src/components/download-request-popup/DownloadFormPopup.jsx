import React from 'react'
import './DownloadFormPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'

function DownloadFormPopup(props) {
    const {onCloseClick} = props;
  return (
    <>
    <div className="download-form-bg-opacity">
        <div className="download-form-popup-box">
            <div className="download-form-popup-box-container">
                {/* request title row */}
                <div className="download-form-title-row">
                    <h2>ส่งคำร้องขอการดาวน์โหลดชุดข้อมูล</h2>
                    <button className='download-form-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt="" /></button>
                </div>
                {/* request name row */}
                <div className="download-form-popup-topicname-row">
                    <label className='download-form-popup-label'>ชื่อจริง - นามสกุล</label>
                    <input type="text" className='download-form-popup-topicname-input'/>
                </div>
                {/* request desc row */}
                <div className="download-form-popup-topicdesc-row">
                    <label className='download-form-popup-label'>เหตุผลที่ต้องการนำข้อมูลไปใช้</label>
                    <textarea className="download-form-popup-topicdesc-input" name="" id="" cols="30" rows="5"></textarea> 
                </div>

                {/* proof of request */}
                <div className="download-form-popup-proof-row">
                    <label className='download-form-popup-label'>หลักฐานการนำข้อมูลไปใช้</label><br/>
                    <div className='download-form-popup-proof-input'>
                        <label className='download-form-proof-text'>บัตรประชาชน</label>
                        <button className='download-form-upload-proof-button'>อัปโหลด</button>
                    </div>
                    <div className='download-form-popup-proof-input'>
                        <label className='download-form-proof-text'>เอกสารยืนยันจากต้นสังกัด</label>
                        <button className='download-form-upload-proof-button'>อัปโหลด</button>
                    </div>
                </div>

                {/* button row */}
                <div className="download-form-button-row">
                    <button className='download-form-confirm-button'>ยืนยัน</button>
                    <button className='download-form-cancel-button' onClick={onCloseClick}>ยกเลิก</button>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default DownloadFormPopup
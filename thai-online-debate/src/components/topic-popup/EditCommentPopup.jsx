import React from 'react'
import './EditCommentPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'

function EditCommentPopup(props) {
    const {onCloseClick} = props;
  return (
    <>
    <div className="edit-comment-bg-opacity">
        <div className="edit-comment-popup-box">
            <div className="edit-comment-popup-box-container">
                {/* request title row */}
                <div className="edit-comment-title-row">
                    <h2>แก้ไขข้อความโต้แย้ง</h2>
                    <button className='edit-comment-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt="" /></button>
                </div>
                {/* request desc row */}
                <div className="edit-comment-popup-topicdesc-row">
                    <label className='edit-comment-popup-label'>ข้อความโต้แย้ง</label>
                    <textarea className="edit-comment-popup-topicdesc-input" name="" id="" cols="30" rows="5"></textarea> 
                </div>

                {/* button row */}
                <div className="edit-comment-button-row">
                    <button className='edit-comment-confirm-button'>ยืนยัน</button>
                    <button className='edit-comment-cancel-button' onClick={onCloseClick}>ยกเลิก</button>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default EditCommentPopup
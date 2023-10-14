import React from 'react'
import './EditPasswordPopup.css'

function EditPasswordPopup() {
  return (
    <>
        <div className="edit-password-bg-opacity">
            <div className="edit-password-popup-box">
                {/* <button className='edit-password-close-button' ><img src={closeButtonIcon} alt="" /></button> */}

                <div className="edit-password-popup-container">
                    <form>
                        {/*title row */}
                        <div className="edit-password-title-row">
                            <h2>เปลี่ยนรหัสผ่าน</h2>
                            {/* <button className='edit-password-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt="" /></button> */}
                        </div>
                        {/* old password row */}
                        <div className="edit-password-popup-old-password-row">
                            <label className='edit-password-popup-label'>รหัสผ่านเดิม</label>
                            <input type="text" className='edit-password-input'/>
                        </div>
                        {/* new password row */}
                        <div className="edit-password-popup-new-password-row">
                            <label className='edit-password-popup-label'>รหัสผ่านใหม่</label>
                            <input type="text" className='edit-password-input'/>
                        </div>
                        {/* confirm password row */}
                        <div className="edit-password-popup-confirm-password-row">
                            <label className='edit-password-popup-label'>ยืนยันรหัสผ่าน</label>
                            <input type="text" className='edit-password-input'/>
                        </div>
                        {/* button row */}
                        <div className="edit-password-button-row">
                            <button className='edit-password-confirm-button'>ยืนยัน</button>
                            <button className='edit-password-cancel-button'>ยกเลิก</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditPasswordPopup
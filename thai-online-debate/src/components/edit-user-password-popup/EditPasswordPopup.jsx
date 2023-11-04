import React, { useState } from 'react'
import './EditPasswordPopup.css'
import Swal from 'sweetalert2'
import { password_validation } from '../../checked';
import { makeRequest } from '../../axios';
function EditPasswordPopup(props) {
    const handleChange = (e) => {
        setInput((prev)=>({ ...prev, [e.target.name]:e.target.value}));
    };
    
    const [input, setInput] = useState({
        user_password: '',
        new_password: '',
        confirm_password: '',
        user_id: props.user_id
    });
    const onSubmit = async (e) => {
        e.preventDefault();
        if (input.new_password !== input.confirm_password) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'password not match'
            }).then(() => {
                document.getElementsByName('confirm_password')[0].focus();
            });
        }
        if (!password_validation(input.new_password, 5, 20)) {
            return document.getElementsByName('new_password')[0].focus();
        } else {
            try {
                await makeRequest.put("/auth/changepassword", input)
                Swal.fire({
                    icon: 'success',
                    title: 'แก้ไขข้อมูลสําเร็จ',
                }).then(() => {
                    window.location.reload();
                })
            } catch(err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data
                })
            }
        }
        console.log(input)
    }
    
  return (
    <>
        <div className="edit-password-bg-opacity">
            <div className="edit-password-popup-box">
                {/* <button className='edit-password-close-button' ><img src={closeButtonIcon} alt="" /></button> */}

                <div className="edit-password-popup-container">
                    <form onSubmit={onSubmit}>
                        {/*title row */}
                        <div className="edit-password-title-row">
                            <h2>เปลี่ยนรหัสผ่าน</h2>
                            {/* <button className='edit-password-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt="" /></button> */}
                        </div>
                        {/* old password row */}
                        <div className="edit-password-popup-old-password-row">
                            <label className='edit-password-popup-label'>รหัสผ่านเดิม</label>
                            <input type="password" className='edit-password-input'
                            name='user_password' onChange={handleChange}
                            
                            />
                        </div>
                        {/* new password row */}
                        <div className="edit-password-popup-new-password-row">
                            <label className='edit-password-popup-label'>รหัสผ่านใหม่</label>
                            <input type="password" className='edit-password-input'
                            name='new_password' onChange={handleChange}
                            />
                        </div>
                        {/* confirm password row */}
                        <div className="edit-password-popup-confirm-password-row">
                            <label className='edit-password-popup-label'>ยืนยันรหัสผ่าน</label>
                            <input type="password" className='edit-password-input'
                            name='confirm_password' onChange={handleChange}
                            />
                        </div>
                        {/* button row */}
                        <div className="edit-password-button-row">
                            <button type='submit' className='edit-password-confirm-button'>ยืนยัน</button>
                            <button className='edit-password-cancel-button' onClick={props.onClose}>ยกเลิก</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditPasswordPopup
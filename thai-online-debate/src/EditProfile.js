import React from 'react'
import Navbar from './components/Navbar'
import './EditProfile.css'
import profImg from './images/profile.jpg'

function EditProfile() {
  return (
    <div>
        <Navbar />
        <div className='page-body'>
            <div className='edit-page-body'>
                <div className='edit-profile-box'>
                    <h2 className='edit-page-title'>แก้ไขข้อมูลส่วนตัว</h2>

                    <div className='edit-row'>
                        <p className='edit-label-text'>รูปภาพโปรไฟล์</p>
                        <button className='edit-prof-btn'>แก้ไข</button>
                    </div>
                    
                    {/* profile pic and desc */}
                    <div className='prof-pic-row'>
                        <img src={profImg} className='edit-prof-img' />
                        <div>
                            <p>ไฟล์นามสกุล jpg, png</p>
                            <p>ขนาดไม่เกิน 2MB</p>
                        </div>
                    </div>

                    {/* username */}
                    <div className='edit-row'>
                        <p className='edit-label-text'>ชื่อบัญชีผู้ใข้</p>
                        <button className='edit-prof-btn'>แก้ไข</button>
                    </div>

                    <p className='editable-user-data'>username</p>

                    {/* phonenum */}
                    <div className='edit-row'>
                        <p className='edit-label-text'>เบอร์โทรศัพท์</p>
                        <button className='edit-prof-btn'>แก้ไข</button>
                    </div>
                    <p className='editable-user-data'>0871242414</p>

                    {/* email */}
                    <div className='edit-row'>
                        <p className='edit-label-text'>อีเมล</p>
                        <button className='edit-prof-btn'>แก้ไข</button>
                    </div>
                    <p className='editable-user-data'>user@gmail.com</p>

                    {/* password */}
                    <div className='edit-row'>
                        <p className='edit-label-text'>รหัสผ่าน</p>
                        <button className='edit-prof-btn'>แก้ไข</button>
                    </div>
                    
                    
                    
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default EditProfile
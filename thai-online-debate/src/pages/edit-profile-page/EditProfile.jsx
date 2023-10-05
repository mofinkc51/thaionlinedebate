import React from 'react'
import './EditProfile.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import profileImg from '../../assets/profile.png'

function EditProfile() {
  return (
    <>
    <UserNavBar/>
    <div className="edit-profile-page-container">
        <div className="edit-profile-box">
            <div className="edit-profile-box-container">
                <h2>ข้อมูลส่วนตัว</h2>
                {/* profile img label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>รูปภาพโปรโฟล์</p>
                    <button className='edit-profile-edit-button'>อัปโหลด</button>
                </div>

                {/* image row */}              
                <div className="edit-profile-profile-image-row">
                    <img src={profileImg} className='edit-profile-profile-img' />
                    <p className='edit-profile-profile-img-desc'>ไฟล์นามสกุล jpg, png <br/>ขนาดไฟล์ไม่เกิน 2 MB </p>
                </div>

                {/* username label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>ชื่อบัญชีผู้ใช้</p>
                    <button className='edit-profile-edit-button'>แก้ไข</button>
                </div>
                <p className='edit-profile-profile-data'>nker31</p>

                {/* phonenum label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>เบอร์โทรศัพท์</p>
                    {/* <button className='edit-profile-edit-button'>แก้ไข</button> */}
                </div>
                <p className='edit-profile-profile-data'>0831234567</p>

                {/* email label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>อีเมล</p>
                </div>
                <p>peamzakc@gmail.com</p>

                {/* password label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>รหัสผ่าน</p>
                    <button className='edit-profile-edit-button'>เปลี่ยนรหัสผ่าน</button>
                </div>

            </div>
        </div>


    </div>
    </>
  )
}

export default EditProfile
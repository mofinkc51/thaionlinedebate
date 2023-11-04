import './EditProfile.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import profileImg from '../../assets/profile.png'
import React ,{ useContext ,useRef,useState}from 'react'
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
function EditProfile() {
    
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser.user_pic);
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
                    {/* <button onClick={handleClick} className='edit-profile-edit-button'>อัปโหลด
                    <input 
                        type="file"
                        ref={hiddenFileInput}        
                        style={{display:'none'}}
                        onChange={(e) => setPic(e.target.files[0])} 
                    />
                    </button> */}
                </div>

                {/* image row */}              
                <div className="edit-profile-profile-image-row">
                    {/* <img src={pic 
                        ? URL.createObjectURL(pic) 
                        : "/upload/"+currentUser.user_pic+""} alt='' 
                        className='edit-profile-profile-img' /> */}
                    <img src={require('../../assets/upload/'+currentUser.user_pic)} className='edit-profile-profile-img' />
                    <p className='edit-profile-profile-img-desc'>ไฟล์นามสกุล jpg, png <br/>ขนาดไฟล์ไม่เกิน 2 MB </p>
                </div>

                {/* username label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>ชื่อบัญชีผู้ใช้</p>
                    <a href='me/edit' className='edit-profile-edit-button'>แก้ไข</a>
                    {/* <button className='edit-profile-edit-button'>แก้ไข</button> */}
                </div>
                <p className='edit-profile-profile-data'>{currentUser.user_name}</p>

                {/* phonenum label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>เบอร์โทรศัพท์</p>
                    {/* <button className='edit-profile-edit-button'>แก้ไข</button> */}
                </div>
                <p className='edit-profile-profile-data'>{currentUser.user_phonenum}</p>

                {/* email label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>อีเมล</p>
                </div>
                <p>{currentUser.user_email}</p>

                {/* password label row */}
                <div className="edit-profile-profile-label-row">
                    {/* <p className='edit-profile-data-label'>รหัสผ่าน</p> */}
                    {/* <button className='edit-profile-edit-button'>เปลี่ยนรหัสผ่าน</button> */}
                </div>

            </div>
        </div>


    </div>
    </>
  )
}

export default EditProfile
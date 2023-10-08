import React,{ useContext, useState } from 'react'
import UserNavBar from '../../components/Navbar/UserNavBar'
import profileImg from '../../assets/profile.png'
import { AuthContext } from '../../context/authContext';

function EditProfileData() {

    const { currentUser } = useContext(AuthContext);

    const [userData,setUserData ]= useState({
        user_name: currentUser.user_name,
        user_phonenum: currentUser.user_phonenum
    });
    
    console.log(userData);
    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        
      };
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    // };
    const handleSubmit = async (e) => { 
        e.preventDefault();
    }

  return (
    <>
    <UserNavBar/>
    <div className="edit-profile-page-container">
        <div className="edit-profile-box">
        <div className="edit-profile-box-container">
                <h2>แก้ไขข้อมูลส่วนตัว</h2>
                {/* profile img label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>รูปภาพโปรโฟล์</p>
                    {/* <button className='edit-profile-edit-button'>แก้ไขรูปภาพ</button> */}
                </div>

                {/* image row */}              
                <div className="edit-profile-profile-image-row">
                    <img src={profileImg} className='edit-profile-profile-img' />
                    {/* s<p className='edit-profile-profile-img-desc'>ไฟล์นามสกุล jpg, png <br/>ขนาดไฟล์ไม่เกิน 2 MB </p> */}
                </div>

                {/* username label row */}
                <form onSubmit={handleSubmit}>
                    <div className="edit-profile-profile-label-row">
                        <p className='edit-profile-data-label'>ชื่อบัญชีผู้ใช้</p>
                        <button className='edit-profile-edit-button'>บันทึก</button>
                    </div>

                    <input className='edit-profile-textfield' type="text"  
                    name="user_name" value={userData.user_name} onChange={handleChange}
                    required/><br/>
                    {/* <p className='edit-profile-profile-data'>nker31</p> */}

                    {/* phonenum label row */}
                    <div className="edit-profile-profile-label-row">
                        <p className='edit-profile-data-label'>เบอร์โทรศัพท์</p>
                        {/* <button className='edit-profile-edit-button'>แก้ไข</button> */}
                    </div>

                    <input className='edit-profile-textfield' type="number" 
                    name="user_phonenum" value={userData.user_phonenum} onChange={handleChange}

                    /><br/>
                    {/* <p className='edit-profile-profile-data'>0831234567</p> */}

                </form>
                

                {/* email label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>อีเมล</p>
                </div>
                <p>{currentUser.user_email}</p>

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

export default EditProfileData
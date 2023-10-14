import React,{ useContext, useState } from 'react'
import UserNavBar from '../../components/Navbar/UserNavBar'
import profileImg from '../../assets/profile.png'
import { AuthContext } from '../../context/authContext';
import { phone_validation, user_validation } from '../../checked';
import { makeRequest } from '../../axios';
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom';

function EditProfileData() {

    const { currentUser } = useContext(AuthContext);

    const [userData,setUserData ]= useState({
        user_email: currentUser.user_email,
        user_id: currentUser.user_id,
        user_name: currentUser.user_name,
        user_phonenum: currentUser.user_phonenum,
        user_pic: currentUser.user_pic
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
        if (!user_validation(userData.user_name,5,15)){
            return document.getElementsByName('user_name')[0].focus();
        }
        if (!phone_validation(userData.user_phonenum)){
            return document.getElementsByName('user_phonenum')[0].focus();
        } try {
            await makeRequest.put(`/users/edit/${userData.user_id}`, userData)
            localStorage.setItem('user', JSON.stringify(userData));
            
            Swal.fire({
                icon: 'success',
                title: 'แก้ไขข้อมูลสําเร็จ',
            });
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: err.response.data,
            })
        }
        //console.log("you tick toog and correct password");
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
                    name="user_phonenum" value={userData.user_phonenum} onChange={handleChange} data-maxlength = "10"
                    oninput="this.value=this.value.slice(0,this.dataset.maxlength)" 

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
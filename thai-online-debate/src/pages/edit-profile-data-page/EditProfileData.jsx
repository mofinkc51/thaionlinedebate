import React,{ useContext, useState,useRef } from 'react'
import UserNavBar from '../../components/Navbar/UserNavBar'
import profileImg from '../../assets/profile.png'
import { AuthContext } from '../../context/authContext';
import { phone_validation, user_validation } from '../../checked';
import { makeRequest } from '../../axios';
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom';
import EditPasswordPopup from '../../components/edit-user-password-popup/EditPasswordPopup';

function EditProfileData() {
    const { currentUser } = useContext(AuthContext);
    const [pic, setPic] = useState(null);
    const hiddenFileInput = useRef(null);

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const [userData,setUserData ]= useState({
        user_email: currentUser.user_email,
        user_id: currentUser.user_id,
        user_name: currentUser.user_name,
        user_phonenum: currentUser.user_phonenum,
        user_pic: currentUser.user_pic
    });
    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
    const handleSubmit = async (e) => { 
        e.preventDefault();
        let picUrl;
        picUrl = pic ? await upload(pic) : userData.user_pic;
    
        if (picUrl === null){
            picUrl = userData.user_pic;
        }
        // Updating user_pic in the local copy
        const updatedUserData = { ...userData, user_pic: picUrl};
        if (!user_validation(updatedUserData.user_name,5,15)){
            return document.getElementsByName('user_name')[0].focus();
        }
        
        if (!phone_validation(updatedUserData.user_phonenum)){
            return document.getElementsByName('user_phonenum')[0].focus();
        } 
        
        try {
            await makeRequest.put(`/users/edit/${updatedUserData.user_id}`, updatedUserData)
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            Swal.fire({
                icon: 'success',
                title: 'แก้ไขข้อมูลสําเร็จ',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            })
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: err.response.data,
            })
        }
    
        // Now, update the state
        setUserData(updatedUserData);
        setPic(null);
    }
    
    const handleClick = () => {
        hiddenFileInput.current.click();
      };

    const [showEditPasswordPopup, setShowEditPasswordPopup] = useState(false);
    const changePassWord = () => {
        setShowEditPasswordPopup(true);
    };
    const handleEditPasswordPopupClose = () => {
        setShowEditPasswordPopup(false);
    };
    
   
    
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
                    <button onClick={handleClick} className='edit-profile-edit-button'>อัปโหลด
                    <input 
                        type="file"
                        ref={hiddenFileInput}        
                        style={{display:'none'}}
                        onChange={(e) => setPic(e.target.files[0])} 
                    />
                    </button>
                </div>

                {/* image row */}              
                <div className="edit-profile-profile-image-row">
                    {/* <img src={profileImg} className='edit-profile-profile-img' /> */}
                    <img 
                    src={pic ? URL.createObjectURL(pic) : require('../../assets/upload/'+currentUser.user_pic)}
                    alt='' 
                        className='edit-profile-profile-img' />
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
                    <button type="button" onClick={changePassWord} className='edit-profile-edit-button'>เปลี่ยนรหัสผ่าน</button>
                    {showEditPasswordPopup && <EditPasswordPopup onClose={handleEditPasswordPopupClose} user_id = {currentUser.user_id}/>}
                </div>

            </div>
        </div>
    </div>
    
    </>
  )
}

export default EditProfileData
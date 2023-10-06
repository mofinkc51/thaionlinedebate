import React from 'react'
import './Profile.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import profileImg from '../../assets/profile.png'
import HistoryTopic from '../../components/HistoryTopic'

function Profile() {
  return (
    <>
        <UserNavBar/>
        <div className="profile-page-container">
            {/* left side profile data */}
            <div className="profile-left-side-box">

                {/* upper-container */}
                <div className="profile-left-upper-container">
                    <div className='profile-upper-image-container'>
                        <img className='profile-prof-img' src={profileImg} alt="profile-name" />
                    </div>
                    <div className="profile-upper-profilename-container">
                        <p className='profile-prof-name'>Profile Name</p>
                    </div>
                    <div className="profile-upper-editprofile-button-container">
                        <button className='profile-edit-prof-button'>ข้อมูลส่วนตัว</button>
                    </div>
                </div>

                {/* lower container- contain stat element */}
                <div className="profile-stat-container">
                    <p className='profile-stat-title'>สถิติ</p>
                    <div className="profile-stat-row">
                        <p className="profile-stat-label">ประเด็นโต้แย้งที่สร้าง</p>
                        <p>5</p>
                    </div>
                    <div className="profile-stat-row">
                        <p className="profile-stat-label">จำนวนการโต้แย้ง</p>
                        <p>5</p>
                    </div>
                    <div className="profile-stat-row">
                        <p className="profile-stat-label">จำนวนการโดนกดถูกใจ</p>
                        <p>5</p>
                    </div>
                </div>


            </div>

            {/* right side history */}
            <div className="profile-right-side-box">
                <p className='profile-topic-history-title'>ประวัติประเด็นโต้แย้ง</p>
                <HistoryTopic/>
                <HistoryTopic/>
                <HistoryTopic/>

            </div>
        </div>
    </>
  )
}

export default Profile
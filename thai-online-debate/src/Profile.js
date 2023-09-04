import React from 'react'
import Navbar from './components/Navbar'
import profImg from './images/profile.jpg'
import './Profile.css'
import ProfileStatLine from './components/ProfileStatLine'
import HistoryElement from './components/HistoryElement'


function Profile() {

    const username = 'Mofin Yimy'
  return (
    <div>
        <Navbar/>
        <div className='page-body'>
            <div class='profile-page-body'>
                <div className='profile-body'>
                    
                    <div className='left-box'>
                        <div>
                            <img className='profile-img' src={profImg} />

                            <p className='username-text'>{username}</p>
                            <a className='edit-profile'>แก้ไขข้อมูลส่วนตัว</a>
                            

                        </div>
                        
                        <div>
                        <h4>สถิติ</h4>
                            <ProfileStatLine title='ประเด็นโต้แย้งที่สร้าง' data='5'/>
                            <ProfileStatLine title='จำนวนการโต้แย้ง' data='2'/>
                            <ProfileStatLine title='จำนวนการโดนกดถูกใจ' data='10'/>
                            
                        </div>
                    </div>
                    
                </div>

                {/* right box */}
                <div className='history-box'>
                    <h3>ประวัติประเด็นโต้แย้ง</h3>
                    <HistoryElement date="13/04/2565" title="Topic1" />
                    <HistoryElement date="13/04/2565" title="Topic1" />
                    <HistoryElement date="13/04/2565" title="Topic1" />
                </div>
            </div>
        </div>

        

        

    </div>
  )
}

export default Profile
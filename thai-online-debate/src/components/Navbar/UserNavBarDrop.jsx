import React from 'react'
import './UserNavBar.css'

function UserNavBarDrop() {
  return (
    <>
       <nav>
            <div class="nav-container">
                <div class="nav-wrapper">
                    <div class="logo">
                        <h3>TDBate</h3>
                    </div>
                    <ul class="nav-menu" id="myMenu">
                        <li><a href="">หน้าแรก</a></li>
                        <li><a href="">สร้าง</a></li>
                        <div class="dropdown">
                            <li className='dropdown'><a class="dropbtn" href="">บัญชีผู้ใช้</a></li> 
                            <div class="dropdown-content">
                                <a href="#"><img src=""/>โปรไฟล์</a>
                                <a href="#">รายการประเด็นโต้แย้งที่ชื่นชอบ</a>
                                <a href="#">ส่งคำร้องการดาวน์โหลด</a>
                                <a href="#">ประวัติคำร้องขอชุดข้อมูล</a>
                                
                            </div>
                        </div>

                    </ul>
                   
                    {/* <div class="ham-menu" onclick={toggleHam(this)}>
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div> */}
                    
                </div>
            </div>
        </nav> 
    </>
  )
}

export default UserNavBarDrop
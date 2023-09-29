import React from 'react'
import './UserNavBar.css'

function UserNavBar() {

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
                        <div class="nav-dropdown">
                            <li className='nav-dropdown'><a class="nav-dropbtn" href="">บัญชีผู้ใช้</a></li> 
                            <div class="nav-dropdown-content">
                                <a href="#"><img src=""/>โปรไฟล์</a>
                                <a href="#">รายการประเด็นโต้แย้งที่ชื่นชอบ</a>
                                <a href="#">ส่งคำร้องการดาวน์โหลด</a>
                                <a href="#">ประวัติคำร้องขอชุดข้อมูล</a>
                                
                            </div>
                        </div>

                    </ul>
                    {/* <ul class="nav-menu" id="myMenu">
                        <li><a href="">หน้าแรก</a></li>
                        <li><a href="">สร้าง</a></li>
                        <li><a href="">บัญชีผู้ใช้</a></li>
                    </ul> */}
                   
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




export default UserNavBar
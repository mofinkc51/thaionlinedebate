import axios from "axios";
import './UserNavBar.css'
import React ,{ useContext }from 'react'
import { AuthContext } from '../../context/authContext';
import { makeRequest } from "../../axios";
import Swal from 'sweetalert2'
export const createTopicForm = () => {
    var x = document.getElementsByClassName("showcreate");
    if (x[0].style.display === "none") {
        x[0].style.display = "block";
    } else {
        x[0].style.display = "none";
    }
};

function UserNavBar() {

    const { currentUser } = useContext(AuthContext);

    const logout = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "คุณต้องการออกจากระบบหรือไม่?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่ ออกจากระบบเลย!',
          }).then((result) => {
            if (result.isConfirmed) {
                logout_db()
            }
          })
    }
    const logout_db = async () => {
        const res = await makeRequest.post("/auth/logout", "");
        localStorage.removeItem("user");
        window.location.reload();
    }

  return (
    <>
       <nav>
            <div class="nav-container">
                <div class="nav-wrapper">
                    <div class="logo">
                        <h3>TDBate</h3>
                    </div>
                    <ul class="nav-menu" id="myMenu">
                        <li><a href="/">หน้าแรก</a></li>
                        <li><a onClick={createTopicForm}>สร้าง</a></li>
                        <div class="nav-dropdown">
                            <li className='nav-dropdown'><a class="nav-dropbtn" href="">{currentUser.user_name} ▼</a></li> 
                            <div class="nav-dropdown-content">
                                
                                <a href="/profile"><img src=""/>โปรไฟล์</a>
                                <a href="#">รายการประเด็นโต้แย้งที่ชื่นชอบ</a>
                                <a href="#">ส่งคำร้องการดาวน์โหลด</a>
                                <a href="#">ประวัติคำร้องขอชุดข้อมูล</a>
                                <a href="/" onClick={logout}>ออกจากระบบ</a>
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
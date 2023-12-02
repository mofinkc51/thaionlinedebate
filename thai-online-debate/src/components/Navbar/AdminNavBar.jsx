import axios from "axios";
import './UserNavBar.css'
import React ,{ useContext }from 'react'
import { AuthContext } from '../../context/authContext';
import { makeRequest } from "../../axios";
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom'

export const createTopicForm = () => {
    var x = document.getElementsByClassName("showcreate");
    if (x[0].style.display === "none") {
        x[0].style.display = "block";
    } else {
        x[0].style.display = "none";
    }
};

function AdminNavBar() {

    const { currentUser } = useContext(AuthContext);
    const navigator = useNavigate();
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
        await makeRequest.post("/auth/logout", "");
        localStorage.removeItem("user");
        navigator("/signin");
    }
    const location = useLocation();

  return (
    <>
       <nav>
            <div class="nav-container">
                <div class="nav-wrapper">
                    <div class="logo">
                        <a href="/"><h3>Thai Online Debate</h3></a>
                    </div>
                    <ul class="nav-menu" id="myMenu">
                        <li><a href="/">หน้าแรก</a></li>
                        {location.pathname === "/" && (
                            <li className="nav-menu-home"><a onClick={createTopicForm}>สร้าง</a></li>
                        )}
                        <li><a href="/manage/main">เมนู</a></li>
                        <div class="nav-dropdown">
                            <li className='nav-dropdown'><a class="nav-dropbtn" href="">{currentUser.user_name} ▼</a></li> 
                            <div class="nav-dropdown-content">
                                <a className="nav-dropdown-a" href={`/profile/${currentUser.user_id}`}>โปรไฟล์</a>
                                <a className="nav-dropdown-a" href="/fav">รายการประเด็นโต้แย้งที่ชื่นชอบ</a>
                                <a className="nav-dropdown-a" href="/downloadrequest">ส่งคำร้องการดาวน์โหลด</a>
                                <a className="nav-dropdown-a" href="/historydownload">ประวัติคำร้องขอชุดข้อมูล</a>
                                <a className="nav-dropdown-signout" href="/" onClick={logout}>ออกจากระบบ</a>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </nav> 
    </>
  )
}

export default AdminNavBar
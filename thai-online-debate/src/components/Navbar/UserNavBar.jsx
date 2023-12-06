import axios from "axios";
import './UserNavBar.css'
import React ,{ useContext }from 'react'
import { AuthContext } from '../../context/authContext';
import { makeRequest } from "../../axios";
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaAngleDown} from 'react-icons/fa6'

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
    const navigator = useNavigate();
    const logout = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "คุณต้องการออกจากระบบหรือไม่?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'grey',
            confirmButtonText: 'ใช่ ออกจากระบบเลย!',
            cancelButtonText: 'ยกเลิก'
          }).then((result) => {
            if (result.isConfirmed) {
                logout_db()
            }
          }) 
    }
    const logout_db = async () => {
        await makeRequest.post("/auth/logout", "");
        localStorage.removeItem("user");
        localStorage.removeItem('downloadList');
        navigator("/signin");
    }
    const location = useLocation();

      function toggleHam() {
        const x = document.querySelector(".ham-menu");
        x.classList.toggle("change");
    
        let myMenu = document.getElementById('myMenu');
        if (myMenu.className === 'nav-vertical-menu') {
            myMenu.className += ' menu-active';
        } else {
            myMenu.className = 'nav-vertical-menu';
        }
      }

  return (
    <>
       <nav>
            <div class="nav-container">
                <div class="nav-wrapper">
                    <div className="nav-logo-ham-row">
                        <div class="logo">
                            <a href="/"><h3>Thai Online Debate</h3></a>
                        </div>
                        {/* hamburger menu */}
                        <div class="ham-menu" onClick={toggleHam}>
                            <div class="bar1"></div>
                            <div class="bar2"></div>
                            <div class="bar3"></div>
                        </div>
                    </div>
                    {/* reponsive menu */}
                    <ul class="nav-vertical-menu" id="myMenu">
                        <li><a href="/">หน้าแรก</a></li>
                        <li><a href="/profile/${currentUser.user_id}">โปรไฟล์</a></li>
                        <li><a href="/fav">รายการประเด็นโต้แย้งที่ชื่นชอบ</a></li>
                        <li><a href="/downloadrequest">ส่งคำร้องการดาวน์โหลด</a></li>
                        <li><a href="/historydownload">ประวัติคำร้องขอชุดข้อมูล</a></li>
                        <li><a href="/" onClick={logout}>ออกจากระบบ</a></li>
                    </ul>
                    {/* default menu */}
                    <ul class="nav-menu">
                        <li><a href="/">หน้าแรก</a></li>
                        {location.pathname === "/" && (
                            <li className="nav-menu-home"><a onClick={createTopicForm}>สร้าง</a></li>
                        )}
                        <div class="nav-dropdown">
                            <li className='nav-dropdown'><a class="nav-dropbtn" href="">{currentUser.user_name} 
                            <FaAngleDown/>
                            </a></li> 
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




export default UserNavBar
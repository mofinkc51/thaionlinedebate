import './Profile.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import profileImg from '../../assets/profile.png'
import HistoryTopic from '../../components/HistoryTopic'
import React ,{ Children, useContext, useEffect, useState }from 'react'
import { makeRequest } from '../../axios'
import { AuthContext } from '../../context/authContext';
import AdminNavBar from '../../components/Navbar/AdminNavBar'
import { useLocation } from 'react-router-dom'
import { userPicPath } from '../../userPicPath'
function Profile(props) {
    const { user_id } = props;
    const  [userData , setUserData]  = useState({});
    const [countData, setCountData] = useState({});
    const [historyData, setHistoryData] = useState([]);
    const [debateData, setDebateData] = useState([]);
    const getProfile = async () => {
        try {
            const res = await makeRequest.get(`/users/find/${user_id}`);
            setUserData(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    const getUserCount = async () => {
        try {
            const res = await makeRequest.get(`/users/count/${user_id}`);
            setCountData(res.data);
        } catch(err) {
            console.error(err);
        }
    }
    const getHistory = async () => {
        try {
            const res = await makeRequest.get(`/users/history/${user_id}`);
            setHistoryData(res.data);
        } catch(err) {
            console.error(err);
        }
    }
    const personal_link = () => {
        window.location.href = "/profile/me";
    }
    const getDebateByuser = async () => {
        try {
            const res = await makeRequest.get(`/posts/debate/${user_id}`);
            setDebateData(res.data);
        } catch(err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getProfile();
        getUserCount();
        getHistory();
        getDebateByuser();
    },[])
    const profileImageSrc = userData.user_pic ? userPicPath+userData.user_pic : profileImg;
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState(false);
    const checkadmin = async () => {
      try {
        const res = await makeRequest.get("/auth/admin-checked")
        if (res.data === "true") {
          setIsAdmin(true)
        }
        return res.data
      } catch (err) {
        console.error(err)
      }
    }
    useEffect(() => {
      checkadmin()
    }, [])
  return (
    <>  
        {isAdmin ? <AdminNavBar /> : <UserNavBar />}
        <div className="profile-page-container">
            {/* left side profile data */}
            <div className="profile-left-side-box">

                {/* upper-container */}
                <div className="profile-left-upper-container">
                    <div className='profile-upper-image-container'>
                        <img className='profile-prof-img' src={profileImageSrc} alt="profile-pic" />
                    </div>
                    <div className="profile-upper-profilename-container">
                        <p className='profile-prof-name'>{userData.user_name}</p>
                    </div>
                    <div className="profile-upper-editprofile-button-container">
                        {/* <a id = "profil" href="#">ข้อมูลส่วนตัว</a> */}
                        {location.pathname.split("/").pop() === currentUser.user_id && (
                            <button className='profile-edit-prof-button' onClick={personal_link}>ข้อมูลส่วนตัว</button>
                         )}
                    </div>
                </div>

                {/* lower container- contain stat element */}
                <div className="profile-stat-container">
                    <p className='profile-stat-title'>สถิติ</p>
                    <div className="profile-stat-row">
                        <p className="profile-stat-label">ประเด็นโต้แย้งที่สร้าง</p>
                        <p>{countData.debate_count}</p>
                    </div>
                    <div className="profile-stat-row">
                        <p className="profile-stat-label">จำนวนการโต้แย้ง</p>
                        <p>{countData.comment_count}</p>
                    </div>
                    <div className="profile-stat-row">
                        <p className="profile-stat-label">จำนวนการโดนกดถูกใจ</p>
                        <p>{countData.fav_count}</p>
                    </div>
                </div>


            </div>

            {/* right side history */}
            <div className="profile-right-side-box">
                
                <p className='profile-topic-history-title'>ประเด็นโต้แย้งที่สร้าง</p>
                {debateData.map((debateData)=>(
                    <HistoryTopic id={debateData.dbt_id} title={debateData.dbt_title} timestamp={debateData.dbt_timestamp}/>
                ))}
            </div>
            <div className="profile-right-side-box">
                <p className='profile-topic-history-title'>ประวัติประเด็นโต้แย้งที่มีส่วนร่วม</p>
                {historyData.map((historyData)=>(
                    <HistoryTopic id={historyData.dbt_id} title={historyData.dbt_title} timestamp={historyData.timestamp}/>
                ))}
                
            </div>

            
        </div>
    </>
  )
}

export default Profile
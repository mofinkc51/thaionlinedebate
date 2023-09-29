import React from 'react'
import './FavDebateGallery.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import UserNavBarDrop from '../../components/Navbar/UserNavBarDrop'
import TopicComponent from '../../components/TopicComponent'

function FavDebateGallery() {
  return (
    <>
    <UserNavBar/>
    {/* <UserNavBarDrop/> */}
    <div className="fav-debate-gallery-page-container">
        <div className="fav-debate-gallery-title-row">
            <h2>รายการประเด็นโต้แย้งที่ชื่นชอบ</h2>
        </div>
        <div className="fav-debate-gallery">
        <TopicComponent/>
        <TopicComponent/>
        <TopicComponent/>
        <TopicComponent/>
        <TopicComponent/>
        {/* <TopicComponent/> */}
            

        </div>
    </div>
    </>
  )
}

export default FavDebateGallery
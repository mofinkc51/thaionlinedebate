import React from 'react'
import './DebateTopic.css'
import UserNavbar from '../../components/Navbar/UserNavBar'
import TopicTag from '../../components/TopicTag'
import optionButtonIcon from '../../assets/icon/more-vertical.png'

function DebateTopic() {

  // Close the dropdown menu if the user clicks outside of it
  // window.onclick = function(event) {
  //   if (!event.target.matches('.debate-topic-option-dropdown')) {
  //     var dropdowns = document.getElementsByClassName("debate-topic-dropdown-content");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show');
  //       }
  //     }
  //   }
  // }
  const topicData = {
    topicName: "รถพลังงานไฟฟ้าจะมาแทนที่แบบสันดาป",
    topicCreator: "User",
    topicDescription: ""
  }

  const dropDownClick = () =>{
    console.log("clicked")
    document.getElementById("myDropdown").classList.toggle("show");
  }
  return (
    <>
        <UserNavbar />
        {/* page container */}
        <div className="debate-topic-page-container">
           {/* topic meta data box */}
          <div className="debate-topic-meta-data-container">
            {/* left content */}
            <div className='debate-topic-meta-data-left-content'>
              {/* topic name */}
              <p className='debate-topic-topic-name'>{topicData.topicName}</p>
              {/* topic tag */}
              <p className='debate-topic-label'>แท็กที่เกี่ยวข้อง:</p>

              <div className='debate-topic-tag-container'>
                <TopicTag tagName="เทคโนโลยี"/>
                <TopicTag tagName="เซมิคอนดัคเตอร์"/>
                

              </div>
              {/* topic creator row */}
              <label className='debate-topic-label'>สร้างโดย: </label>
              <a className='debate-topic-topic-creator-link'>{topicData.topicCreator}</a>
            </div>
            {/* right content */}
            <div className="debate-topic-meta-data-right-content">
              <p className='debate-topic-topic-description'>คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย คำอธิบาย</p>
              
            </div>
            
            {/* drop down button */}
            <div className="debate-topic-option-dropdown">
              <button className="debate-topic-option-vert-button" onClick={dropDownClick}>
                <img className='debate-topic-option-image' src={optionButtonIcon} alt="" />
              </button>
              <div id="myDropdown" class="debate-topic-dropdown-content">
                <a href="#">เพิ่มเข้ารายการชื่นชอบ</a>
                <a href="#">เพิ่มเข้ารายการดาวน์โหลด</a>
                <a href="#">แก้ไขประเด็นโต้แย้ง</a>
                <a href="#">แก้ไขประเด็นโต้แย้ง</a>
              </div>
            </div>

          </div>
          {/* end of meta data part */}

          {/* topic content part */}
          <div className="debate-topic-two-side-container">
            {/* left contaienr */}
            <div className="debate-topic-side-box">
              <div className="debate-topic-side-content-container">
                <p className='debate-topic-side-stance-title'>
                  ฝั่งที่เห็นด้วย
                </p>
                
              </div>
            </div>
            
          </div>
        </div>
    </>
  )
}

export default DebateTopic
import React, {useState, useEffect, useRef} from 'react';
import './DebateTopic.css'
import UserNavbar from '../../components/Navbar/UserNavBar'
import TopicTag from '../../components/TopicTag'
import optionButtonIcon from '../../assets/icon/more-vertical.png'
import userImg from '../../assets/profile.png'
import CommentComponent from '../../components/CommentComponent'


function DebateTopic() {
  const [open, setOpen] = useState(false);

  const topicData = {
    topicName: "รถพลังงานไฟฟ้าจะมาแทนที่แบบสันดาป",
    topicCreator: "User",
    topicDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident quos ad minima ut dolorum quae veritatis, aspernatur explicabo necessitatibus dicta dolore commodi laboriosam beatae quo totam? Atque beatae dignissimos distinctio."
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
              <p className='debate-topic-topic-description'>{topicData.topicDescription}</p>
              
            </div>
            
            {/* drop down button */}
            <div className="debate-topic-option-dropdown">
              <div className="debate-topic-option-vert-button" onClick={()=>{setOpen(!open)}}>
                <img className='debate-topic-option-image' src={optionButtonIcon} alt="" />
              </div>
              <div id="myDropdown" class={`debate-topic-dropdown-content ${open? "active": "inactive"}`}>
                <button>เพิ่มเข้ารายการชื่นชอบ</button>
                <button>เพิ่มเข้ารายการดาวน์โหลด</button>
                <button>แก้ไขประเด็นโต้แย้ง</button>
                <button>ลบประเด็นโต้แย้ง</button>
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
                <div className="debate-topic-comment-scroll-box">
                <CommentComponent/>
                <CommentComponent/>
                <CommentComponent/>

                  
                </div>
                <button className='debate-topic-agree-button'>แสดงความคิดเห็นเพื่อเห็นด้วย</button>
                
              </div>
            </div>
            
            {/* right contaienr */}
            <div className="debate-topic-side-box">
              <div className="debate-topic-side-content-container">
                <p className='debate-topic-side-stance-title'>
                  ฝั่งที่ไม่เห็นด้วย
                </p>
                <div className="debate-topic-comment-scroll-box">
                  <CommentComponent/>


                </div>
                <button className='debate-topic-disagree-button'>แสดงความคิดเห็นเพื่อไม่เห็นด้วย</button>
                
              </div>
            </div>
          </div>
        </div>
    </>
  )
}



export default DebateTopic
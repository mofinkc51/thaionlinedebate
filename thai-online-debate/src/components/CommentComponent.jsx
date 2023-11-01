import React, { useEffect, useState } from 'react'
import userImg from '../assets/profile.png'
import './CommentComponent.css'
import optionButton from '../assets/icon/more-vertical.png'
function CommentComponent(props) {

  const [isHovered, setIsHovered] = useState(false);

  const [isOptionClicked, setIsOptionClicked] = useState(false);

    
    
    const commentData = {
        comment: props.comment,
        userImg: userImg,
        timestamp: props.timestamp,
      };
      const [dateAndTime, setdateAndTime] = useState({
        date: '',
        time: '',
      });
      
      const convertTimestamp = (timestamp) => {
        const dateObj = new Date(timestamp);
        const dbc_date = dateObj.toISOString().split('T')[0];
        const dbc_time = dateObj.toTimeString().split(' ')[0];
      
        setdateAndTime({ date: dbc_date, time: dbc_time });
      };
      
      useEffect(() => {
        convertTimestamp(commentData.timestamp);
      }, []);
      
  return (
    <>
        <div className="comment-component">
            
            <div className="debate-topic-comment-content">
                <img className='debate-topic-comment-user-img' src={commentData.userImg} alt="" />
                <div className="debate-topic-comment-text">{commentData.comment}</div>
            </div>
            <div className='comment-action-row'>
                <button className='comment-like-button'>ถูกใจ</button>
                <button className='comment-reply-button'>ตอบกลับ</button>
                {/* <p className='comment-timestamp'>{dateAndTime.date}</p> */}
                <p className='comment-timestamp' onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
                  {isHovered ? dateAndTime.time : dateAndTime.date}
                </p>
                
            </div>
            <button className='comment-option-button' onClick={()=>setIsOptionClicked(!isOptionClicked)}><img src={optionButton} alt="" /></button>
            <div class={`comment-dropdown-content ${isOptionClicked? "active": "inactive"}`}>
                <button>แก้ไข</button>
                <button>ลบ</button>
                

            </div>
        </div>
        
    </>
  )
}

export default CommentComponent
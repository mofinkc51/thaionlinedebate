import React, { useEffect, useState } from 'react'
import userImg from '../assets/profile.png'
import './CommentComponent.css'
function CommentComponent(props) {
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
                <p className='comment-timestamp'>{dateAndTime.date}</p>
            </div>
        </div>
        
    </>
  )
}

export default CommentComponent
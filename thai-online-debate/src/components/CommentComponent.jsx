import React from 'react'
import userImg from '../assets/profile.png'
import './CommentComponent.css'
function CommentComponent() {
    const commentData = {
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quos ad minima ut dolorum quae veritatis, aspernatur explicabo necessitatibus dicta dolore commodi laboriosam beatae quo totam? Atque beatae dignissimos distinctio.",
        userImg: userImg,
        timestamp: "13:00",
    }
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
                <p className='comment-timestamp'>{commentData.timestamp}</p>
            </div>
        </div>
        
    </>
  )
}

export default CommentComponent
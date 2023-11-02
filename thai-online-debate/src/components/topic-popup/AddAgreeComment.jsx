import React, { useState } from 'react'
import './AddComment.css'
import closeButtonIcon from '../../assets/icon/close.png'
import { makeRequest } from '../../axios';

function AddAgreeComment(props) {
    
    const topicId = window.location.pathname.split("/").pop();
    const [dataComment, setDataComment] = useState({
        dbc_comment: "",
        dbc_total_like: 0,
        dbc_stance: 0,
        dbt_id: topicId
    });
    const handleChange = (e) => {
        setDataComment((prev)=>({ ...prev, [e.target.name]:e.target.value}));
    };
  const {onCloseClick} = props;

  const addCommentAgree = async (e) => {
    e.preventDefault();
    try {
        await makeRequest.post('/comments/', dataComment)
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
  }
    
  return (
    <>
        <div className="add-comment-bg-opacity">
            <div className="add-comment-popup-box">
                <div className="add-comment-popup-container">
                    <h2>เพิ่มข้อความโต้แย้งฝั่งเห็นด้วย</h2>
                    <form onSubmit={addCommentAgree}>
                        <label htmlFor='comment-input'></label>
                        <textarea className="add-comment-popup-input" name="dbc_comment" 
                        onChange={handleChange} 
                        id="comment-input" cols="30" 
                        required

                        ></textarea>
                        <div className="add-comment-button-container">
                            <button className="add-comment-popup-button"
                            
                            >เพิ่ม</button>

                        </div>
                    </form>
                    <div className="add-comment-close-button-box">
                        <button className='add-comment-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt=""/></button>

                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default AddAgreeComment
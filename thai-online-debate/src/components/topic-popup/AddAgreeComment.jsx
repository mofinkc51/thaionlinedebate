import React from 'react'
import './AddComment.css'
import closeButtonIcon from '../../assets/icon/close.png'


function AddAgreeComment(props) {

  const {onCloseClick} = props;
    
  return (
    <>
        <div className="add-comment-bg-opacity">
            <div className="add-comment-popup-box">
                <div className="add-comment-popup-container">
                    <h2>เพิ่มข้อความโต้แย้งฝั่งเห็นด้วย</h2>
                    <form action="">
                        <label htmlFor='comment-input'></label>
                        <textarea className="add-comment-popup-input" name="comment-input" id="comment-input" cols="30" ></textarea>
                        <div className="add-comment-button-container">
                            <button className="add-comment-popup-button">เพิ่ม</button>

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
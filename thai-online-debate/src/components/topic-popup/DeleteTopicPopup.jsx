import React from 'react'
import './DeleteTopicPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'


function DeleteTopicPopup(props) {

    const {onCloseClick} = props;
  return (
    <>
        <div className="delete-topic-bg-opacity">
            <div className="delete-topic-popup-box">
                <button className='delete-topic-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt="" /></button>

                <div className="delete-topic-popup-container">
                    <h3 className='delete-topic-popup-title'>ยืนยันการลบประเด็นโต้แย้ง</h3>
                    {/* button row */}
                    <div className="delete-topic-button-row">
                        <button className='delete-topic-confirm-button'>ยืนยัน</button>
                        <button className='delete-topic-cancel-button' onClick={onCloseClick}>ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DeleteTopicPopup
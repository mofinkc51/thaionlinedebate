import React from 'react'
import './EditTopicPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'

function EditTopicPopup(props) {
    const {onCloseClick} = props;
  return (
    <>
        <div className='edit-topic-bg-opacity'>
            <div className="edit-topic-popup-box">
            <div className="edit-topic-popup-box-container">
                <form action="">
                    {/* Topic title row */}
                    <div className="edit-topic-title-row">
                        <h2>แก้ไขข้อมูลประเด็นโต้แย้ง</h2>
                        <button className='edit-topic-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt="" /></button>
                    </div>
                    {/* Topic name row */}
                    <div className="edit-topic-popup-topicname-row">
                        <label className='edit-topic-popup-label'>หัวข้อประเด็นโต้แย้ง</label>
                        <input type="text" className='edit-topic-popup-topicname-input'/>
                    </div>
                    {/* Topic desc row */}
                    <div className="edit-topic-popup-topicdesc-row">
                        <label className='edit-topic-popup-label'>คำอธิบายประเด็นโต้แย้ง</label>
                        <textarea className="edit-topic-popup-topicdesc-input" name="" id="" cols="30" rows="5"></textarea> 
                    </div>
                    {/* Stance row */}
                    <div className="edit-topic-stance-row">
                        {/* Stance one */}
                        <div className="edit-topic-stance">
                            <label className='edit-topic-popup-label'>ฝั่งที่ 1</label>
                            <input type="text" className='edit-topic-popup-stance-input'/>
                        </div>
                        {/* Stance two */}
                        <div className="edit-topic-stance">
                            <label className='edit-topic-popup-label'>ฝั่งที่ 2</label>
                            <input type="text" className='edit-topic-popup-stance-input'/>
                        </div>

                    </div>
                    {/* tag row */}
                    <div className="edit-topic-tag-row">
                        <label className='edit-topic-popup-label'>แท็กที่เกี่ยวข้อง</label>
                        <div className="edit-topic-tag-box">

                        </div>
                    </div>

                    {/* button row */}
                    <div className="edit-topic-button-row">
                        <button className='edit-topic-confirm-button'>ยืนยัน</button>
                        <button className='edit-topic-cancel-button' onClick={onCloseClick}>ยกเลิก</button>
                    </div>
                </form>
                    
                    
                    
                </div>

            </div>
            
        </div>
    </>
  )
}

export default EditTopicPopup
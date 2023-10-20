import React from 'react'
import './CreateActivityPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'

function CreateActivityPopup() {
  return (
    <>
       <div className='create-activity-bg-opacity'>
            <div className="create-activity-popup-box">
            <div className="create-activity-popup-box-container">
                <form action="">
                    {/* Topic title row */}
                    <div className="create-activity-title-row">
                        <h2>สร้างกิจกรรมโต้แย้ง</h2>
                        <button className='create-activity-close-button'><img src={closeButtonIcon} alt="" /></button>
                    </div>
                    {/* Topic name row */}
                    <div className="create-activity-popup-topicname-row">
                        <label className='create-activity-popup-label'>หัวข้อกิจกรรมโต้แย้ง</label>
                        <input type="text" className='create-activity-popup-topicname-input'/>
                    </div>
                    {/* Topic desc row */}
                    <div className="create-activity-popup-topicdesc-row">
                        <label className='create-activity-popup-label'>คำอธิบายกิจกรรมโต้แย้ง</label>
                        <textarea className="create-activity-popup-topicdesc-input" name="" id="" cols="30" rows="5"></textarea> 
                    </div>
                    {/* date row */}
                    <div className="create-activity-stance-row">
                        {/* start date */}
                        <div className="create-activity-stance">
                            <label className='create-activity-popup-label'>วันเริ่มต้นกิจกรรม</label>
                            <input type="datetime-local" className='create-activity-popup-start-date'/>
                        </div>
                        {/* end date */}
                        <div className="create-activity-stance">
                            <label className='create-activity-popup-label'>วันสิ้นสุดกิจกรรม</label>
                            <input type="datetime-local" className='create-activity-popup-end-date'/>
                        </div>

                    </div>

                    {/* Stance row */}
                    <div className="create-activity-stance-row">
                        {/* Stance one */}
                        <div className="create-activity-stance">
                            <label className='create-activity-popup-label'>ฝั่งที่ 1</label>
                            <input type="text" className='create-activity-popup-stance-input'/>
                        </div>
                        {/* Stance two */}
                        <div className="create-activity-stance">
                            <label className='create-activity-popup-label'>ฝั่งที่ 2</label>
                            <input type="text" className='create-activity-popup-stance-input'/>
                        </div>

                    </div>
                    {/* tag row */}
                    <div className="create-activity-tag-row">
                        <label className='create-activity-popup-label'>แท็กที่เกี่ยวข้อง</label>
                        <div className="create-activity-tag-box">

                        </div>
                    </div>

                    {/* button row */}
                    <div className="create-activity-button-row">
                        <button className='create-activity-confirm-button'>สร้าง</button>
                        {/* <button className='create-activity-cancel-button'>ยกเลิก</button> */}
                    </div>
                </form>
                    
                    
                    
                </div>

            </div>
            
        </div>
    </>
  )
}

export default CreateActivityPopup
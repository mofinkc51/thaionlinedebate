import React from 'react'
import './CreatePopup.css'
function CreatePopup() {
  return (
    <div className='bg-popup'>
        <div className='popup-box'>
            <div className='body-box'>
                
                <div className='head-row'>
                    
                    <h2>ข้อมูลประเด็นโต้แย้ง</h2>
                    <button className='close-button'>x</button>
                </div>
                <div>
                    <p className='input-label'>หัวข้อประเด็นโต้แย้ง</p>
                    <input className='topic-input'></input>
                    <p className='input-label'>คำอธิบายประเด็นโต้แย้ง</p>
                    <textarea className="des-input" name="" id="" cols="30" rows="5"></textarea> 
                </div>
                <div className='side-box'>
                    <div>
                        <p className='input-label'>ฝั่งที่ 1</p>
                        <input className='side-input'></input>
                    </div>
                    <div>
                        <p className='input-label'>ฝั่งที่ 2</p>
                        <input className='side-input'></input>
                    </div>
                </div>
                <div className='button-box'>
                    <button className='create-button'>สร้าง</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default CreatePopup
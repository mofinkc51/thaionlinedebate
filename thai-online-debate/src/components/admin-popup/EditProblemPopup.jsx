import React from 'react'
import closeButtonIcon from '../../assets/icon/close.png'
import './EditProblemPopup.css'
function EditProblemPopup() {
  return (
    <>
        <div className='edit-problem-bg-opacity'>
            <div className="edit-problem-popup-box">
            <div className="edit-problem-popup-box-container">
                <form action="">
                    {/* Topic title row */}
                    <div className="edit-problem-title-row">
                        <h2>ดำเนินการแก้ไขปัญหาเสร็จสิ้น</h2>
                        <button className='edit-problem-close-button'><img src={closeButtonIcon} alt="" /></button>
                    </div>
                    {/* Topic desc row */}
                    <div className="edit-problem-popup-problemdesc-row">
                        <label className='edit-problem-popup-label'>รายละเอียดปัญหา</label>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, repellat. </p>
                    </div>
                    
                    {/* Topic desc row */}
                    <div className="edit-problem-popup-problemdesc-row">
                        <label className='edit-problem-popup-label'>รายละเอียดการดำเนินการแก้ไขปัญหา</label>
                        <textarea className="edit-problem-popup-problemdesc-input" name="" id="" cols="30" rows="5"></textarea> 
                    </div>

                    {/* button row */}
                    <div className="edit-problem-button-row">
                        <button className='edit-problem-confirm-button'>ยืนยัน</button>
                        <button className='edit-problem-cancel-button'>ยกเลิก</button>
                    </div>
                </form>
                    
                    
                    
                </div>

            </div>
            
        </div>
    </>
  )
}

export default EditProblemPopup
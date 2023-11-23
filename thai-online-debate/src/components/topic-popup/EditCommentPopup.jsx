import React, { useState } from 'react';
import './EditCommentPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'
import { makeRequest } from '../../axios';
import { text_validation } from '../../checked';
import Swal from 'sweetalert2';

function EditCommentPopup(props) {
    const [commentData, setCommentData] = useState({
        dbc_id : props.data.dbc_id,
        dbc_comment : props.data.dbc_comment
    })
    const handleChange = (e) => {
        setCommentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text_validation(commentData.dbc_comment,3,150)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ข้อความโต้แย้งต้องมีความยาวอย่างน้อย '+ 3 +' ตัวอักษรและไม่เกิน '+150+' ตัวอักษร'
            });
            return document.getElementsByName('dbc_comment')[0].focus();
        } try {
            await makeRequest.put(`/comments/edit/${commentData.dbc_id}`, commentData)
            Swal.fire({
                icon: 'success',
                title: 'แก้ไขคอมเมนต์สําเร็จ',
            }).then(() => {
                window.location.reload();
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: err.response.data,
            })
        }
    };
  return (
    <>
    <div className="edit-comment-bg-opacity">
        <div className="edit-comment-popup-box">
            <div className="edit-comment-popup-box-container">
                {/* request title row */}
                <div className="edit-comment-title-row">
                    <h2>แก้ไขข้อความโต้แย้ง</h2>
                    <button className='edit-comment-close-button' onClick={props.onCloseClick}><img src={closeButtonIcon} alt="" /></button>
                </div>
                {/* request desc row */}
                <div className="edit-comment-popup-topicdesc-row">
                    <label className='edit-comment-popup-label'>ข้อความโต้แย้ง</label>
                    <textarea className="edit-comment-popup-topicdesc-input" 
                    name="dbc_comment" id="" cols="30" rows="5"
                    value={commentData.dbc_comment} onChange={handleChange}
                    ></textarea> 
                </div>

                {/* button row */}
                <div className="edit-comment-button-row">
                    <button className='edit-comment-confirm-button'onClick={handleSubmit}>ยืนยัน</button>
                    <button className='edit-comment-cancel-button' onClick={props.onCloseClick}>ยกเลิก</button>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default EditCommentPopup
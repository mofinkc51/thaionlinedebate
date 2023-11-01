import React, { useState } from 'react';
import './EditTopicPopup.css';
import closeButtonIcon from '../../assets/icon/close.png';
import { text_validation } from '../../checked';
import Swal from 'sweetalert2';
import { makeRequest } from '../../axios';
function EditTopicPopup(props) {
    const [topicData, setTopicData] = useState({
        dbt_title: props.data.dbt_title,
        dbt_description: props.data.dbt_description,
        dbt_agree: props.data.dbt_agree,
        dbt_disagree: props.data.dbt_disagree,
        dbt_id: props.data.dbt_id
    });
    const handleChange = (e) => {
        setTopicData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(topicData);
        if (!text_validation(topicData.dbt_title,3,50)){
            return document.getElementsByName('dbt_title')[0].focus();
        }
        if (!text_validation(topicData.dbt_description,10,500)){
            return document.getElementsByName('dbt_description')[0].focus();
        } try {
            await makeRequest.put(`/posts/edit/${topicData.dbt_id}`, topicData)
            Swal.fire({
                icon: 'success',
                title: 'แก้ไขข้อมูลสําเร็จ',
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
        <div className='edit-topic-bg-opacity'>
            <div className="edit-topic-popup-box">
            <div className="edit-topic-popup-box-container">
                <form onSubmit={handleSubmit}>
                    {/* Topic title row */}
                    <div className="edit-topic-title-row">
                        <h2>แก้ไขข้อมูลประเด็นโต้แย้ง</h2>
                        <button className='edit-topic-close-button' onClick={props.onCloseClick}><img src={closeButtonIcon} alt="" /></button>
                    </div>
                    {/* Topic name row */}
                    <div className="edit-topic-popup-topicname-row">
                        <label className='edit-topic-popup-label'>หัวข้อประเด็นโต้แย้ง</label>
                        <input type="text" className='edit-topic-popup-topicname-input'
                        name="dbt_title"
                        value={topicData.dbt_title} onChange={handleChange} required
                        />
                    </div>
                    {/* Topic desc row */}
                    <div className="edit-topic-popup-topicdesc-row">
                        <label className='edit-topic-popup-label'>คำอธิบายประเด็นโต้แย้ง</label>
                        <textarea className="edit-topic-popup-topicdesc-input" 
                        name="dbt_description" id="" cols="30" rows="5" 
                        value={topicData.dbt_description} onChange={handleChange} required
                        >
                        </textarea> 
                    </div>
                    {/* Stance row */}
                    <div className="edit-topic-stance-row">
                        {/* Stance one */}
                        <div className="edit-topic-stance">
                            <label className='edit-topic-popup-label'>ฝั่งที่ 1</label>
                            <input type="text" 
                            className='edit-topic-popup-stance-input' name='dbt_agree'
                            value={topicData.dbt_agree} onChange={handleChange} required
                            />
                        </div>
                        {/* Stance two */}
                        <div className="edit-topic-stance">
                            <label className='edit-topic-popup-label'>ฝั่งที่ 2</label>
                            <input type="text" 
                            className='edit-topic-popup-stance-input' name='dbt_disagree'
                            value={topicData.dbt_disagree} onChange={handleChange} required
                            />
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
                        <button className='edit-topic-cancel-button' onClick={props.onCloseClick}>ยกเลิก</button>
                    </div>
                </form>
                    
                    
                    
                </div>

            </div>
            
        </div>
    </>
  )
}

export default EditTopicPopup
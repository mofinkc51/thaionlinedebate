import React, { useState , useRef } from 'react';
import './EditTopicPopup.css';
import closeButtonIcon from '../../assets/icon/close.png';
import { text_validation } from '../../checked';
import Swal from 'sweetalert2';
import { makeRequest } from '../../axios';
import InputTag from '../input-tag/InputTag';
function EditTopicPopup(props) {
    // search tag part

    const items = [
        
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = searchTerm
        ? items.filter((item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    // Get a maximum of 5 items
    const displayedItems = filteredItems.slice(0, 5);

    // end search tag part

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

    const titleInputRef = useRef(null);
    const descInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(topicData);
        if (!text_validation(topicData.dbt_title,8,50)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'หัวข้อประเด็นโต้แย้งต้องมีความยาวอย่างน้อย '+ 8 +' ตัวอักษรและไม่เกิน '+50+' ตัวอักษร'
            }).then(() => {
                titleInputRef.current.focus();
            });
            return;
        }
        if (!text_validation(topicData.dbt_description,10,500)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'คำอธิบายประเด็นโต้แย้งต้องมีความยาวอย่างน้อย '+ 10 +' ตัวอักษรและไม่เกิน '+500+' ตัวอักษร'
            }).then(() => {
                descInputRef.current.focus();
            });
            return;
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
                        ref={titleInputRef}
                        />
                    </div>
                    {/* Topic desc row */}
                    <div className="edit-topic-popup-topicdesc-row">
                        <label className='edit-topic-popup-label'>คำอธิบายประเด็นโต้แย้ง</label>
                        <textarea className="edit-topic-popup-topicdesc-input" 
                        name="dbt_description" id="" cols="30" rows="5" 
                        value={topicData.dbt_description} onChange={handleChange} required
                        ref={descInputRef}
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
                    {/* <div className="create-topic-tag-row">
                            <p className='create-topic-popup-label'>แท็กที่เกี่ยวข้อง</p>
                            <div className="input-tag-container">
                                <InputTag tagNames="hello world"/>
                                <InputTag tagNames="tag test"/>
                                <InputTag tagNames="tag"/>
                                <InputTag tagNames="test test test"/>
                                <InputTag tagNames="tag test"/>

                            </div>
                    </div> */}

                    {/* tag search row */}
                    {/* <div className="edit-topic-search-tag-row">
                            <p className='edit-topic-popup-label'>ค้นหาแท็ก</p>
                            
                            <input
                                type="text"
                                placeholder=""
                                className='create-topic-popup-tagsearch-input'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className='tag-choice-drop-down'>
                                {displayedItems.length === 0 && searchTerm ? (
                                    <div className="tag-choice-row">
                                        <p>ไม่พบแท็กที่ค้นหา</p>
                                    </div>
                                ) : (
                                    displayedItems.map((item, index) => 
                                    <div className='tag-choice-row'>
                                        <div className="tag-choice-row-container">
                                            <input type="checkbox" id="" name="" value=""/>
                                            <label for="vehicle1" key={index}>{item}</label><br></br>
                                        </div>

                                        
                                    </div>
                                        
                                    )
                                )}
                            </div>
                                
                        </div> */}

                    {/* button row */}
                    <div className="edit-topic-button-row">
                        <button type="submit" className='edit-topic-confirm-button'>ยืนยัน</button>
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
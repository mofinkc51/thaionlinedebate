import React, { useState } from 'react'
import './CreateTopicPopup.css'
import closeButtonIcon from '../assets/icon/close.png'
import UserNavbar, { createTopicForm } from '../components/Navbar/UserNavBar'
import { makeRequest } from '../axios';
import Swal from 'sweetalert2';
import InputTag from './input-tag/InputTag';


function CreateTopicPopup() {
    // search tag part

    const items = [
        'การเมือง',
        'การเมืองไทย',
        'เที่ยวไทย',
        'เที่ยวต่างประเทศ',
        'เศรษฐกิจ',
        'เที่ยว JAPAN',
        'เที่ยว KOREA',
        'เที่ยว USA',
        'เที่ยว EUROPE',
        'เที่ยว CHINA'

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


    const [err, SetErr] = useState(null);
    const [topic, setTopic] = useState({
        dbt_title: "",
        dbt_description: "",
        dbt_agree: "เห็นด้วย",
        dbt_disagree: "ไม่เห็นด้วย",
    });

    const handleChange = (e) => {
        setTopic((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log(topic);
    };
    
    const createTopic = async (e) => {
        e.preventDefault()
        console.log(topic);
        try {

            await makeRequest.post('/posts', topic)
            Swal.fire({
                icon: 'success',
                title: 'สร้างประเด็นโต้แย้งเรียบร้อย',
            })
            
        }   catch (err) {
            SetErr(err.response.data)
            Swal.fire({
                icon: 'error',
                title: err.response.data,
            })
        }
    }



  return (
    <>
    <div className="showcreate" style={{display: 'none'}} >
        <div className='topic-bg-opacity'>
            <div className="create-topic-popup-box">
                <div className="create-topic-popup-box-container">
                    {/* Topic title row */}
                    <div className="create-topic-title-row">
                        <h2>ข้อมูลประเด็นโต้แย้ง</h2>
                        <button className='create-topic-close-button'><img 
                        src={closeButtonIcon} alt="" onClick={createTopicForm} 
                        /></button>
                    </div>
                    {/* Topic name row */}
                    <form onSubmit={createTopic}>
                        <div className="create-topic-popup-topicname-row">
                            <p className='create-topic-popup-label'>หัวข้อประเด็นโต้แย้ง</p>

                            <input type="text" className='create-topic-popup-topicname-input'
                            onChange={handleChange} name="dbt_title" required
                            />
                        
                        </div>
                        {/* Topic desc row */}
                        <div className="create-topic-popup-topicdesc-row">
                            <p className='create-topic-popup-label'>คำอธิบายประเด็นโต้แย้ง</p>
                            <textarea className="create-topic-popup-topicdesc-input" 
                            onChange={handleChange} required 
                            name="dbt_description" id="" cols="30" rows="5">
                                
                                
                            </textarea> 
                        </div>
                        {/* Stance row */}
                        <div className="create-topic-stance-row">
                            {/* Stance one */}
                            <div className="create-topic-stance">
                                <p className='create-topic-popup-label'>ฝั่งที่ 1</p>

                                <input type="text" className='create-topic-popup-stance-input'
                                onChange={handleChange} name="dbt_agree" value={topic.dbt_agree} required
                                />
                            
                            </div>
                            {/* Stance two */}
                            <div className="create-topic-stance">
                                <p className='create-topic-popup-label'>ฝั่งที่ 2</p>

                                <input type="text" className='create-topic-popup-stance-input'
                                onChange={handleChange} name="dbt_disagree" value={topic.dbt_disagree} required
                                />
                            
                            </div>

                        </div>
                        {/* tag row */}
                        <div className="create-topic-tag-row">
                            <p className='create-topic-popup-label'>แท็กที่เกี่ยวข้อง</p>
                            <div className="input-tag-container">
                                {/* display selected tag here */}
                                <InputTag tagNames="hello world"/>
                                <InputTag tagNames="tag test"/>
                                <InputTag tagNames="tag"/>
                                <InputTag tagNames="test test test"/>
                                <InputTag tagNames="tag test"/>

                            </div>
                        </div>

                        {/* tag search row */}
                        <div className="create-topic-search-tag-row">
                            <p className='create-topic-popup-label'>ค้นหาแท็ก</p>
                            {/* <input type="text" className='create-topic-popup-tagsearch-input' onChange={handleChange}
                                /> */}
                            {/* <input
                                type="text"
                                placeholder="Search"
                                className='create-topic-popup-tagsearch-input'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <ul>
                                {filteredItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul> */}
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
                                        <div className="tag-choice-row-container">{/* <p key={index}>{item}</p> */}
                                            <input type="checkbox" id="" name="" value=""/>
                                            <label for="vehicle1" key={index}>{item}</label><br></br>
                                        </div>

                                        
                                    </div>
                                        
                                    )
                                )}
                            </div>
                                
                        </div>

                        {/* button row */}
                        <div className="create-topic-button-row">
                            <button className='create-topic-button'>สร้าง</button>

                        </div>
                    </form>
                    
                </div>

            </div>

        </div>
    </div>
    </>
  )
}

export default CreateTopicPopup
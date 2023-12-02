import React, { useState , useRef, useEffect } from 'react';
import './EditTopicPopup.css';
import closeButtonIcon from '../../assets/icon/close.png';
import { text_validation } from '../../checked';
import Swal from 'sweetalert2';
import { makeRequest } from '../../axios';
import InputTag from '../input-tag/InputTag';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function EditTopicPopup(props) {
    // search tag part
    const [items, setItems ]= useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const {tag} = props;
    const filteredItems = searchTerm
        ? items.filter((item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    // Get a maximum of 5 items
    const displayedItems = filteredItems.slice(0, 5);
    console.log(props)
    // end search tag parttopic
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
        e.preventDefault()
        setTopicData({ ...topicData, tags: tags })
        if (!text_validation(topicData.dbt_title,8,50)){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: ("หัวข้อประเด็นโต้แย้งต้องมีความยาวระหว่าง " + 8 + " ถึง " + 50)
              }).then(() => {
                  document.getElementsByName('dbt_title')[0].focus()
              })
        }
        if (!text_validation(topicData.dbt_description,10,500)){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: ("คำอธิบายประเด็นโต้แย้งต้องมีความยาวระหว่าง " + 10 + " ถึง " + 500)
              }).then(() => {
                 document.getElementsByName('dbt_description')[0].focus();
              })
        } 
        if (!text_validation(topicData.dbt_agree,3,40)){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: ("ฝั่งที่ 1 ควรมีความยาวระหว่าง " + 3 + " ถึง " + 40 + " เช่น เห็นด้วย")
              }).then(() => {
                 document.getElementsByName('dbt_agree')[0].focus();
              })
        } 
        if (!text_validation(topicData.dbt_disagree,3,40)){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: ("ฝั่งที่ 2 ควรมีความยาวระหว่าง " + 3 + " ถึง " + 40 + " เช่น ไม่เห็นด้วย")
              }).then(() => {
                 document.getElementsByName('dbt_disagree')[0].focus();
              })
        }
        if (tags.length === 0 || tags.length > 5) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "กรุณาเลือกแท็ก 1 - 5 แท็ก"
              })
        }
        try {
            console.log("before put", topicData);
            await makeRequest.put(`posts/edit/${topicData.dbt_id}`, topicData);
            Swal.fire({
                icon: 'success',
                title: 'สร้างประเด็นโต้แย้งเรียบร้อย',
            }).then(() => {
                window.location.reload()
            })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: err.response.data,
            })
        }
    };
    const [tagsuggest, setTagseggest] = useState([]);

    // เริ่มต้น tags state โดยใช้ function ที่คำนวณค่าจาก props ครั้งเดียว
    const [tags, setTags] = useState(() => props.tag.map(t => t.tag_title));

    const handleTagClick = (tag) => {
        if (tags.includes(tag)) {
            // ลบ tag when includes
            setTags(tags.filter(t => t !== tag));
        } else if (tags.length >= 5) {
            // จำกัดจำนวนแท็กที่เลือกได้
            Swal.fire({
                icon: 'info',
                text: "คุณสามารถเลือกแท็กได้ไม่เกิน 5 แท็ก"
            });
        } else {
            // เพิ่มแท็กใหม่
            setTags([...tags, tag]);
        }
    };
    useEffect(() => {
        setTopicData(currentTopic => ({ ...currentTopic, tags }));
    }, [tags]);
    
    //useEffect for get tagsuggest
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://api.aiforthai.in.th/tagsuggestion',
                    `text=${topicData.dbt_title}&numtag=10`,
                    {
                        headers: {
                            'Apikey': 'OKXVty86JM5w4g7ve9EyJfEfEXVArVHE',
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }
                );

                const responseData = response.data;
                if (responseData && responseData.tags) {
                    const tagArray = responseData.tags.map(tag => tag.tag);
                    setTagseggest(tagArray);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const delay = setTimeout(() => {
            fetchData();
        }, 2000); // การเรียก fetchData 2 วินาที

        return () => clearTimeout(delay); // เมื่อ component unmount ให้ล้าง timeout
    }, [topicData.dbt_title]);

    useEffect(() => {
        getAllTag();
      }, []);

      const getAllTag = async () => {
        try {
          const res = await makeRequest.get("/posts/alltag");
          const tagTitles = res.data.map((row) => row.tag_title);
          setItems(tagTitles);
        } catch (err) {
          console.log(err);
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
                            className='edit-topic-popup-stance-input' 
                            name='dbt_agree'
                            value={topicData.dbt_agree} onChange={handleChange} required
                            />
                        </div>
                        {/* Stance two */}
                        <div className="edit-topic-stance">
                            <label className='edit-topic-popup-label'>ฝั่งที่ 2</label>
                            <input type="text" 
                            className='edit-topic-popup-stance-input' 
                            name='dbt_disagree'
                            value={topicData.dbt_disagree} onChange={handleChange} required
                            />
                        </div>

                    </div>
                    {/* แท็กที่เลือก */}
                    <div className="create-topic-tag-row">
                            <p className='create-topic-popup-label'>แท็กที่เลือก
                            <span className="tooltip-icon" title="">?</span>
                            </p>
                            <div className="input-tag-container">
                            {tags.length === 0  ? (
                                        <div className="input-tag-caution">
                                            <p>กรุณาเลือกแท็ก 1 - 5 แท็ก</p>
                                        </div>
                                ) : (
                                tags.map((tag) => (
                                    <InputTag tagNames={tag} onClick={() => handleTagClick(tag)}/>
                                ))
                            )}
                            </div>
                        </div>
                        {/* tag row */}
                        <div className="create-topic-tag-row">
                            <p className='create-topic-popup-label'>แท็กที่เกี่ยวข้อง 
                                <span className="tooltip-icon" title="เมื่อผู้ใช้ทำการกรอกหัวข้อประเด็นโต้แย้ง ระบบจะแนะนำแท็กที่เกี่ยวข้องกับประเด็นโต้แย้ง">?</span>
                            </p>
                            <div className="input-tag-container">
                                {tagsuggest.map((tag) => (
                                    <button 
                                    type="button"
                                    className={`tag-button ${tags.includes(tag) ? 'active' : ''}`} 
                                    onClick={() => handleTagClick(tag)}
                                    >
                                    {tag}
                                    </button>
                                ))
                            }
                            </div>
                        </div>

                        {/* tag search row */}
                        <div className="create-topic-search-tag-row">
                            <p className='create-topic-popup-label'>ค้นหาแท็ก</p>
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
                                    displayedItems.map((tag, index) => 
                                    <div className='tag-choice-row' key={index}>
                                      <div className="tag-choice-row-container">
                                        <input 
                                          type="checkbox" 
                                          id={`checkbox-${index}`} 
                                          name={tag} 
                                          value={tag}
                                          checked={tags.includes(tag)}
                                          onChange={() => handleTagClick(tag)}
                                        />
                                        <label htmlFor={`checkbox-${index}`}>{tag}</label><br/>
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                                
                        </div>
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
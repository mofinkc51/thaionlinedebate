import React, { useEffect, useRef, useState } from 'react'
import './CreateTopicPopup.css'
import closeButtonIcon from '../assets/icon/close.png'
import UserNavbar, { createTopicForm } from '../components/Navbar/UserNavBar'
import { makeRequest } from '../axios';
import Swal from 'sweetalert2';
import InputTag from './input-tag/InputTag';
import { useNavigate } from 'react-router-dom';
import { text_validation } from '../checked';
import axios from 'axios';

function CreateTopicPopup() {
    // search tag part
    const [items, setItems ]= useState([]);
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
    const [topic, setTopic] = useState(
        JSON.parse(localStorage.getItem("topic")) ||
        {
            dbt_title: "",
            dbt_description: "",
            dbt_agree: "เห็นด้วย",
            dbt_disagree: "ไม่เห็นด้วย",
        }
    );
    const getAllTag = async () => {
        try {
            const res = await makeRequest.get('/posts/alltag');
            const tagTitles = res.data.map(row => row.tag_title);
            setItems(tagTitles);
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleChange = (e) => {
        setTopic((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate();

    const navigateTopic = async () => {
        try {
            const res = await makeRequest.get('/posts/last')
            navigate(`/topic/${res.data[0].dbt_id}`);
        }catch(err) {
            if (err.response.status === 401) {
                navigate('/signin');
            }
            console.log(err);
        }
    };
    const createTopic = async (e) => {
        e.preventDefault()
        setTopic({ ...topic, tags: tags })
        if (!text_validation(topic.dbt_title,8,50)){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: ("หัวข้อประเด็นโต้แย้งต้องมีความยาวระหว่าง " + 8 + " ถึง " + 50)
              }).then(() => {
                  document.getElementsByName('dbt_title')[0].focus()
              })
        }
        if (!text_validation(topic.dbt_description,10,500)){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: ("คำอธิบายประเด็นโต้แย้งต้องมีความยาวระหว่าง " + 10 + " ถึง " + 500)
              }).then(() => {
                 document.getElementsByName('dbt_description')[0].focus();
              })
        } 
        if (!text_validation(topic.dbt_agree,3,40)){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: ("ฝั่งที่ 1 ควรมีความยาวระหว่าง " + 3 + " ถึง " + 40 + " เช่น เห็นด้วย")
              }).then(() => {
                 document.getElementsByName('dbt_agree')[0].focus();
              })
        } 
        if (!text_validation(topic.dbt_disagree,3,40)){
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
            await makeRequest.post('/posts', topic)
            Swal.fire({
                icon: 'success',
                title: 'สร้างประเด็นโต้แย้งเรียบร้อย',
            }).then(() => {
                localStorage.removeItem("topic")
                localStorage.removeItem("tagsuggest")
                localStorage.removeItem("tags")
                navigateTopic();
            });
        } catch (err) {
            SetErr(err.response.data)
            Swal.fire({
                icon: 'error',
                title: err.response.data,
            })
        }
    };
    const title = useRef(null);
    const description = useRef(null);

    const [tagsuggest, setTagseggest] = useState(
        JSON.parse(localStorage.getItem("tagsuggest")) ||
        []);

        
        const [tags, setTags] = useState(
            JSON.parse(localStorage.getItem("tags")) ||
            []);
            const handleTagClick = (tag) => {
                
        if (tags.includes(tag)) {
            // ลบ tag when includes
            setTags(tags.filter(t => t !== tag));
        } else if (tags.length >= 5) {
            return Swal.fire({
                icon: 'info',
                text: "คุณสามารถเลือกแท็กได้ไม่เกิน 5 แท็ก"
            })
        } else {
            setTags([...tags, tag]);
        }
    };
    //useEffect for get tagsuggest
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://api.aiforthai.in.th/tagsuggestion',
                    `text=${topic.dbt_title}&numtag=10`,
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
    }, [topic.dbt_title]);
    //useEffect for set topic tag
    useEffect(() => {
        if (JSON.stringify(topic.tags) !== JSON.stringify(tags)) {
            setTopic(currentTopic => ({ ...currentTopic, tags }));
        }
    }, [tags]);
    //useEffect for set localStorage
    useEffect(() => {
        localStorage.setItem('topic', JSON.stringify(topic));
        localStorage.setItem('tags', JSON.stringify(tags));
        localStorage.setItem('tagsuggest', JSON.stringify(tagsuggest));
    },[topic,tags,tagsuggest]);
    //useEffect for get all tag
    useEffect(() => {
        getAllTag();
    },[])
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
                        src={closeButtonIcon} alt="กากบาท" onClick={createTopicForm} 
                        /></button>
                    </div>
                    {/* Topic name row */}
                    <form onSubmit={createTopic}>
                        <div className="create-topic-popup-topicname-row">
                            <p className='create-topic-popup-label'>หัวข้อประเด็นโต้แย้ง</p>
                            <input type="text" className='create-topic-popup-topicname-input'
                            onChange={handleChange} name="dbt_title" ref={title} 
                            value={topic.dbt_title}
                            required
                            />
                        
                        </div>
                        {/* Topic desc row */}
                        <div className="create-topic-popup-topicdesc-row">
                            <p className='create-topic-popup-label'>คำอธิบายประเด็นโต้แย้ง</p>
                            <textarea className="create-topic-popup-topicdesc-input" 
                            onChange={handleChange} ref={description} 
                            name="dbt_description" id="" cols="30" rows="5"
                            value={topic.dbt_description}
                            required 
                            >
                            </textarea> 
                        </div>
                        {/* Stance row */}
                        <div className="create-topic-stance-row">
                            {/* Stance one */}
                            <div className="create-topic-stance">
                                <p className='create-topic-popup-label'>
                                    ฝั่งที่ 1
                                    <span className="tooltip-icon" title="สามารถเปลี่ยน ฝั่งที่ 1 จาก เห็นด้วยเป็น อย่างอื่นเช่น น้ำปลาพริก">?</span>
                                </p>
                                <input type="text" className='create-topic-popup-stance-input'
                                onChange={handleChange} name="dbt_agree" value={topic.dbt_agree}
                                required
                                />
                            </div>
                            {/* Stance two */}
                            <div className="create-topic-stance">
                                <p className='create-topic-popup-label'>ฝั่งที่ 2</p>
                                <input type="text" className='create-topic-popup-stance-input'
                                onChange={handleChange} name="dbt_disagree" value={topic.dbt_disagree} 
                                required
                                />
                            </div>

                        </div>
                        {/* แท็กที่เลือก */}
                        <div className="create-topic-tag-row">
                            <p className='create-topic-popup-label'>แท็กที่เลือก</p>
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
                            <p className='create-topic-popup-label'>แท็กที่เกี่ยวข้อง</p>
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
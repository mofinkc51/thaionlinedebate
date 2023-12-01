import React, { useState, useEffect } from 'react';
import './CreateActivityPopup.css';
import closeButtonIcon from '../../assets/icon/close.png';
import axios from 'axios';

const CreateActivityPopup = ({ closePopup, onCreate }) => {
  const [formData, setFormData] = useState({
    topicName: '',
    topicDesc: '',
    startDate: '',
    endDate: '',
    stanceOne: '',
    stanceTwo: '',
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const userIdFromLocalStorage = userData ? userData.user_id : null;

    setUserId(userIdFromLocalStorage);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleCreate = async (e) => {
    try {
      e.preventDefault();
  
      if (!userId) {
        console.error('User ID not found in local storage.');
        return;
      }
  
      // เพิ่ม dbt_description เพื่อรับค่า topicDesc
      const dataToSend = { ...formData, userId, dbt_description: formData.topicDesc };
      const response = await axios.post('http://localhost:8800/api/admin/postactivity', dataToSend);
  
      console.log('Create activity response:', formData);
  
      // ทำการตรวจสอบค่า activities ที่ได้รับผ่านฟังก์ชันที่ส่งมาจาก AdminManageActivity
      if (onCreate) {
        onCreate(response.data);
      } else {
        console.error('onCreate function not provided.');
      }
  
      closePopup();
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };
  

  return (
    <>
      <div className='create-activity-bg-opacity'>
        <div className='create-activity-popup-box'>
          <div className='create-activity-popup-box-container'>
            <form action=''>
              <div className='create-activity-title-row'>
                <h2>สร้างกิจกรรมโต้แย้ง</h2>
                <button className='create-activity-close-button' onClick={closePopup}>
                  <img src={closeButtonIcon} alt='Close' />
                </button>
              </div>

              <div className='create-activity-popup-topicname-row'>
                <label className='create-activity-popup-label'>หัวข้อกิจกรรมโต้แย้ง</label>
                <input
                  type='text'
                  className='create-activity-popup-topicname-input'
                  name='topicName'
                  value={formData.topicName}
                  onChange={handleChange}
                />
              </div>

              <div className='create-activity-popup-topicdesc-row'>
                <label className='create-activity-popup-label'>คำอธิบายกิจกรรมโต้แย้ง</label>
                <textarea
                  className='create-activity-popup-topicdesc-input'
                  name='topicDesc'
                  value={formData.topicDesc}
                  onChange={handleChange}
                  cols='30'
                  rows='5'
                ></textarea>
              </div>

              <div className='create-activity-stance-row'>
                <div className='create-activity-stance'>
                  <label className='create-activity-popup-label'>วันเริ่มต้นกิจกรรม</label>
                  <input
                    type='datetime-local'
                    className='create-activity-popup-start-date'
                    name='startDate'
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className='create-activity-stance'>
                  <label className='create-activity-popup-label'>วันสิ้นสุดกิจกรรม</label>
                  <input
                    type='datetime-local'
                    className='create-activity-popup-end-date'
                    name='endDate'
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='create-activity-stance-row'>
                <div className='create-activity-stance'>
                  <label className='create-activity-popup-label'>ฝั่งที่ 1</label>
                  <input
                    type='text'
                    className='create-activity-popup-stance-input'
                    name='stanceOne'
                    value={formData.stanceOne}
                    onChange={handleChange}
                  />
                </div>
                <div className='create-activity-stance'>
                  <label className='create-activity-popup-label'>ฝั่งที่ 2</label>
                  <input
                    type='text'
                    className='create-activity-popup-stance-input'
                    name='stanceTwo'
                    value={formData.stanceTwo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='create-activity-tag-row'>
                <label className='create-activity-popup-label'>แท็กที่เกี่ยวข้อง</label>
                <div className='create-activity-tag-box'></div>
              </div>

              <div className='create-activity-button-row'>
                <button className='create-activity-confirm-button' onClick={handleCreate}>
                  สร้าง
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateActivityPopup;

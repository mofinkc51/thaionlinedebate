import React, { useState, useEffect } from 'react';
import closeButtonIcon from '../../assets/icon/close.png';
import axios from 'axios';

function EditActivityPopup({ activity, onClose, onEdit }) {
  const [additionalData, setAdditionalData] = useState({
    topicDesc: '',
    stanceOne: '',
    stanceTwo: '',
  });

  useEffect(() => {
    console.log('Activity prop changed:', activity);
  
    // Fetch additional data using Axios
    const fetchAdditionalData = async () => {
      try {
        // Log the dbt_id for debugging
        console.log('Fetching data for dbt_id:', activity.dbt_id);
  
        const response = await axios.get(`http://localhost:8800/api/admin/activity_get_for_edit/${activity.dbt_id}`);
        // Assuming the backend response structure is { dbt_description, dbt_agree, dbt_disagree }
        setAdditionalData({
          topicDesc: response.data.dbt_description || '',
          stanceOne: response.data.dbt_agree || '',
          stanceTwo: response.data.dbt_disagree || '',
        });
      } catch (error) {
        console.error('Error fetching additional data:', error);
      }
    };
  
    fetchAdditionalData();
  }, [activity]);

  // Combine both sets of data for the form
  const formData = {
    topicName: activity?.dbt_title || '',
    startDate: activity?.act_start_date || '',
    endDate: activity?.act_end_date || '',
    ...additionalData,
    // Add your logic to populate other form fields if needed
  };

  // Handle form submission
  const handleEdit = () => {
    // Perform validation or additional logic if needed
    // Call the onEdit prop with the updated form data
    onEdit(formData);
  };

  return (
    <>
      <div className='create-activity-bg-opacity'>
        <div className='create-activity-popup-box'>
          <div className='create-activity-popup-box-container'>
            <form>
              {/* Topic title row */}
              <div className='create-activity-title-row'>
                <h2>แก้ไขกิจกรรมโต้แย้ง</h2>
                <button className='create-activity-close-button' onClick={onClose}>
                  <img src={closeButtonIcon} alt='' />
                </button>
              </div>
              {/* Topic name row */}
              <div className='create-activity-popup-topicname-row'>
                <label className='create-activity-popup-label'>หัวข้อกิจกรรมโต้แย้ง</label>
                <input
                  type='text'
                  className='create-activity-popup-topicname-input'
                  value={formData.topicName}
                  onChange={(e) => setAdditionalData({ ...additionalData, topicName: e.target.value })}
                />
              </div>
              {/* Topic desc row */}
              <div className='create-activity-popup-topicdesc-row'>
                <label className='create-activity-popup-label'>คำอธิบายกิจกรรมโต้แย้ง</label>
                <textarea
                  className='create-activity-popup-topicdesc-input'
                  value={formData.topicDesc}
                  onChange={(e) => setAdditionalData({ ...additionalData, topicDesc: e.target.value })}
                  cols='30'
                  rows='5'
                ></textarea>
              </div>
              {/* date row */}
              <div className='create-activity-stance-row'>
                {/* start date */}
                <div className='create-activity-stance'>
                  <label className='create-activity-popup-label'>วันเริ่มต้นกิจกรรม</label>
                  <input
                    type='datetime-local'
                    className='create-activity-popup-start-date'
                    value={formData.startDate}
                    onChange={(e) => setAdditionalData({ ...additionalData, startDate: e.target.value })}
                  />
                </div>
                {/* end date */}
                <div className='create-activity-stance'>
                  <label className='create-activity-popup-label'>วันสิ้นสุดกิจกรรม</label>
                  <input
                    type='datetime-local'
                    className='create-activity-popup-end-date'
                    value={formData.endDate}
                    onChange={(e) => setAdditionalData({ ...additionalData, endDate: e.target.value })}
                  />
                </div>
              </div>
              {/* Stance row */}
              <div className='create-activity-stance-row'>
                {/* Stance one */}
                <div className='create-activity-stance'>
                  <label className='create-activity-popup-label'>ฝั่งที่ 1</label>
                  <input
                    type='text'
                    className='create-activity-popup-stance-input'
                    value={formData.stanceOne}
                    onChange={(e) => setAdditionalData({ ...additionalData, stanceOne: e.target.value })}
                  />
                </div>
                {/* Stance two */}
                <div className='create-activity-stance'>
                  <label className='create-activity-popup-label'>ฝั่งที่ 2</label>
                  <input
                    type='text'
                    className='create-activity-popup-stance-input'
                    value={formData.stanceTwo}
                    onChange={(e) => setAdditionalData({ ...additionalData, stanceTwo: e.target.value })}
                  />
                </div>
              </div>
              {/* tag row */}
              <div className='create-activity-tag-row'>
                <label className='create-activity-popup-label'>แท็กที่เกี่ยวข้อง</label>
                <div className='create-activity-tag-box'></div>
              </div>
              {/* button row */}
              <div className='create-activity-button-row'>
                <button className='create-activity-confirm-button' onClick={handleEdit}>
                  แก้ไข
                </button>
                <button className='create-activity-close-button' onClick={onClose}>
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditActivityPopup;

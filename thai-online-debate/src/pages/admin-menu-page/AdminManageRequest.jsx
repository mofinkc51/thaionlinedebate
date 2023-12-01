import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminManageRequest.css';

function AdminManageRequest(props) {
  const [requestData, setRequestData] = useState({
    requester: '',
    dateTime: '',
    topicRequested: '',
    reason1: '',
    reason2: '',
  });

  const { drId } = props;
  const storedUserEmail = localStorage.getItem('user');
  const userObject = JSON.parse(storedUserEmail);
  const userEmail = userObject.user_email;
  // console.log(userEmail)
  
 

  useEffect(() => {
    setRequestData((prevData) => ({ ...prevData }));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/admin/apvdownload/${drId}`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const requestData = data[0];
          const utcDate = new Date(requestData.dr_timestamp);
          const localDate = utcDate.toLocaleString();

          setRequestData({
            requester: requestData.dr_id,
            dateTime: localDate,
            topicRequested: requestData.dr_total_topic,
            reason1: requestData.dr_proof_one,
            reason2: requestData.dr_proof_two,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [drId]);

  const handleApproval = () => {
    // Extract dr_id from requestData.requester
    const drId = requestData.requester;
  
    // Log the dr_id and userEmail before sending
    console.log('dr_id before sending:', drId);
    console.log('user_email before sending:', userEmail);
  
    // Send the approval request to the server with user_email
    axios
      .post('http://localhost:8800/api/admin/adminapvdownload', {
        dr_id: drId,
        user_email: userEmail,
      })
      .then((response) => {
        // Do something after a successful request
        console.log('Approval request sent successfully');
        console.log('dr_id sent:', drId);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error sending approval request:', error);
        // Log additional information about the error from the server
        console.log(error.response.data);
      });
  };
  
  
  
  

  return (
    <>
      <div className="admin-manage-request-page-container">
        <div className="admin-manage-request-title-row">
          <h2>จัดการคำร้องการดาวน์โหลดชุดข้อมูล</h2>
        </div>
        {/* requester and date row */}
        <div className="admin-manage-request-requester-row">
          <div className="manage-request-requester-box">
            <h4>ชื่อผู้ร้อง</h4>
            <p className='manage-request-text'>{requestData.requester}</p>
          </div> 
          <div className="manage-request-date-box">
            <h4>วัน-เวลา</h4>
            <p className='manage-request-text'>{requestData.dateTime}</p>
          </div>
        </div>
        {/* topic requested row */}
        <div className="admin-manage-request-topic-requested-row">
          <h4>ชุดข้อมูลที่ต้องการดาวน์โหลด</h4>
          <p className='manage-request-text'>{requestData.topicRequested}</p>
        </div>
        {/* reason row */}
        <div className="admin-manage-request-topic-reason-row">
          <h4>เหตุผลที่ต้องการนำข้อมูลไปใช้</h4>
          <p className='manage-request-text'>{requestData.reason}</p>
        </div>

        {/* proofs row */}
        <div className="admin-manage-request-proof-row">
          <h4>หลักฐานยืนยันตัวตน</h4>
          <div className='manage-request-proof-row'>
            <p className='manage-request-text'>บัตรประชาชน</p>
            <button className='manage-request-proof-button'>ตรวจสอบ</button>
          </div>
          <div className='manage-request-proof-row'>
            <p className='manage-request-text'>เอกสารยืนยันจากต้นสังกัด</p>
            <button className='manage-request-proof-button'>ตรวจสอบ</button>
          </div>
        </div>

        {/* button row */}
        <div className="admin-manage-request-button-row">
          <button className='manage-request-confirm-button' onClick={handleApproval}>ยืนยัน</button>
        
          <button className='manage-request-cancel-button'>ยกเลิก</button>
        </div>
      </div>
    </>
  )
}

export default AdminManageRequest;

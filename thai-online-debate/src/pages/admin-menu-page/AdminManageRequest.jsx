import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminManageRequest.css';

function AdminManageRequest(props) {
  const [requestData, setRequestData] = useState({
    requester: '',
    dateTime: '',
    topicRequested: '',
    reason: '',
  });

  const { drId } = props;

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
            requester: requestData.dr_requester,
            dateTime: localDate,
            topicRequested: requestData.dr_total_topic,
            reason: requestData.dr_requisitioner,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [drId]);

  const handleApproval = () => {
    // ส่งคำร้องการอนุมัติไปยังเซิร์ฟเวอร์
    axios.post('http://localhost:8800/api/admin/adminapvdownload', { dr_id: drId })
      .then((response) => {
        // ทำอะไรก็ตามหลังจากสำเร็จ
        console.log('Approval request sent successfully');
        console.log('dr_id ที่ส่งออกไป:', drId);
      })
      .catch((error) => {
        // จัดการกรณีเกิดข้อผิดพลาด
        console.error('Error sending approval request:', error);
        // แสดงข้อมูลเพิ่มเติมเกี่ยวกับข้อผิดพลาดจากเซิร์ฟเวอร์
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
        <div className="admin-manage-request-drId">
          drId: {drId}
        </div>
      </div>
    </>
  )
}

export default AdminManageRequest;

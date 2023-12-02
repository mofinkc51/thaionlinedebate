import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminManageRequest.css";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";
function AdminManageRequest(props) {
  const { data , onBack ,debate,refresh} = props;
  const timestamp = data.dr_timestamp;
  const dateObject = new Date(timestamp);
  
  const formattedDate = new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(dateObject);
  const detailData = {
    dr_id : data.dr_id,
    dr_name: data.dr_name,
    dr_timestamp: formattedDate,
    dr_desc: data.dr_desc,
    dr_proof_one: data.dr_proof_one,
    dr_proof_two: data.dr_proof_two,
  };


  const storedUserEmail = localStorage.getItem("user");
  const userObject = JSON.parse(storedUserEmail);
  const userEmail = userObject.user_email;

  const downloadFile = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename; // กำหนดชื่อไฟล์สำหรับดาวน์โหลด
    link.style.display = "none"; // ซ่อนลิงก์

    // เพิ่มลิงก์ไปยัง DOM และเรียกใช้งาน
    document.body.appendChild(link);
    link.click();

    // ลบลิงก์หลังจากใช้งานเสร็จ
    document.body.removeChild(link);
  };

  // ฟังก์ชันสำหรับดาวน์โหลดไฟล์แรก
  const downloadCertOne = () => {
    const filename1 = detailData.dr_proof_one;
    const url = `http://localhost:8800/api/downloads/cert/${filename1}`;
    downloadFile(url, filename1);
  };

  // ฟังก์ชันสำหรับดาวน์โหลดไฟล์ที่สอง
  const downloadCertTwo = () => {
    const filename2 = detailData.dr_proof_two;
    const url = `http://localhost:8800/api/downloads/cert/${filename2}`;
    downloadFile(url, filename2);
  };

  const handleApproval = async () => {
    // Extract dr_id from detailData.dr_name
    const drId = detailData.dr_id;
    Swal.fire({
      title: 'Are you sure?',
      text: "อนุมัติคำร้องขอดาวน์โหลดชุดข้อมูล",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'grey',
      confirmButtonText: 'ใช่ ยืนยัน!',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send the approval request to the server with user_email
          const response = await makeRequest.post("/admin/adminapvdownload", {
            dr_id: drId,
            user_email: userEmail,
          }).then(() => {
            onBack();
            refresh();
          })
        } catch (error) {
            Swal.fire({
              icon: "error",
              title: error.response.data
          });
        }
      }
    })
  };
    
  const handleDisapproval = async () => {
    const drId = detailData.dr_id; // Extract dr_id from detailData

    Swal.fire({
      title: 'Are you sure?',
      text: "ปฎิเสธคำร้องขอดาวน์โหลดชุดข้อมูล",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'grey',
      confirmButtonText: 'ใช่ ยืนยัน!',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
          try {
            // Send the disapproval request to the server with user_email
            const response = await makeRequest.post("/admin/rejectedactivity", {
              dr_id: drId,
              user_email: userEmail,
            }).then(() => {
              onBack();
              refresh();
            })
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: error.response ? error.response.data : "An unknown error occurred"
          });
        }
      }
    })
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
            <p className="manage-request-text">{detailData.dr_name}</p>
          </div>
          <div className="manage-request-date-box">
            <h4>วัน-เวลา</h4>
            <p className="manage-request-text">{detailData.dr_timestamp}</p>
          </div>
        </div>
        {/* topic requested row */}
        <div className="admin-manage-request-topic-requested-row">
          <h4>ชุดข้อมูลที่ต้องการดาวน์โหลด</h4>
          <p className="manage-request-text">                    
          {props.debate.map((debate, index) => (
              <p key = {index} className='download-detail-text'>{debate.dbt_title}</p>
          ))}</p>
        </div>
        {/* reason row */}
        <div className="admin-manage-request-topic-reason-row">
          <h4>เหตุผลที่ต้องการนำข้อมูลไปใช้</h4>
          <p className="manage-request-text">{detailData.dr_desc}</p>
        </div>

        {/* proofs row */}
        <div className="admin-manage-request-proof-row">
          <h4>หลักฐานยืนยันตัวตน</h4>
          <div className="manage-request-proof-row">
            <p className="manage-request-text">บัตรประชาชน</p>
            <button
              className="download-detail-upload-proof-button"
              onClick={downloadCertOne}
            >
              ตรวจสอบ
            </button>
          </div>
          <div className="manage-request-proof-row">
            <p className="manage-request-text">เอกสารยืนยันจากต้นสังกัด</p>
            <button
              className="download-detail-upload-proof-button"
              onClick={downloadCertTwo}
            >
              ตรวจสอบ
            </button>
          </div>
        </div>

        {/* button row */}
        <div className="admin-manage-request-button-row">
          <button
            className="manage-request-confirm-button"
            onClick={handleApproval}>
            อนุมัติ
          </button>

          <button className="manage-request-cancel-button"
            onClick={handleDisapproval}>
            ไม่อนุมัติ
            </button>
        </div>
      </div>
    </>
  );
}

export default AdminManageRequest;

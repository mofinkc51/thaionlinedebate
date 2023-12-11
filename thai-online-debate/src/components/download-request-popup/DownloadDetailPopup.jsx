import React, { Children, useEffect, useState } from "react";
import "./DownloadDetailPopup.css";
import closeButtonIcon from "../../assets/icon/close.png";
import { makeRequest } from "../../axios";

function DownloadDetailPopup(props) {
  const timestamp = props.data.dr_timestamp;
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
    dr_name: props.data.dr_name,
    dr_desc: props.data.dr_desc,
    dr_timestamp: formattedDate,
    dr_proof_one: props.data.dr_proof_one,
    dr_proof_two: props.data.dr_proof_two,
  };
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
  return (
    <div className="download-detail-bg-opacity">
      <div className="download-detail-popup-box">
        <div className="download-detail-popup-box-container">
          {/* request title row */}
          <div className="download-detail-title-row">
            <h2>รายละเอียดคำร้องขอชุดข้อมูล</h2>
            <button
              className="download-detail-close-button"
              onClick={() => props.onCloseClick()}
            >
              <img src={closeButtonIcon} alt="" />
            </button>
          </div>

          {/* requester and date row */}
          <div className="download-detail-requester-row">
            <div className="download-detail-requester-box">
              <h4>ชื่อผู้ร้อง</h4>
              <p className="download-detail-text">{detailData.dr_name}</p>
            </div>
            <div className="download-detail-date-box">
              <h4>วัน-เวลา</h4>
              <p className="download-detail-text">{detailData.dr_timestamp}</p>
            </div>
          </div>

          {/* topic requested row */}
          <div className="download-detail-topic-requested-row">
            <h4>หัวข้อชุดข้อมูลที่ต้องการดาวน์โหลด</h4>
            {props.debate.map((debate, index) => (
              <p key={index} className="download-detail-text">
                {debate.dbt_title}
              </p>
            ))}
          </div>
          {/* reason row */}
          <div className="download-detail-topic-reason-row">
            <h4>เหตุผลที่ต้องการนำข้อมูลไปใช้</h4>
            <p className="download-detail-text">{detailData.dr_desc}</p>
          </div>

          {/* proof of request */}
          <div className="download-detail-popup-proof-row">
            <h4>หลักฐานการยืนยันตัวตน</h4>
            <div className="download-detail-popup-proof-input">
              <label htmlFor="downloadIdCard" className="download-detail-text">
                บัตรประชาชน
              </label>
              <button
                className="download-detail-upload-proof-button"
                onClick={downloadCertOne}
              >
                ตรวจสอบ
              </button>
            </div>

            <div className="download-detail-popup-proof-input">
              <label className="download-detail-text">
                เอกสารยืนยันจากต้นสังกัด
              </label>
              <button
                className="download-detail-upload-proof-button"
                onClick={downloadCertTwo}
              >
                ตรวจสอบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadDetailPopup;

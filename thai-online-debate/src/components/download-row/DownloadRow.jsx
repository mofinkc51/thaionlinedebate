import React, { useState } from "react";
import "./DownloadRow.css";
import DownloadDetailPopup from "../download-request-popup/DownloadDetailPopup";

function DownloadRow(props) {
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
  // จะแสดงเป็น "วัน/เดือน/ปี เวลา" ตามรูปแบบที่ต้องการ
  
  const rowData = {
    date: formattedDate,
    timeRemaining: "6 วัน 23 ชั่วโมง",
    quantity: props.data.dr_total_topic,
    status: props.data.dr_status,
  };
  const handleButtonClick = () => {
    props.getDetail(props.data.dr_id);
  };
  const downloadFile = () => {
    props.getDownloadDataApproved(props.data.dr_id);
  }

  return (
    <>
      <tr className="download-list-row">
        <td>{rowData.date}</td>
        <td>{rowData.status === "approved" ? rowData.timeRemaining : 
         rowData.status === "rejected" ? "expired" : "waited"}</td>
        <td>{rowData.quantity}</td>
        <td>{rowData.status}</td>
        <td>
          <button onClick={handleButtonClick}>
            details
          </button>
          {rowData.status === "approved" ? (
            <button onClick={downloadFile}>
              Download
            </button>)
          : null}
        </td>
      </tr>
    </>
  );
}

export default DownloadRow;

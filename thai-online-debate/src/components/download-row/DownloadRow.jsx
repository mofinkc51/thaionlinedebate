import React, { useState } from "react";
import "./DownloadRow.css";
import DownloadDetailPopup from "../download-request-popup/DownloadDetailPopup";
import { MdOutlineFileDownload } from "react-icons/md";
import inspectIcon from "../../assets/icon/inspect.png";
import downloadIcon from "../../assets/icon/download.png";
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

  // color status

const getStatusText = (status) => {
  switch (status) {
    case 'approved':
      return <div className="download-row-status-box-approved"><p>อนุมัติแล้ว</p></div>;
    case 'pending':
      return <div className="download-row-status-box-pending"><p>รออนุมัติ</p></div>;
    case 'rejected':
      return <div className="download-row-status-box-rejected"><p>ไม่อนุมัติ</p></div>;
    // Add more cases for other statuses if needed
    default:
      return 'Unknown'; // Default text
  }
};

  return (
    <>
      <tr className="download-list-row">
        <td className="download-list-td-date">{rowData.date}</td>
        <td className="download-list-td-time">{rowData.status === "approved" ? rowData.timeRemaining : 
         rowData.status === "rejected" ? "N/A" : "N/A"}</td>
        <td className="download-list-td-quantity">{rowData.quantity}</td>
        <td><div>{getStatusText(rowData.status)}</div></td>
        <td>
          <div className="download-row-button-row">
            <button onClick={handleButtonClick} className="download-row-inspect-button">
              <img src= {inspectIcon} alt="" />
            </button>
            {rowData.status === "approved" ? (
              <button onClick={downloadFile} className="download-row-download-button">
                <img src= {downloadIcon} alt="" />
                
              </button>)
            : null}
          </div>
        </td>
      </tr>
    </>
  );
}

export default DownloadRow;

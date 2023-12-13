import React, { useEffect, useState } from "react";
import "./DownloadRow.css";
import DownloadDetailPopup from "../download-request-popup/DownloadDetailPopup";
import { MdOutlineFileDownload } from "react-icons/md";
import inspectIcon from "../../assets/icon/inspect.png";
import downloadIcon from "../../assets/icon/download.png";
import { makeRequest } from "../../axios";
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
  
  const [rowData, setRowData] = useState({
    date: formattedDate,
    timeRemaining: "6 วัน 23 ชั่วโมง",
    quantity: props.data.dr_total_topic,
    status: props.data.dr_status,
  });
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
const [dabateTitle, setDabateTitle] = useState([]);

const getDownloadDetail = async (dr_id) => {

  try {
    const resDebate = await makeRequest.get(
      `/downloads/detail/debate/${dr_id}`
    );
    setDabateTitle(resDebate.data);
  } catch (error) {
    console.error(error);
  }
};
const getDownloadRequestById = async (dr_id) => {
  try {
    const res = await makeRequest.get(`/downloads/request/${dr_id}`);
    setRowData({...rowData,
      timeRemaining: res.data[0].ap_download_expired_date,
    })
    console.log(res.data)
  } catch (error) {
    console.error(error);
  }
}
const getCountdownTime = (timestamp) => {
  const createdAt = new Date(timestamp);
  const sevenDaysLater = new Date(createdAt.getTime());
  const now = new Date();
  const timeRemaining = sevenDaysLater - now;

  if (timeRemaining < 0) {
    return 'หมดเวลา';
  }
  let seconds = Math.floor((timeRemaining / 1000) % 60);
  let minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  let hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  days = days < 10 ? '0' + days : days;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${days} วัน ${hours} ชั่วโมง ${minutes} นาที `;
};

const [countdown, setCountdown] = useState();

useEffect(() => {
  getDownloadDetail(props.data.dr_id);
  getDownloadRequestById(props.data.dr_id);
}, []);

useEffect(() => {
  console.log(dabateTitle); // ค่าใหม่ที่อัปเดตแล้วจะแสดงที่นี่หลังจาก re-render
}, [dabateTitle]);

useEffect(() => {
  if (!rowData) {
    return;
  }
  const intervalId = setInterval(() => {
    setCountdown(getCountdownTime(rowData.timeRemaining));
  }, 1000);

  return () => clearInterval(intervalId);
}, [rowData]);
return (
    <>
      <tr className="download-list-row">
        <td className="download-list-td-date">{rowData.date}</td>
        <td className="download-list-td-time">{rowData.status === "approved" ? countdown : 
         rowData.status === "rejected" ? "N/A" : "N/A"}</td>
        <td className="download-list-td-quantity">{dabateTitle ? dabateTitle.map((data, index) => <p>{index + 1}. {data.dbt_title}</p>) : "N/A"}</td>
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

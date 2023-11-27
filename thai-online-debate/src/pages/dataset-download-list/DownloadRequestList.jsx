import React, { useState, useEffect, useRef } from "react";

import "./DownloadRequestList.css";
import UserNavBar from "../../components/Navbar/UserNavBar";
import DownloadRequestRow from "../../components/download-request-row/DownloadRequestRow";
import DownloadFormPopup from "../../components/download-request-popup/DownloadFormPopup";
import { makeRequest } from "../../axios";
import downloadFilesAsZip from "../../downloadzip";
import Swal from "sweetalert2";
// import ConfirmRequestPopup from './ConfirmRequestPopup';

function DownloadRequestList() {
  const [selectedRequestPopup, setSelectedRequestPopup] = useState(null);
  const [selectedConfirmPopup, setSelectedConfirmPopup] = useState(null);
  let popup = null;

  function onCloseClick() {
    popup = null;
    setSelectedRequestPopup(null);
  }
  const [downloadData, setDownloadData] = useState([]);
  const [downloadDataApproved, setDownloadDataApproved] = useState([]);
  const getDownloadData = async () => {
    try {
      const res = await makeRequest.get("/downloads");
      setDownloadData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshTopics = () => {
    getDownloadData();
  };

  useEffect(() => {
    getDownloadData();
  }, []);

  const handleRequestClick = () => {
    if (!downloadData || downloadData.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "กรุณาเพิ่มประเด็นโต้แย้งที่ต้องการดาวน์โหลดก่อน",
      });
    }
    setSelectedRequestPopup(<DownloadFormPopup onCloseClick={onCloseClick} />);
  };
  if (!!selectedRequestPopup) {
    popup = <DownloadFormPopup onCloseClick={onCloseClick} />;
  }

  const getDownloadDataApproved = async () => {
    // ดึง dbt_id จาก localStorage
    const downloadList = JSON.parse(localStorage.getItem("downloadList"));
    if (!downloadList || downloadList.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "กรุณาเพิ่มประเด็นโต้แย้งที่ต้องการดาวน์โหลดก่อน",
      });
    }

    const downloadListArray = []; // สร้าง array สำหรับเก็บข้อมูลที่จะดาวน์โหลด
    try {
      for (let i = 0; i < downloadList.length; i++) {
        const resDBT = await makeRequest.get(`/posts/topic/${downloadList[i]}`);
        const debate_topic_download = {
          dbt_title: resDBT.data[0].dbt_title,
          dbt_description: resDBT.data[0].dbt_description,
          dbt_comment: [],
        };

        const res = await makeRequest.get("/downloads/approved", {
          params: { dbt_id: downloadList[i] },
        });
        if (res.data.length > 0) {
          debate_topic_download.dbt_comment = res.data;
        }

        downloadListArray.push([debate_topic_download]);
      }
      console.log(downloadListArray);
      if (downloadListArray.length > 0) {
        // ทำการดาวน์โหลดไฟล์เป็น Zip
        downloadFilesAsZip(downloadListArray).then(() => {
          localStorage.removeItem("downloadList");
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = () => {
    getDownloadDataApproved();
  };

  return (
    <>
      <UserNavBar />
      <div className="download-request-page-container">
        <div className="download-request-title-row">
          <h2 className="download-request-title">
            รายการประเด็นโต้แย้งที่ต้องการดาวน์โหลด
          </h2>
          <button onClick={handleRequestClick}>ส่งคำร้องการดาวน์โหลด</button>
        </div>
        <table>
          {/* table header  */}
          <tr className="download-request-table-header">
            <th>หัวข้อประเด็นโต้แย้ง</th>
            <th>ฝั่งที่ 1</th>
            <th>ฝั่งที่ 2</th>
            <th>จำนวนข้อความโต้แย้ง</th>
            <th>จัดการ</th>
          </tr>

          {/* table body */}
          {downloadData.map((downloadData) => (
            <DownloadRequestRow data={downloadData} refresh={refreshTopics} />
          ))}
        </table>
      </div>
      {popup}
      {/* <DownloadFormPopup onCloseClick={onCloseClick}/> */}
    </>
  );
}

export default DownloadRequestList;

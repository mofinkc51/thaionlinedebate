import React, { useEffect, useState } from "react";
import UserNavBar from "../../components/Navbar/UserNavBar";
import "./DownloadList.css";
import DownloadRow from "../../components/download-row/DownloadRow";
import { makeRequest } from "../../axios";
import DownloadDetailPopup from "../../components/download-request-popup/DownloadDetailPopup";
import downloadFilesAsZip from "../../downloadzip";
import AdminNavBar from "../../components/Navbar/AdminNavBar";

function DownloadList() {
  const [downloadData, setDownloadData] = useState([]);
  const getDownloadData = async () => {
    try {
      const res = await makeRequest.get("/downloads/pending");
      setDownloadData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [downloadDetail, setDownloadDetail] = useState({});

  const [detailDebate, setDetailDebate] = useState([]);
  let popup = null;
  const [downloadDetailPopup, setDownloadDetailPopup] = useState(null);
  function onCloseClick() {
    popup = null;
    setDownloadDetailPopup(null);
  }

  const getDownloadDetail = async (dr_id) => {
    if (dr_id === undefined) {
      return;
    }
    try {
      const res = await makeRequest.get(`/downloads/detail/${dr_id}`);
      setDownloadDetail(res.data); // กำหนดค่า downloadDetail
      const resDebate = await makeRequest.get(
        `/downloads/detail/debate/${dr_id}`
      );
      setDetailDebate(resDebate.data);
      console.log(resDebate.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestClick = () => {
    if (downloadDetail) {
      setDownloadDetailPopup(
        <DownloadDetailPopup
          onCloseClick={onCloseClick}
          data={downloadDetail}
          debate={detailDebate}
        />
      );
    }
  };

  if (!!downloadDetailPopup) {
    popup = (
      <DownloadDetailPopup
        onCloseClick={onCloseClick}
        data={downloadDetail}
        debate={detailDebate}
      />
    );
  }
  const handleDetailClick = (dr_id) => {
    getDownloadDetail(dr_id).then(() => {
      handleRequestClick(); // จากนั้นเรียกใช้ handleRequestClick
    })
    
  }
  const [downloadListArray, setDownloadListArray] = useState([]);
  const getDownloadDataApproved = async (dr_id) => {
    let newDownloadListArray = []; // สร้าง array ใหม่
    const resDebate = await makeRequest.get(
      `/downloads/detail/debate/${dr_id}`
    );
    const debateList = resDebate.data;
    try {
      for (let i = 0; i < debateList.length; i++) {
        const resDBT = await makeRequest.get(
          `/posts/topic/${debateList[i].dbt_id}`
        );
        const debate_topic_download = {
          dbt_title: resDBT.data[0].dbt_title,
          dbt_description: resDBT.data[0].dbt_description,
          dbt_comment: [],
        };
        const res = await makeRequest.get("/downloads/approved/", {
          params: { dbt_id: debateList[i].dbt_id },
        });
        if (res.data.length > 0) {
          debate_topic_download.dbt_comment = res.data;
        }

        newDownloadListArray.push(debate_topic_download);
      }
      if (newDownloadListArray.length > 0) {
        setDownloadListArray(newDownloadListArray); // อัปเดต state ทีเดียวหลังจากการวนลูปเสร็จ
        downloadFilesAsZip(downloadListArray);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDownloadData();
    getDownloadDetail();
  }, []);
  //check admin
  const [isAdmin, setIsAdmin] = useState(false);
  const checkadmin = async () => {
    try {
      const res = await makeRequest.get("/auth/admin-checked");
      if (res.data === "true") {
        setIsAdmin(true);
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    checkadmin();
  }, []);
  return (
    <>
      {isAdmin ? <AdminNavBar /> : <UserNavBar />}
      <div className="download-list-page-container">
        <div className="download-list-title-row">
          <h2 className="download-list-title">
            รายการคำร้องขอดาวน์โหลดชุดข้อมูล
          </h2>
        </div>
        <table>
          {/* table header  */}
          <tr className="download-list-table-header">
            <th>วัน-เวลา</th>
            <th className="download-list-th-time">เวลาคงเหลือ</th>
            <th className="download-list-th-quantity">หัวข้อประเด็นโต้แย้ง</th>
            <th>สถานะ</th>
            <th>ตรวจสอบ</th>
          </tr>
          {/* table body */}
          {downloadData.map((data) => (
            <DownloadRow
              data={data}
              onClick={handleRequestClick}
              key={data.dr_id}
              getDetail={() => handleDetailClick(data.dr_id)}
              getDownloadDataApproved={() =>
                getDownloadDataApproved(data.dr_id)
              }
            />
          ))}
        </table>
        {popup}
      </div>
    </>
  );
}

export default DownloadList;

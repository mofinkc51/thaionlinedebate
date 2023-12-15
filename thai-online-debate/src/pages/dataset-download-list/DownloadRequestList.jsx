import React, { useState, useEffect, useRef } from "react";

import "./DownloadRequestList.css";
import UserNavBar from "../../components/Navbar/UserNavBar";
import DownloadRequestRow from "../../components/download-request-row/DownloadRequestRow";
import DownloadFormPopup from "../../components/download-request-popup/DownloadFormPopup";
import { makeRequest } from "../../axios";
import downloadFilesAsZip from "../../downloadzip";
import Swal from "sweetalert2";
import AdminNavBar from "../../components/Navbar/AdminNavBar";
import axios from "axios";
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
    } catch (error) {
      console.error(error);
    }
  };

  const refreshTopics = () => {
    getDownloadData();
  };

  // useEffect(() => {
  //   getDownloadData();
  // }, []);

  const handleRequestClick = () => {
    if (!downloadData || downloadData.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "กรุณาเพิ่มประเด็นโต้แย้งที่ต้องการดาวน์โหลดก่อน",
      });
    }
    setSelectedRequestPopup(
      <DownloadFormPopup
        onCloseClick={onCloseClick}
        refreshTopics={refreshTopics}
      />
    );
  };
  if (!!selectedRequestPopup) {
    popup = (
      <DownloadFormPopup
        onCloseClick={onCloseClick}
        refreshTopics={refreshTopics}
      />
    );
  }
  let stance = {
    dbc_stance: 0,
  };
  const getCommentAgree = async (dbt_id) => {
    stance.dbc_stance = 0;
    try {
      const res = await makeRequest.get(`/comments/${dbt_id}`, {
        params: stance,
      });
      console.log("comment 0", res.data);
      //res.data = array of comment agree
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getCommentDisagree = async (dbt_id) => {
    stance.dbc_stance = 1;
    try {
      const res = await makeRequest.get(`/comments/${dbt_id}`, {
        params: stance,
      });
      //res.data = array of comment disagree
      console.log("comment 1", res.data);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  //finding top tag comment agree
  const topFrequencyTagComments = async (commentDataAgree) => {
    const tagFrequency = {}; // ใช้เพื่อนับความถี่ของแต่ละ tag

    for (const comment of commentDataAgree) {
      try {
        console.log("comment agree", comment.dbc_comment);
        const response = await axios.post(
          "https://api.aiforthai.in.th/tagsuggestion",
          `text=${encodeURIComponent(comment.dbc_comment)}&numtag=10`,
          {
            headers: {
              Apikey: "OKXVty86JM5w4g7ve9EyJfEfEXVArVHE",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const responseData = response.data;
        console.log("res api data", responseData);
        if (responseData && responseData.tags) {
          // รวบรวม tags และนับความถี่
          responseData.tags.forEach((tag) => {
            tagFrequency[tag.tag] = (tagFrequency[tag.tag] || 0) + 1;
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    // เลือก 5 tags ที่ซ้ำกันมากที่สุด
    const topTags = Object.entries(tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((item) => item[0]);
    return topTags;
  };
  //finding top tag comment disagree

  const topFrequencyTagComments_dis = async (commentDataDisAgree) => {
    const tagFrequency = {}; // ใช้เพื่อนับความถี่ของแต่ละ tag

    for (const comment of commentDataDisAgree) {
      try {
        const response = await axios.post(
          "https://api.aiforthai.in.th/tagsuggestion",
          `text=${encodeURIComponent(comment.dbc_comment)}&numtag=10`,
          {
            headers: {
              Apikey: "OKXVty86JM5w4g7ve9EyJfEfEXVArVHE",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const responseData = response.data;
        if (responseData && responseData.tags) {
          // รวบรวม tags และนับความถี่
          responseData.tags.forEach((tag) => {
            tagFrequency[tag.tag] = (tagFrequency[tag.tag] || 0) + 1;
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    // เลือก 5 tags ที่ซ้ำกันมากที่สุด
    const topTags = Object.entries(tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((item) => item[0]);
    return topTags;
  };
  const getDownloadDataAdmin = async () => {
    // ดึง dbt_id จาก localStorage
    const downloadList = JSON.parse(localStorage.getItem('downloadList'));
    try {
        const res = await makeRequest.get('/downloads/admin', { params: downloadList });
        setDownloadData(res.data);
    } catch (error) {
        console.error(error);
    }
};
  // const [downloadListArray, setDownloadListArray] = useState([]);
  const getDownloadDataApprovedAdmin = async () => {
    const downloadList = JSON.parse(localStorage.getItem("downloadList"));
    if (!downloadList || downloadList.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "กรุณาเพิ่มประเด็นโต้แย้งที่ต้องการดาวน์โหลดก่อน",
      });
    }
    let downloadListArray = []; // Create a new array for storing the download data
    try {
      for (let dbt_id of downloadList) {
        const resDBT = await makeRequest.get(`/posts/topic/${dbt_id}`);
        let debate_topic_download = {
          dbt_id: dbt_id,
          dbt_title: resDBT.data[0].dbt_title,
          dbt_description: resDBT.data[0].dbt_description,
          dbt_tag: "",
          dbt_comment: [],
          dbt_top5_tags_stance_agree: "",
          dbt_top5_tags_stance_disagree: "",
        };
  
        // Fetch tags for the debate
        const resTag = await makeRequest.get(`/posts/tag/debate/${dbt_id}`);
        if (resTag.data.length > 0) {
          debate_topic_download.dbt_tag = resTag.data.map(tag => tag.tag_title).join(", ");
        }
        const res = await makeRequest.get("/downloads/approved/", {
          params: { dbt_id: dbt_id },
        });
        if (res.data.length > 0) {
          debate_topic_download.dbt_comment = res.data;
        }
        // Fetch comments and calculate top tags for agree and disagree stances
        const commentsAgree = await getCommentAgree(dbt_id);
        const commentsDisagree = await getCommentDisagree(dbt_id);
        const topTagsAgree = await topFrequencyTagComments(commentsAgree);
        const topTagsDisagree = await topFrequencyTagComments_dis(commentsDisagree);
  
        debate_topic_download.dbt_top5_tags_stance_agree = topTagsAgree.join(", ");
        debate_topic_download.dbt_top5_tags_stance_disagree = topTagsDisagree.join(", ");
        
  
        downloadListArray.push(debate_topic_download);
      }
  
      if (downloadListArray.length > 0) {
        // Perform the download action, such as creating a zip file
        downloadFilesAsZip(downloadListArray).then(() => {
          localStorage.removeItem("downloadList"); // Clear the local storage
          refreshTopics()
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleDownloadAdmin = () => {
    getDownloadDataApprovedAdmin(); // Call the modified function for admin
  };
  

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
  
  useEffect(() => {
    if (isAdmin) {
      getDownloadDataAdmin();
    } else {
      getDownloadData();
    }
  }, [isAdmin]);
  
  return (
    <>
      {isAdmin ? <AdminNavBar /> : <UserNavBar />}
      <div className="download-request-page-container">
        <div className="download-request-title-row">
          <h2 className="download-request-title">
            รายการประเด็นโต้แย้งที่ต้องการดาวน์โหลด
          </h2>
          {isAdmin ? (
          <button  onClick={handleDownloadAdmin}>
            ส่งคำร้องการดาวน์โหลด
          </button>
        ) : (
          <button  onClick={handleRequestClick}>
            ส่งคำร้องการดาวน์โหลด
          </button>
        )}
        </div>
        <table>
          {/* table header  */}
          <tr className="download-request-table-header">
            <th>หัวข้อประเด็นโต้แย้ง</th>
            <th className="download-request-th-stance">ฝั่งที่ 1</th>
            <th className="download-request-th-stance">ฝั่งที่ 2</th>
            <th className="download-request-th-number">จำนวนข้อความโต้แย้ง</th>
            <th>จัดการ</th>
          </tr>

          {/* table body */}
          {downloadData.map((downloadData) => (
            <DownloadRequestRow data={downloadData} refresh={refreshTopics} />
          ))}
        </table>
        {/* ปุ่ม ที่เปลี่ยนตามสถานะของ isAdmin */}
        {isAdmin ? (
          <button className="download-request-down-button" onClick={handleDownloadAdmin}>
            ส่งคำร้องการดาวน์โหลด
          </button>
        ) : (
          <button className="download-request-down-button" onClick={handleRequestClick}>
            ส่งคำร้องการดาวน์โหลด
          </button>
        )}
      </div>
      {selectedRequestPopup}
      {/* <DownloadFormPopup onCloseClick={onCloseClick}/> */}
    </>
  );
}

export default DownloadRequestList;

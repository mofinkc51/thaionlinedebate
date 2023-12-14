import React, { useEffect, useState } from "react";
import UserNavBar from "../../components/Navbar/UserNavBar";
import "./DownloadList.css";
import DownloadRow from "../../components/download-row/DownloadRow";
import { makeRequest } from "../../axios";
import DownloadDetailPopup from "../../components/download-request-popup/DownloadDetailPopup";
import downloadFilesAsZip from "../../downloadzip";
import AdminNavBar from "../../components/Navbar/AdminNavBar";
import axios from "axios";

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
    });
  };
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
          dbt_id: debateList[i].dbt_id,
          dbt_title: resDBT.data[0].dbt_title,
          dbt_description: resDBT.data[0].dbt_description,
          dbt_tag: "",
          dbt_comment: [],
          dbt_top5_tags_stance_agree: [],
          dbt_top5_tags_stance_disagree: [],
        };
        const resTag = await makeRequest.get(
          `/posts/tag/debate/${debateList[i].dbt_id}`
        );
        if (resTag.data.length > 0) {
          // Map each tag object to its tag_title and join with comma to create a string
          debate_topic_download.dbt_tag = resTag.data
            .map((tag) => tag.tag_title)
            .join(", ");
        }
        const res = await makeRequest.get("/downloads/approved/", {
          params: { dbt_id: debateList[i].dbt_id },
        });
        if (res.data.length > 0) {
          console.log("comment", res.data);
          debate_topic_download.dbt_comment = res.data;
        }
        // Call the functions and wait for their results before pushing to newDownloadListArray
        const agreeTags = await topFrequencyTagComments(
          await getCommentAgree(debateList[i].dbt_id)
        );
        const disagreeTags = await topFrequencyTagComments_dis(
          await getCommentDisagree(debateList[i].dbt_id)
        );

        debate_topic_download.dbt_top5_tags_stance_agree = agreeTags.join(", ");
        debate_topic_download.dbt_top5_tags_stance_disagree =
          disagreeTags.join(", ");
        newDownloadListArray.push(debate_topic_download);
      }

      if (newDownloadListArray.length > 0) {
        console.log(newDownloadListArray);
        setDownloadListArray(newDownloadListArray); // อัปเดต state ทีเดียวหลังจากการวนลูปเสร็จ
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDownloadData();
    getDownloadDetail();
  }, []);
  useEffect(() => {
    if (downloadListArray.length > 0) {
      console.log(downloadListArray);
      downloadFilesAsZip(downloadListArray);
    }
  }, [downloadListArray]);
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
            <th className="download-list-th-status">สถานะ</th>
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

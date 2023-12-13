import React, { useState, useEffect } from "react";
import "./DebateTopic.css";
import UserNavBar from "../../components/Navbar/UserNavBar";
import TopicTag from "../../components/TopicTag";
import optionButtonIcon from "../../assets/icon/more-vertical.png";
import userImg from "../../assets/profile.png";
import CommentComponent from "../../components/CommentComponent";
import AddAgreeComment from "../../components/topic-popup/AddAgreeComment";
import AddDisagreeComment from "../../components/topic-popup/AddDisagreeComment";
import EditTopicPopup from "../../components/topic-popup/EditTopicPopup";
import DeleteTopicPopup from "../../components/topic-popup/DeleteTopicPopup";
import AddToFavPopup from "../../components/topic-popup/AddToFavPopup";
import AddToDownloadPopup from "../../components/topic-popup/AddToDownloadPopup";
import CommentTag from "../../components/CommentTag";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";
import ReportTopicPopup from "../../components/topic-popup/ReportTopicPopup";
import AdminNavBar from "../../components/Navbar/AdminNavBar";

function DebateTopic(props) {
  const [open, setOpen] = useState(false);

  const [selectedAgreePopup, setSelectedAgreePopup] = useState(null);
  const [selectedDisagreePopup, setSelectedDisagreePopup] = useState(null);
  const [selectedEditPopup, setSelectedEditPopup] = useState(null);
  const [selectedAddtofavPopup, setSelectedAddtofavPopup] = useState(null);
  const [selectedAddtoDownloadPopup, setSelectedAddtoDownloadPopup] =
    useState(null);
  const [selectedReportPopup, setSelectedReportPopup] = useState(null);
  let popup = null;

  const navigate = useNavigate();
  const { dbt_id } = props;
  let stance = {
    dbc_stance: 0,
  };

  let [commentDataAgree, setCommentDataAgree] = useState([]);
  let [commentDataDisagree, setCommentDataDisagree] = useState([]);

  const [topicData, setTopicData] = useState({
    dbt_id: "",
    dbt_title: "Loading...",
    dbt_id: "Loading...",
    user_name: "Loading User...",
    dbt_description: "Loading Description...",
    dbt_agree: "Loading...",
    dbt_disagree: "Loading...",
  });
  const getCommentAgree = async () => {
    stance.dbc_stance = 0;
    try {
      const res = await makeRequest.get(`/comments/${dbt_id}`, {
        params: stance,
      });
      setCommentDataAgree(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCommentDisagree = async () => {
    stance.dbc_stance = 1;
    try {
      const res = await makeRequest.get(`/comments/${dbt_id}`, {
        params: stance,
      });
      setCommentDataDisagree(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTopicData = async () => {
    try {
      await Promise.all([getCommentAgree(), getCommentDisagree()]);
      const res = await makeRequest.get("/posts/topic/" + dbt_id);
      setTopicData({
        dbt_id: res.data[0].dbt_id,
        dbt_title: res.data[0].dbt_title,
        user_name: res.data[0].user_name,
        user_id: res.data[0].user_id,
        dbt_description: res.data[0].dbt_description,
        dbt_agree: res.data[0].dbt_agree,
        dbt_disagree: res.data[0].dbt_disagree,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTopicData();
    checkEditTopic();
    getCommentAgree();
    getCommentDisagree();
  }, []);

  useEffect(() => {
    getTagByDebate();
  }, [topicData]);

  const [canEditDelete, setCanEditDelete] = useState(false);
  const checkEditTopic = async () => {
    try {
      const res = await makeRequest.get("/posts/checkedit/" + dbt_id);
      if (res.data === "true") {
        setCanEditDelete(true);
      }
      if (res.data === "false") {
        setCanEditDelete(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let agreeCount = commentDataAgree.length;
  let disagreeCount = commentDataDisagree.length;
  let totalComments = agreeCount + disagreeCount;
  let percentageAgree =
    (agreeCount / totalComments) * 100 ? (agreeCount / totalComments) * 100 : 0;
  let percentageDisAgree =
    (disagreeCount / totalComments) * 100
      ? (disagreeCount / totalComments) * 100
      : 0;

  const handleAgreeComment = () => {
    setSelectedAgreePopup(
      <AddAgreeComment
        onCloseClick={onCommentCloseClick}
        stance={topicData.dbt_agree}
      />
    );
  };
  if (!!selectedAgreePopup) {
    popup = (
      <AddAgreeComment
        onCloseClick={onCommentCloseClick}
        stance={topicData.dbt_agree}
      />
    );
  }

  const handleDisagreeComment = () => {
    setSelectedDisagreePopup(
      <AddDisagreeComment
        onCloseClick={onCommentCloseClick}
        stance={topicData.dbt_disagree}
      />
    );
  };
  if (!!selectedDisagreePopup) {
    popup = (
      <AddDisagreeComment
        onCloseClick={onCommentCloseClick}
        stance={topicData.dbt_disagree}
      />
    );
  }
  const handleDeleteTopic = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "คุณต้องการลบประเด็นโต้แย้ง ?",
        text: "หากคุณตกลงจะเป็นการลบประเด็นโต้แย้งอย่างถาวร !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "grey",
        confirmButtonText: "ใช่ ลบประเด็นโต้แย้ง!",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await makeRequest.delete(`/posts/${dbt_id}`);
          Swal.fire({
            title: "ลบประเด็นโต้แย้งเรียบร้อย!",
            icon: "success",
          }).then(() => {
            navigate("/");
          });
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data,
      });
    }
  };
  const handleAddToFav = async () => {
    try {
      const res = await makeRequest.post("/likes/fav", { dbt_id: dbt_id });
      Swal.fire({
        icon: "success",
        title: res.data,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data,
      });
    }
    setOpen(false);
  };
  if (!!selectedAddtofavPopup) {
    popup = <AddToFavPopup onCloseClick={onCommentCloseClick} />;
  }
  function onCommentCloseClick() {
    popup = null;
    setSelectedAgreePopup(null);
    setSelectedDisagreePopup(null);
    setSelectedEditPopup(null);
    setSelectedAddtofavPopup(null);
    setSelectedAddtoDownloadPopup(null);
    setSelectedReportPopup(null);
    setOpen(false);
  }
  async function addToDownloadList(topicData) {
    if (isAdmin) {
      let downloadList = JSON.parse(localStorage.getItem("downloadList")) || [];
      if (!downloadList.includes(topicData.dbt_id)) {
        downloadList.push(topicData.dbt_id);
        // บันทึกกลับเข้า localStorage
        localStorage.setItem("downloadList", JSON.stringify(downloadList));
        return Swal.fire({
          icon: "success",
          title: "เพิ่มเรียบร้อย",
        });
      }
    } else {
      try {
        const res = await makeRequest.post("/downloads/", topicData);
        if (res.status === 200)
          return Swal.fire({
            icon: "success",
            title: res.data,
          });
        else
          return Swal.fire({
            icon: "error",
            title: res.data,
          });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: err.response.data,
        });
      }
    }
  }

  const handleAddToDownload = () => {
    setOpen(false);
    addToDownloadList(topicData);
  };
  // if(!!selectedAddtoDownloadPopup){
  //   popup = <AddToDownloadPopup onCloseClick={onCommentCloseClick}/>
  // }
  const [selectedCommentData, setSelectedCommentData] = useState(null);
  const handleReportTopic = (commentData) => {
    setSelectedCommentData(commentData);
    setSelectedReportPopup(
      <ReportTopicPopup
        onCloseClick={onCommentCloseClick}
        data={selectedCommentData}
      />
    );
    setOpen(false);
  };
  if (!!selectedReportPopup) {
    popup = (
      <ReportTopicPopup
        onCloseClick={onCommentCloseClick}
        data={selectedCommentData}
      />
    );
  }

  function onCommentCloseClick() {
    popup = null;
    setSelectedAgreePopup(null);
    setSelectedDisagreePopup(null);
    setSelectedEditPopup(null);
    setSelectedAddtofavPopup(null);
    setSelectedAddtoDownloadPopup(null);
    setSelectedReportPopup(null);
    // setSelectedCommentData(null);
    setOpen(false);
  }
  const [topicTag, setTopicTag] = useState([]);
  const getTagByDebate = async () => {
    try {
      const res = await makeRequest.get(
        `/posts/tag/debate/${topicData.dbt_id}`
      );
      setTopicTag(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditTopic = () => {
    setOpen(false);
    setSelectedEditPopup(
      <EditTopicPopup
        onCloseClick={onCommentCloseClick}
        data={topicData}
        tag={topicTag}
      />
    );
  };
  if (!!selectedEditPopup) {
    popup = (
      <EditTopicPopup
        onCloseClick={onCommentCloseClick}
        data={topicData}
        tag={topicTag}
      />
    );
  }
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
      {/* page container */}
      <div className="debate-topic-page-container">
        {/* topic meta data box */}
        <div className="debate-topic-meta-data-container">
          <div className="debate-topic-meta-data-content">
            {/* topic name */}
            <p className="debate-topic-topic-name">{topicData.dbt_title}</p>

            {/* desc row */}
            {/* <h3 className="debate-topic-topic-description-title">
              รายละเอียดประเด็นโต้แย้ง
            </h3> */}
            <div className="debate-topic-description-box">
              <p className="debate-topic-topic-description">
                {topicData.dbt_description}
              </p>
            </div>

            {/* topic tag */}
            <div className="debate-topic-tag-container">
              {/* <p className="debate-topic-label">แท็กที่เกี่ยวข้อง</p> */}

              {topicTag.map((tag) => (
                <TopicTag tagName={tag.tag_title} />
              ))}
            </div>

            {/* creator row */}
            <div className="debate-topic-creator-row">
              <label className="debate-topic-label">สร้างโดย: </label>
              <a className="debate-topic-topic-creator-link">
                {topicData.user_name}
              </a>
              <label className="debate-topic-time-label">สร้างเมื่อ: </label>
              <label className="debate-topic-topic-creator-link">
                วันที่ 1 มกราคม 2565 เวลา 20:00 น.
              </label>
            </div>

            {/* progress bar */}
            <div className="debate-topic-legend-row">
              {/* agree legend */}
              <div className="debate-topic-legend-element">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <circle cx="6.5" cy="6.5" r="6.5" fill="#0DC7B1" />
                </svg>
                <p className="debate-topic-legend-text">
                  {topicData.dbt_agree} {Math.round(percentageAgree)}%
                </p>
              </div>

              {/* disagree legend */}
              <div className="debate-topic-legend-element">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <circle cx="6.5" cy="6.5" r="6.5" fill="#EB5757" />
                </svg>
                <p className="debate-topic-legend-text">
                  {topicData.dbt_disagree} {Math.round(percentageDisAgree)}%
                </p>
              </div>
            </div>
            <div className="debate-topic-option-dropdown">
              <div
                className="debate-topic-option-vert-button"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <img
                  className="debate-topic-option-image"
                  src={optionButtonIcon}
                  alt=""
                />
              </div>
              <div
                id="myDropdown"
                class={`debate-topic-dropdown-content ${
                  open ? "active" : "inactive"
                }`}
              >
                <button onClick={handleAddToFav}>เพิ่มเข้ารายการชื่นชอบ</button>
                <button onClick={handleAddToDownload}>
                  เพิ่มเข้ารายการดาวน์โหลด
                </button>
                {canEditDelete && (
                  <div>
                    <button onClick={handleEditTopic}>
                      แก้ไขประเด็นโต้แย้ง
                    </button>
                    <button onClick={handleDeleteTopic}>
                      ลบประเด็นโต้แย้ง
                    </button>
                  </div>
                )}
                <button onClick={() => handleReportTopic(topicData)}>
                  รายงานปัญหา
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end of meta data part */}

        {/* topic content part */}
        <div className="debate-topic-two-side-container">
          {/* left contaienr */}
          <div className="debate-topic-side-box">
            <div className="debate-topic-side-content-container">
              <p className="debate-topic-side-stance-title">
                {topicData.dbt_agree}
              </p>
              <p className="debate-topic-top-five-title">
                5 อันดับหัวข้อความคิดเห็น
              </p>
              <div className="debate-topic-top-five-tag">
                <CommentTag tagName="ทดสอบ" />
                <CommentTag tagName="ทดสอบสอบ" />
                <CommentTag tagName="ทดสอบ" />
                <CommentTag tagName="สอบสอบสอบ" />
                <CommentTag tagName="ทดสอบ" />
                {/* <TopicTag tagName="สอบสอบสอบ" /> */}
              </div>
              <div className="debate-topic-comment-scroll-box">
                {commentDataAgree.map((commentDataAgree, index) => (
                  <CommentComponent
                    data={commentDataAgree}
                    handleReportTopic={() =>
                      handleReportTopic(commentDataAgree)
                    }
                    dbt_id={dbt_id}
                    key={index}
                  />
                ))}
              </div>
              <button
                className="debate-topic-agree-button"
                onClick={handleAgreeComment}
              >
                แสดงความคิดเห็นสำหรับฝั่ง{topicData.dbt_agree}
              </button>
            </div>
          </div>

          {/* right contaienr */}
          <div className="debate-topic-side-box">
            <div className="debate-topic-side-content-container">
              <p className="debate-topic-side-stance-title">
                {topicData.dbt_disagree}
              </p>
              <p className="debate-topic-top-five-title">
                5 อันดับหัวข้อความคิดเห็น
              </p>
              <div className="debate-topic-top-five-tag">
                <CommentTag tagName="ทดสอบ" />
                <CommentTag tagName="ทดสอบสอบ" />
                <CommentTag tagName="ทดสอบ" />
                <CommentTag tagName="ทดสอบ" />
              </div>
              <div className="debate-topic-comment-scroll-box">
                {commentDataDisagree.map((commentDataDisAgree, index) => (
                  <CommentComponent
                    data={commentDataDisAgree}
                    handleReportTopic={() =>
                      handleReportTopic(commentDataDisAgree)
                    }
                    dbt_id={dbt_id}
                    key={index}
                  />
                ))}
              </div>
              <button
                className="debate-topic-disagree-button"
                onClick={handleDisagreeComment}
              >
                แสดงความคิดเห็นสำหรับฝั่ง{topicData.dbt_disagree}
              </button>
            </div>
          </div>
        </div>
      </div>
      {popup}
    </>
  );
}

export default DebateTopic;

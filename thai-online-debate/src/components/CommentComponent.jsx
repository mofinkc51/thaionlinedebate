import React, { useEffect, useState } from "react";
import userImg from "../assets/profile.png";
import "./CommentComponent.css";
import optionButton from "../assets/icon/more-vertical.png";
import { makeRequest } from "../axios";
import EditCommentPopup from "./topic-popup/EditCommentPopup";
import Swal from "sweetalert2";

function CommentComponent(props) {
  const [isHovered, setIsHovered] = useState(false);

  const [isOptionClicked, setIsOptionClicked] = useState(false);

  const [selectedEditPopup, setSelectedEditPopup] = useState(null);

  const [liked, setLiked] = useState(false);

  const [dateAndTime, setdateAndTime] = useState({
    date: "",
    time: "",
  });

  const { data, handleReportTopic } = props;
  const commentData = {
    dbc_id: data.dbc_id,
    dbc_comment: data.dbc_comment,
    user_pic: data.user_pic,
    timestamp: data.dbc_timestamp,
    user_id: data.user_id,
    dbt_id: data.dbt_id,
  };
  
  // เรียก handleReportTopic พร้อมข้อมูล commentData เมื่อปุ่มถูกกด
  <button onClick={() => handleReportTopic(commentData)}>รายงานปัญหา</button>
  
  const convertTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    const dbc_date = dateObj.toISOString().split("T")[0];
    const dbc_time = dateObj.toTimeString().split(" ")[0];

    setdateAndTime({ date: dbc_date, time: dbc_time });
  };
  useEffect(() => {
    convertTimestamp(commentData.timestamp);
    checkEditComment();
  }, []);

  const [canEditDelete, setCanEditDelete] = useState(false);

  const topicId = window.location.pathname.split("/").pop();
  const checkEditComment = async () => {
    try {
      const res = await makeRequest.get(`/comments/checkedit/${props.id}`, {
        params: { dbt_id: topicId },
      });
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
  const handleEditComment = () => {
    setSelectedEditPopup(
      <EditCommentPopup onCloseClick={onCommentCloseClick} data={commentData} />
    );
  };
  const onCommentCloseClick = () => {
    setSelectedEditPopup(null);
  };
  if (selectedEditPopup) {
    return selectedEditPopup;
  }
  const handleDeleteComment = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "คุณต้องการลบคอมเมนต์ ?",
        text: commentData.dbc_comment + " จะถูกลบอย่างถาวร !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "grey",
        confirmButtonText: "ใช่ ลบคอมเมนต์!",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await makeRequest.delete(`/comments/${commentData.dbc_id}`);
          Swal.fire({
            title: "ลบคอมเมนต์เรียบร้อย !",
            icon: "success",
          }).then(() => {
            window.location.reload();
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

  
  const handleLikeClicked = async () => {
    try {
      const res = await makeRequest.post(`/comments/like/${commentData.dbc_id}`);
      if (res.status === 200) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <div className="comment-component">
        <div className="debate-topic-comment-content">
          <a
            href={`/profile/${commentData.user_id}`}
            className="debate-topic-comment-user"
          >
            <img
              className="debate-topic-comment-user-img"
              src={require("../assets/upload/" + commentData.user_pic)}
              alt=""
            />
          </a>
          <div className="debate-topic-comment-text">
            {commentData.dbc_comment}
          </div>
        </div>
        <div className="comment-action-row">
        <button onClick={handleLikeClicked} className={`comment-like-button ${liked ? "liked" : ""}`}>
            ถูกใจ
        </button>
          <p
            className="comment-timestamp"
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            {isHovered ? dateAndTime.time : dateAndTime.date}
          </p>
        </div>
        <button
          className="comment-option-button"
          onClick={() => setIsOptionClicked(!isOptionClicked)}
        >
          <img src={optionButton} alt="" />
        </button>
        <div
          class={`comment-dropdown-content ${
            isOptionClicked ? "active" : "inactive"
          }`}
        >
          <button onClick={() => handleReportTopic(commentData)}>รายงานปัญหา</button>
          {canEditDelete && (
            <div>
              <button onClick={handleEditComment}>แก้ไข</button>
              <button onClick={handleDeleteComment}>ลบ</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CommentComponent;

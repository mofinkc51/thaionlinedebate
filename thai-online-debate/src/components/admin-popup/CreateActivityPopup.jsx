import React, { useState, useEffect } from "react";
import "./CreateActivityPopup.css";
import closeButtonIcon from "../../assets/icon/close.png";
import axios from "axios";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";
import InputTag from "../input-tag/InputTag";
import { text_validation } from "../../checked";
import { useNavigate } from "react-router-dom";

const CreateActivityPopup = ({ closePopup, onCreate }) => {
  const [actData, setActData] = useState({
    dbt_title: "",
    dbt_description: "",
    act_start_date: "",
    act_end_date: "",
    dbt_agree: "เห็นด้วย",
    dbt_disagree: "ไม่เห็นด้วย",
    tags: [],
  });

  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = searchTerm
    ? items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Get a maximum of 5 items
  const displayedItems = filteredItems.slice(0, 5);
  // end search tag part

  const [err, SetErr] = useState(null);
  const [tagsuggest, setTagseggest] = useState([]);

  const [tags, setTags] = useState([]);
  const handleTagClick = (tag) => {
    if (tags.includes(tag)) {
      // ลบ tag when includes
      setTags(tags.filter((t) => t !== tag));
    } else if (tags.length >= 5) {
      return Swal.fire({
        icon: "info",
        text: "คุณสามารถเลือกแท็กได้ไม่เกิน 5 แท็ก",
      });
    } else {
      setTags([...tags, tag]);
    }
  };
  //useEffect for get tagsuggest
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://api.aiforthai.in.th/tagsuggestion",
          `text=${actData.dbt_title}&numtag=10`,
          {
            headers: {
              Apikey: "OKXVty86JM5w4g7ve9EyJfEfEXVArVHE",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const responseData = response.data;
        if (responseData && responseData.tags) {
          const tagArray = responseData.tags.map((tag) => tag.tag);
          setTagseggest(tagArray);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const delay = setTimeout(() => {
      fetchData();
    }, 2000); // การเรียก fetchData 2 วินาที

    return () => clearTimeout(delay); // เมื่อ component unmount ให้ล้าง timeout
  }, [actData.dbt_title]);

  useEffect(() => {
    getAllTag();
  }, []);
  const getAllTag = async () => {
    try {
      const res = await makeRequest.get("/posts/alltag");
      const tagTitles = res.data.map((row) => row.tag_title);
      setItems(tagTitles);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const userIdFromLocalStorage = userData ? userData.user_id : null;

    setUserId(userIdFromLocalStorage);
  }, []);

  const handleChange = (e) => {
    setActData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setActData({ ...actData, tags: tags });
    if (!text_validation(actData.dbt_title, 8, 50)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "หัวข้อกิจกรรมโต้แย้งต้องมีความยาวระหว่าง " + 8 + " ถึง " + 50,
      }).then(() => {
        document.getElementsByName("dbt_title")[0].focus();
      });
    }
    if (!text_validation(actData.dbt_description, 10, 500)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          "คำอธิบายกิจกรรมโต้แย้งต้องมีความยาวระหว่าง " + 10 + " ถึง " + 500,
      }).then(() => {
        document.getElementsByName("dbt_description")[0].focus();
      });
    }
    if (!text_validation(actData.dbt_agree, 3, 40)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          "ฝั่งที่ 1 ควรมีความยาวระหว่าง " +
          3 +
          " ถึง " +
          40 +
          " เช่น เห็นด้วย",
      }).then(() => {
        document.getElementsByName("dbt_agree")[0].focus();
      });
    }
    if (!text_validation(actData.dbt_disagree, 3, 40)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          "ฝั่งที่ 2 ควรมีความยาวระหว่าง " +
          3 +
          " ถึง " +
          40 +
          " เช่น ไม่เห็นด้วย",
      }).then(() => {
        document.getElementsByName("dbt_disagree")[0].focus();
      });
    }
    if (tags.length === 0 || tags.length > 5) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณาเลือกแท็ก 1 - 5 แท็ก",
      });
    }
    try {
      const response = await makeRequest.post("admin/checktimeactivity", actData);
      // Check the response data for the canProceed flag
      if (!response.data.canProceed) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "กิจกรรมโต้แย้งนี้มีเวลาที่ทับซ้อนกัน",
        });
      }
      console.log("check tag from font-end>>>>>>", tags);
      await makeRequest.post("admin/postactivity", actData);
      Swal.fire({
        icon: "success",
        title: "สร้างกิจกรรมโต้แย้งเรียบร้อย",
      });
      onCreate();
      closePopup();
    } catch (err) {
      console.log(err);
      SetErr(err.response.data);
      Swal.fire({
        icon: "error",
        title: err.response.data,
      });
    }
  };

  useEffect(() => {
    if (tags && tags.length > 0) {
      const uniqueTags = [...new Set(tags)];
      setActData((prev) => ({ ...prev, tags: uniqueTags }));
    }
  }, [tags]);

  // คำนวณวันและเวลาปัจจุบัน
  const now = new Date();
  const currentDate = now.toISOString().substring(0, 16);

  // คำนวณวันที่ปัจจุบันบวก 7 วัน
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const oneWeekFromNowDate = oneWeekFromNow.toISOString().substring(0, 16);

  return (
    <>
      <div className="create-activity-bg-opacity">
        <div className="create-activity-popup-box">
          <div className="create-activity-popup-box-container">
            <form action="">
              <div className="create-activity-title-row">
                <h2>สร้างกิจกรรมโต้แย้ง</h2>
                <button
                  className="create-activity-close-button"
                  onClick={closePopup}
                >
                  <img src={closeButtonIcon} alt="Close" />
                </button>
              </div>

              <div className="create-activity-popup-topicname-row">
                <label className="create-activity-popup-label">
                  หัวข้อกิจกรรมโต้แย้ง
                </label>
                <input
                  type="text"
                  className="create-activity-popup-topicname-input"
                  name="dbt_title"
                  value={actData.dbt_title}
                  onChange={handleChange}
                />
              </div>

              <div className="ccreate-activity-popup-topicdesc-row">
                <label className="create-activity-popup-label">
                  คำอธิบายกิจกรรมโต้แย้ง
                </label>
                <textarea
                  className="create-activity-popup-topicdesc-input"
                  name="dbt_description"
                  value={actData.dbt_description}
                  onChange={handleChange}
                  cols="30"
                  rows="5"
                ></textarea>
              </div>

              <div className="create-activity-stance-row">
                <div className="create-activity-stance">
                  <label className="create-activity-popup-label">
                    วันเริ่มต้นกิจกรรม
                  </label>
                  <input
                    type="datetime-local"
                    className="create-activity-popup-start-date"
                    name="act_start_date"
                    value={actData.act_start_date}
                    onChange={handleChange}
                    min={currentDate} // กำหนดค่าน้อยสุดให้เป็นวันปัจจุบัน
                  />
                </div>
                <div className="create-activity-stance">
                  <label className="create-activity-popup-label">
                    วันสิ้นสุดกิจกรรม
                  </label>
                  <input
                    type="datetime-local"
                    className="create-activity-popup-end-date"
                    name="act_end_date"
                    value={actData.act_end_date}
                    onChange={handleChange}
                    min={oneWeekFromNowDate} // กำหนดค่าน้อยสุดให้เป็นวันปัจจุบันบวก 7 วัน
                  />
                </div>
              </div>

              <div className="create-activity-stance-row">
                <div className="create-activity-stance">
                  <label className="create-activity-popup-label">
                    ฝั่งที่ 1
                  </label>
                  <input
                    type="text"
                    className="create-activity-popup-stance-input"
                    name="dbt_agree"
                    value={actData.dbt_agree}
                    onChange={handleChange}
                  />
                </div>
                <div className="create-activity-stance">
                  <label className="create-activity-popup-label">
                    ฝั่งที่ 2
                  </label>
                  <input
                    type="text"
                    className="create-activity-popup-stance-input"
                    name="dbt_disagree"
                    value={actData.dbt_disagree}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* แท็กที่เลือก */}
              <div className="create-activity-tag-row">
                <p className="create-activity-popup-label">
                  แท็กที่เลือก
                  <span className="tooltip-icon" title="">
                    ?
                  </span>
                </p>
                <div className="input-tag-container">
                  {tags.length === 0 ? (
                    <div className="input-tag-caution">
                      <p>กรุณาเลือกแท็ก 1 - 5 แท็ก</p>
                    </div>
                  ) : (
                    tags.map((tag) => (
                      <InputTag
                        tagNames={tag}
                        onClick={() => handleTagClick(tag)}
                      />
                    ))
                  )}
                </div>
              </div>
              {/* tag row */}
              <div className="create-activity-tag-row">
                <p className="create-activity-popup-label">
                  แท็กที่เกี่ยวข้อง
                  <span
                    className="tooltip-icon"
                    title="เมื่อผู้ใช้ทำการกรอกหัวข้อกิจกรรมโต้แย้ง ระบบจะแนะนำแท็กที่เกี่ยวข้องกับกิจกรรมโต้แย้ง"
                  >
                    ?
                  </span>
                </p>
                <div className="input-tag-container">
                  {tagsuggest.map((tag) => (
                    <button
                      type="button"
                      className={`tag-button ${
                        tags.includes(tag) ? "active" : ""
                      }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* tag search row */}
              <div className="create-activity-search-tag-row">
                <p className="create-activity-popup-label">ค้นหาแท็ก</p>
                <input
                  type="text"
                  placeholder=""
                  className="create-activity-popup-tagsearch-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="tag-choice-drop-down">
                  {displayedItems.length === 0 && searchTerm ? (
                    <div className="tag-choice-row">
                      <p>ไม่พบแท็กที่ค้นหา</p>
                    </div>
                  ) : (
                    displayedItems.map((tag, index) => (
                      <div className="tag-choice-row" key={index}>
                        <div className="tag-choice-row-container">
                          <input
                            type="checkbox"
                            id={`checkbox-${index}`}
                            name={tag}
                            value={tag}
                            checked={tags.includes(tag)}
                            onChange={() => handleTagClick(tag)}
                          />
                          <label htmlFor={`checkbox-${index}`}>{tag}</label>
                          <br />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="create-activity-button-row">
                <button
                  className="create-activity-confirm-button"
                  onClick={handleCreate}
                >
                  สร้าง
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateActivityPopup;

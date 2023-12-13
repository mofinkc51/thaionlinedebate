import React, { useState, useRef, useEffect } from "react";
import closeButtonIcon from "../../assets/icon/close.png";
import { text_validation } from "../../checked";
import Swal from "sweetalert2";
import { makeRequest } from "../../axios";
import axios from "axios";
import InputTag from "../input-tag/InputTag";
function EditActivityPopup({ activity, onClose, refresh }) {
  const [items, setItems] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const toSqlDateTime = (isoString) => {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 19).replace("T", " "); // MySQL format
  };

  const filteredItems = searchTerm
    ? items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  // Get a maximum of 5 items
  const displayedItems = filteredItems.slice(0, 5);
  // end search tag part
  const [topicData, setTopicData] = useState({});
  // const [topicData, setTopicData] = useState({
  //     dbt_title: activity.dbt_title,
  //     dbt_description: activity.dbt_description,
  //     dbt_agree: activity.dbt_agree,
  //     dbt_disagree: activity.dbt_disagree,
  //     dbt_id: activity.dbt_id
  // });
  // เริ่มต้น tags state โดยใช้ function ที่คำนวณค่าจาก props ครั้งเดียว
  const [tags, setTags] = useState([]);

  const handleChange = (e) => {
    setTopicData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const titleInputRef = useRef(null);
  const descInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTopicData({
      ...topicData,
      tags: tags,
      dbt_id: activity.dbt_id,
      act_end_date: activity.act_end_date,
      act_end_date: toSqlDateTime(activity.act_end_date),
    });
    if (!text_validation(topicData.dbt_title, 8, 50)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "หัวข้อประเด็นโต้แย้งต้องมีความยาวระหว่าง " + 8 + " ถึง " + 50,
      }).then(() => {
        document.getElementsByName("dbt_title")[0].focus();
      });
    }
    if (!text_validation(topicData.dbt_description, 10, 500)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          "คำอธิบายประเด็นโต้แย้งต้องมีความยาวระหว่าง " + 10 + " ถึง " + 500,
      }).then(() => {
        document.getElementsByName("dbt_description")[0].focus();
      });
    }
    if (!text_validation(topicData.dbt_agree, 3, 40)) {
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
    if (!text_validation(topicData.dbt_disagree, 3, 40)) {
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
    if (tags.length === 0 || tags.length > 5) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณาเลือกแท็ก 1 - 5 แท็ก",
      });
    }
    try {
      await makeRequest.put(`admin/editactivity`, topicData);
      Swal.fire({
        icon: "success",
        title: "สร้างประเด็นโต้แย้งเรียบร้อย",
      }).then(() => {
        refresh();
        onClose();
        // window.location.reload()
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data,
      });
    }
  };

  const toLocalDateTime = (isoString) => {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm format
  };
  const now = new Date();
  const currentDate = now.toISOString().substring(0, 16);

  // คำนวณวันที่ปัจจุบันบวก 7 วัน
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const oneWeekFromNowDate = oneWeekFromNow.toISOString().substring(0, 16);

  const [tagsuggest, setTagseggest] = useState([]);

  //useEffect for get tagsuggest
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://api.aiforthai.in.th/tagsuggestion",
          `text=${topicData.dbt_title}&numtag=10`,
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
  }, [topicData.dbt_title]);

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

  const getTopicData = async () => {
    try {
      const res = await makeRequest.get("/posts/topic/" + activity.dbt_id);
      setTopicData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const getTagByDebate = async () => {
    try {
      const res = await makeRequest.get(`/posts/tag/debate/${activity.dbt_id}`);
      const tagTitles = res.data.map((row) => row.tag_title);
      setTags(tagTitles);
    } catch (err) {
      console.log(err);
    }
  };

  // const setDefualtTag = () => {
  //   setTags(topicTag.map(t => t.tag_title))
  // }

  useEffect(() => {
    // ใช้ useEffect นี้เพื่อโหลดข้อมูลจากเซิร์ฟเวอร์และตั้งค่า tags เริ่มต้น
    const fetchData = async () => {
      await getTopicData();
      await getTagByDebate();
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTopicData((currentTopic) => ({ ...currentTopic, tags }));
  }, [tags]);

  useEffect(() => {
    if (!topicData.act_end_date || !topicData.act_start_date) {
      setTopicData((currentTopic) => ({
        ...currentTopic,
        act_start_date: toLocalDateTime(activity.act_start_date),
        act_end_date: toLocalDateTime(activity.act_end_date),
      }));
    }
  }, [topicData]);

  const handleTagClick = (tag) => {
    if (tags.includes(tag)) {
      // ลบ tag when includes
      setTags(tags.filter((t) => t !== tag));
    } else if (tags.length >= 5) {
      // จำกัดจำนวนแท็กที่เลือกได้
      Swal.fire({
        icon: "info",
        text: "คุณสามารถเลือกแท็กได้ไม่เกิน 5 แท็ก",
      });
    } else {
      // เพิ่มแท็กใหม่
      setTags([...tags, tag]);
    }
  };
  return (
    <>
      <div className="create-activity-bg-opacity">
        <div className="create-activity-popup-box">
          <div className="create-activity-popup-box-container">
            <form>
              {/* Topic title row */}
              <div className="create-activity-title-row">
                <h2>แก้ไขกิจกรรมโต้แย้ง</h2>
                <button
                  className="create-activity-close-button"
                  onClick={onClose}
                >
                  <img src={closeButtonIcon} alt="" />
                </button>
              </div>
              {/* Topic name row */}
              <div className="create-activity-popup-topicname-row">
                <label className="create-activity-popup-label">
                  หัวข้อกิจกรรมโต้แย้ง
                </label>
                <input
                  type="text"
                  className="create-activity-popup-topicname-input"
                  name="dbt_title"
                  value={topicData.dbt_title}
                  onChange={handleChange}
                  required
                  ref={titleInputRef}
                />
              </div>
              {/* Topic desc row */}
              <div className="create-activity-popup-topicdesc-row">
                <label className="create-activity-popup-label">
                  คำอธิบายกิจกรรมโต้แย้ง
                </label>
                <textarea
                  className="create-activity-popup-topicdesc-input"
                  name="dbt_description"
                  id=""
                  cols="30"
                  rows="5"
                  value={topicData.dbt_description}
                  onChange={handleChange}
                  required
                  ref={descInputRef}
                ></textarea>
              </div>
              {/* date row */}
              <div className="create-activity-stance-row">
                {/* start date */}
                <div className="create-activity-stance">
                  <label className="create-activity-popup-label">
                    วันเริ่มต้นกิจกรรม
                  </label>
                  <input
                    type="datetime-local"
                    className="create-activity-popup-start-date"
                    value={
                      topicData.act_start_date
                        ? toLocalDateTime(topicData.act_start_date)
                        : toLocalDateTime(activity.act_start_date)
                    }
                    name="act_start_date"
                    onChange={handleChange}
                    min={currentDate} // กำหนดค่าน้อยสุดให้เป็นวันปัจจุบัน
                  />
                </div>
                {/* end date */}
                <div className="create-activity-stance">
                  <label className="create-activity-popup-label">
                    วันสิ้นสุดกิจกรรม
                  </label>
                  <input
                    type="datetime-local"
                    className="create-activity-popup-end-date"
                    name="act_end_date"
                    value={
                      topicData.act_end_date
                        ? toLocalDateTime(topicData.act_end_date)
                        : toLocalDateTime(activity.act_end_date)
                    }
                    onChange={handleChange}
                    min={oneWeekFromNowDate} // กำหนดค่าน้อยสุดให้เป็นวันปัจจุบันบวก 7 วัน
                  />
                </div>
              </div>
              {/* Stance row */}
              <div className="create-activity-stance-row">
                {/* Stance one */}
                <div className="create-activity-stance">
                  <label className="create-activity-popup-label">
                    ฝั่งที่ 1
                  </label>
                  <input
                    type="text"
                    className="create-activity-popup-stance-input"
                    name="dbt_agree"
                    value={topicData.dbt_agree}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Stance two */}
                <div className="create-activity-stance">
                  <label className="create-activity-popup-label">
                    ฝั่งที่ 2
                  </label>
                  <input
                    type="text"
                    className="create-activity-popup-stance-input"
                    name="dbt_disagree"
                    value={topicData.dbt_disagree}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* tag row */}
              <div className="create-topic-tag-row">
                <p className="create-topic-popup-label">
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
              <div className="create-topic-tag-row">
                <p className="create-topic-popup-label">
                  แท็กที่เกี่ยวข้อง
                  <span
                    className="tooltip-icon"
                    title="เมื่อผู้ใช้ทำการกรอกหัวข้อประเด็นโต้แย้ง ระบบจะแนะนำแท็กที่เกี่ยวข้องกับประเด็นโต้แย้ง"
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
              <div className="create-topic-search-tag-row">
                <p className="create-topic-popup-label">ค้นหาแท็ก</p>
                <input
                  type="text"
                  placeholder=""
                  className="create-topic-popup-tagsearch-input"
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
              {/* button row */}
              <div className="create-activity-button-row">
                <button
                  className="create-activity-confirm-button"
                  onClick={handleSubmit}
                >
                  แก้ไข
                </button>
                <button
                  className="create-activity-cancel-button"
                  onClick={onClose}
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditActivityPopup;

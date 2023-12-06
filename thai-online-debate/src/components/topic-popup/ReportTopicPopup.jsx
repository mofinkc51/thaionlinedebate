import React, { useEffect, useRef, useState } from "react";
import "./ReportTopicPopup.css";
import closeButtonIcon from "../../assets/icon/close.png";
import Swal from "sweetalert2";
import { makeRequest } from "../../axios";

function ReportTopicPopup(props) {
  const inputRef = useRef();
  const { onCloseClick, data } = props;
  const [reportData, setReportData] = useState({
    rp_description: "",
    dbt_id: data.dbt_id,
    dbc_id: data.dbc_id,
    rp_type: "",
  });

  const handleChange = (e) => {
    setReportData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!reportData.rp_description || !reportData.rp_type) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกรายละเอียดปัญหาและเลือกประเภทปัญหา",
        didClose: () => {
          setTimeout(() => inputRef.current.focus(), 10);
        },
      });
      return;
    }
    try {
      await makeRequest.post("/reports", reportData);
      Swal.fire({
        icon: "success",
        title: "ส่งข้อความรายงานปัญหาเรียบร้อย",
      });
      onCloseClick();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data,
      });
    }
  };
  return (
    <>
      <div className="report-topic-bg-opacity">
        <div className="report-topic-popup-box">
          <div className="report-topic-popup-box-container">
            {/* request title row */}
            <div className="report-topic-title-row">
              <h2>รายงานปัญหา</h2>
              <button
                className="report-topic-close-button"
                onClick={onCloseClick}
              >
                <img src={closeButtonIcon} alt="" />
              </button>
            </div>
            {/* report type */}
            <div className="report-topic-popup-topicdesc-row">
              <label className="report-topic-popup-label">ประเภทของปัญหา</label>
              <select
                className="report-topic-dropdown"
                value={reportData.rp_type}
                onChange={(e) =>
                  setReportData({ ...reportData, rp_type: e.target.value })
                }
                required
              >
                <option value="">เลือกประเภทปัญหา</option>
                <option value="inappropriate_content">เนื้อหาไม่เหมาะสม</option>
                <option value="hate_speech">การแสดงความเกลียดชัง</option>
                <option value="spam">สแปมหรือเนื้อหาที่ไม่เกี่ยวข้อง</option>
                <option value="fake_news">ข้อมูลเท็จหรือหลอกลวง</option>
                <option value="unrealistic">
                  เนื้อหาที่ไม่เหมาะสมสำหรับเยาวชน
                </option>
                <option value="other">อื่นๆ</option>
                {/* ...ตัวเลือกอื่นๆ */}
              </select>
            </div>
            {/* report desc row */}
            <div className="report-topic-popup-topicdesc-row">
              <label className="report-topic-popup-label">
                รายละเอียดปัญหา
              </label>
              <textarea
                className="report-topic-popup-topicdesc-input"
                name="rp_description"
                cols="30"
                rows="5"
                onChange={handleChange}
                ref={inputRef}
                required
              ></textarea>
            </div>

            {/* button row */}
            <div className="report-topic-button-row">
              <button
                className="report-topic-confirm-button"
                onClick={onSubmit}
              >
                รายงาน
              </button>
              <button
                className="report-topic-cancel-button"
                onClick={onCloseClick}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportTopicPopup;

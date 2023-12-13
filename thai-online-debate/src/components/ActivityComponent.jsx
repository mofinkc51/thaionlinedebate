import React from "react";
import "./ActivityComponent.css";
import TopicTag from "./TopicTag";
import eventIcon from "../assets/icon/activity.png";

function ActivityComponent() {
  const topicData = {
    dbt_title: "ประเทศไทยควรยกเลิกการเกณฑ์ทหารหรือไม่",
    dbt_description:
      "ในปัจจุบันประเทศไทยใช้ระบบการเกณฑ์ทหารซึ่งบังคับให้ชายไทยที่มีอายุครบ 21 ปี ต้องเข้ารับการเกณฑ์ทหารเป็นเวลา 2 ปี บางคนมองว่าระบบการเกณฑ์ทหารเป็นระบบที่ล้าสมัยและควรยกเลิก ส่วนบางคนมองว่าระบบการเกณฑ์ทหารเป็นระบบที่มีประโยชน์และควรรักษาไว้",
    user_name: "ชื่อผู้สร้าง",
    dbt_agree: 10,
    dbt_disagree: 90,
  };
  return (
    <>
      <div className="activity-component-meta-data-container">
        <div className="activity-component-meta-data-content">
          {/* topic name */}
          <div className="activity-component-topic-name-row">
            <img src={eventIcon} alt="" className="activity-component-icon" />
            <p className="activity-component-topic-name">
              {topicData.dbt_title}
            </p>
          </div>

          {/* desc row */}
          {/* <h3 className="activity-component-topic-description-title">
              รายละเอียดประเด็นโต้แย้ง
            </h3> */}
          <div className="activity-component-description-box">
            <p className="activity-component-topic-description">
              {topicData.dbt_description}
            </p>
          </div>

          {/* topic tag */}
          <div className="activity-component-tag-container">
            {/* <p className="activity-component-label">แท็กที่เกี่ยวข้อง</p> */}

            {/* {topicTag.map((tag) => (
              <TopicTag tagName={tag.tag_title} />
            ))} */}
            <TopicTag tagName="ทดลอง" />
            <TopicTag tagName="ทดลอง" />
            <TopicTag tagName="ทดลอง" />
            <TopicTag tagName="ทดลอง" />
          </div>

          {/* creator row */}
          {/* <div className="activity-component-creator-row">
            <label className="activity-component-label">สร้างโดย: </label>
            <a className="activity-component-topic-creator-link">
              ชื่อผู้สร้าง
            </a>
            <label className="activity-component-time-label">
              สร้างเมื่อ:{" "}
            </label>
            <label className="activity-component-topic-creator-link">
              วันที่ 1 มกราคม 2565 เวลา 20:00 น.
            </label>
          </div> */}

          {/* progress bar */}
          <div className="activity-component-legend-row">
            {/* agree legend */}
            <div className="activity-component-legend-element">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle cx="6.5" cy="6.5" r="6.5" fill="#0DC7B1" />
              </svg>
              <p className="activity-component-legend-text">
                {/* {topicData.dbt_agree} {Math.round(percentageAgree)}% */}
              </p>
            </div>

            {/* disagree legend */}
            <div className="activity-component-legend-element">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle cx="6.5" cy="6.5" r="6.5" fill="#EB5757" />
              </svg>
              <p className="activity-component-legend-text">
                {/* {topicData.dbt_disagree} {Math.round(percentageDisAgree)}% */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityComponent;

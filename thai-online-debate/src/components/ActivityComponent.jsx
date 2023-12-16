import React, { useEffect, useState } from "react";
import "./ActivityComponent.css";
import TopicTag from "./TopicTag";
import eventIcon from "../assets/icon/activity.png";
import { makeRequest } from "../axios";
import { Link } from "react-router-dom";

function ActivityComponent(props) {
  const topicData = {
    dbt_id: props.data.dbt_id,
    dbt_title: props.data.dbt_title,
    dbt_description: props.data.dbt_description,
  };
  const [topicTag, setTopicTag] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // เพิ่ม state สำหรับติดตามสถานะการโหลด
  const getTagByDebate = async () => {
    try {
      const res = await makeRequest.get(
        `/posts/tag/debate/${topicData.dbt_id}`
      );
      setTopicTag(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (topicData.dbt_id) {
      getTagByDebate();
    }
  }, [topicData.dbt_id]);
  return (
    <>
      <Link className="activity-link" to={`/topic/${topicData.dbt_id}`}>
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
              {isLoading ? (
                <p>Loading tags...</p> // แสดงข้อความหรือ spinner ในขณะที่ข้อมูลกำลังโหลด
              ) : (
                topicTag.map((tag) => (
                  <TopicTag key={tag.id} tagName={tag.tag_title} /> // ใช้ key prop เพื่อประสิทธิภาพในการ render
                ))
              )}
              {/* <TopicTag tagName="ทดลอง" />
            <TopicTag tagName="ทดลอง" />
            <TopicTag tagName="ทดลอง" />
            <TopicTag tagName="ทดลอง" /> */}
            </div>

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
      </Link>
    </>
  );
}

export default ActivityComponent;

import React, { useEffect, useState } from "react";
import UserNavbar, { createTopic } from "../../components/Navbar/UserNavBar";
import "./home.css";
import bbImg from "../../assets/billboard-1.png";
import TopicComponent from "../../components/TopicComponent";
import CreateTopicPopup from "../../components/CreateTopicPopup";
import { makeRequest } from "../../axios";
import { Navigate, useNavigate } from "react-router-dom";
import searchButton from "../../assets/icon/search.png";
import BannerSlider from "../../components/banner-silder/BannerSlider";

function Home() {
  // search tag part

  // const items = [
  //   "การเมือง",
  //   "การเมืองไทย",
  //   "เที่ยวไทย",
  //   "เที่ยวต่างประเทศ",
  //   "เศรษฐกิจ",
  //   "เที่ยว JAPAN",
  //   "เที่ยว KOREA",
  //   "เที่ยว USA",
  //   "เที่ยว EUROPE",
  //   "เที่ยว CHINA",
  // ];

  const [items, setItems] = useState([
    {
      dbt_title: "ประเด็นโต้แย้ง",
      dbt_id: "1234",
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = searchTerm
      ? items.filter((item) =>
          item.dbt_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : items;

  // Get a maximum of 5 items
  const displayedItems = filteredItems.slice(0, 5);

  // end search tag part

  const [debate, setDebate] = useState([]);
  const navigate = useNavigate();

  const getTopTopics = async () => {
    try {
      const res = await makeRequest.get("/posts/tops");
      return setDebate(res.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/signin");
      }
      console.log(err);
    }
  };

  const getTopicSearch = async () => {
    try {
      const res = await makeRequest.get("/posts/search");
      return setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTopTopics();
    getTopicSearch();
    console.log(items);
  }, []);

  return (
    <>
      <UserNavbar />
      {/* page-container */}
      <div className="homepage-container">
        {/* Tag bar and search box container is here */}
        <div className="tag-search-container">
          {/* tag container left side */}
          <div className="tag-bar-container">
            <div className="tag-item">
              <p>เทคโนโลยี</p>
            </div>
            <div className="tag-item">
              <p>สังคม</p>
            </div>
            <div className="tag-item">
              <p>การศึกษา</p>
            </div>
            <div className="tag-item">
              <p>การเมือง</p>
            </div>
            <div className="tag-item">
              <p>การทหาร</p>
            </div>
          </div>
          {/* search box container right side */}
          <div className="search-bar-container">
            <button>
              <img src={searchButton} />
            </button>
            <input
              type="text"
              placeholder="ค้นหาประเด็นโต้แย้ง"
              className="search-box"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <input type="text" className='search-box' placeholder='ค้นหาประเด็นโต้แย้ง'/> */}
            <div className='debate-choice-drop-down'>
              {searchTerm && displayedItems.length === 0 ? (
                 <div className="debate-choice-row">
                    <p>ไม่พบประเด็นโต้แย้งที่ค้นหา</p>
                  </div>
                  ) : (
                    searchTerm &&
                    displayedItems.map((item, index) => 
                      <div className='debate-choice-row' key={index}>
                          <div className="debate-choice-row-container">
                              <a href={`/topic/${item.dbt_id}`}>{item.dbt_title}</a>
                          </div>           
                      </div>
                    )
                  )}
                  </div>
              </div>
         </div>

        {/* Banner */}
        {/* <div className="billboard-container">
          <img src={bbImg} alt="" className='billboard-img'/>
        </div> */}
        <BannerSlider />
        {/*  */}

        {/* Popular topic */}
        <h2 className="popular-title">Popular Topic</h2>

        <div className="popular-topic-container">
          {/* <h2 className='popular-title'>Popular Topic</h2> */}
          <div className="popular-topic-grid">
            {debate.map((debate) => (
              <TopicComponent 
              topicname={debate.dbt_title} 
              id={debate.dbt_id} 
              refresh={getTopTopics}
              />
            ))}
            {/* <TopicComponent topicname={debate[0].dbt_title} getTops={showTopic}/>
            <TopicComponent topicname={debate[1].dbt_title} getTops={showTopic}/>
            <TopicComponent topicname={debate[2].dbt_title} getTops={showTopic}/> */}
          </div>
        </div>
      </div>
      <div id="create-topic-popup" display="none">
        <CreateTopicPopup />
      </div>
    </>
  );
}

console.log(window.location.origin);

export default Home;

import React, { useEffect, useState, useContext } from "react";
import UserNavBar, { createTopic } from "../../components/Navbar/UserNavBar";
import "./home.css";
import bbImg from "../../assets/billboard-1.png";
import TopicComponent from "../../components/TopicComponent";
import CreateTopicPopup from "../../components/CreateTopicPopup";
import { makeRequest } from "../../axios";
import { Navigate, useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/Navbar/AdminNavBar";
import { AuthContext } from "../../context/authContext";
import searchButton from "../../assets/icon/search.png";
import BannerSlider from "../../components/banner-silder/BannerSlider";
import Swal from "sweetalert2";
import DownloadDetailPopup from "../../components/download-request-popup/DownloadDetailPopup";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [debate, setDebate] = useState([
    {
      dbt_id: "",
      dbt_title: "",
    },
  ]);
  const [tags, setTags] = useState([]);

  const [items, setItems] = useState([
    {
      dbt_title: "ประเด็นโต้แย้ง",
      dbt_id: "1234",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const getTopicSearch = async () => {
    try {
      const res = await makeRequest.get("/posts/search");
      return setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [allTags, setAllTags] = useState([]);

  const filteredItems = searchTerm
    ? items
        .filter((item) =>
          item.dbt_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((item) => ({ ...item, href: `/topic/${item.dbt_id}` })) // สร้าง property href สำหรับ items
    : items;

  const filteredTags = searchTerm
    ? allTags
        .filter((tag) =>
          tag.tag_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((tag) => ({
          dbt_title: `#${tag.tag_title}`,
          href: `/tag/${tag.tag_title}`,
        })) // สร้าง property href สำหรับ tags
    : allTags;

  // รวม filteredItems และ filteredTags
  const combinedFilteredResults = [...filteredItems, ...filteredTags].slice(0,5);
  
  const handleTagClicked = async (e) => {
    console.log(e);
    try {
      navigate(`/tag/${e}`);
    } catch (err) {
      console.log(err);
    }
  };
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
  const getTags = async () => {
    try {
      const res = await makeRequest.get("/posts/tags");
      console.log(res.data);
      return setTags(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllTags = async () => {
    try {
      const res = await makeRequest.get("/posts/alltag");
      return setAllTags(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTopTopics();
    getTopicSearch();
    getTags();
    getAllTags();
  }, []);

  //check admin
  const [isAdmin, setIsAdmin] = useState(false);
  const checkadmin = async () => {
    try {
      const res = await makeRequest.get("/auth/admin-checked")
      if (res.data === "true") {
        setIsAdmin(true)
      }
      console.log(res.data)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    checkadmin()
  }, [])

  return (
    <>
      {isAdmin ? <AdminNavBar /> : <UserNavBar />}
      {/* page-container */}
      <div className="homepage-container">
        {/* Tag bar and search box container is here */}
        <div className="tag-search-container">
          {/* tag container left side */}
          <div className="tag-bar-container">
            {tags.map((tag) => (
              <div className="tag-item" onClick={() => handleTagClicked(tag.tag_title)}>
                <span className="tag-item-span">{tag.tag_title}</span>
              </div>
            ))}
          </div>
          {/* search box container right side */}
          <div className="search-bar-container">
            <button>
              <img src={searchButton} />
            </button>
            <input
              type="text"
              placeholder="ค้นหา"
              className="search-box"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <input type="text" className='search-box' placeholder='ค้นหาประเด็นโต้แย้ง'/> */}
            <div className="debate-choice-drop-down">
              {searchTerm && combinedFilteredResults.length === 0 ? (
                <div className="debate-choice-row">
                  <p>ไม่พบประเด็นโต้แย้งที่ค้นหา</p>
                </div>
              ) : (
                searchTerm &&
                combinedFilteredResults.map((result, index) => (
                  <div className="debate-choice-row" key={index}>
                    <div className="debate-choice-row-container">
                      <a
                        href={result.href}
                        // href={`/topic/${item.dbt_id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {result.dbt_title}
                      </a>
                    </div>
                  </div>
                ))
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
          </div>
        </div>
      </div>
      <div id="create-topic-popup" display="none">
        <CreateTopicPopup />
      </div>
    </>
  );
}
export default Home;
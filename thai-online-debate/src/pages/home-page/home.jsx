import React , { useEffect , useState}from 'react'
import UserNavbar, { createTopic } from '../../components/Navbar/UserNavBar'
import './home.css'
import bbImg from '../../assets/billboard-1.png'
import TopicComponent from '../../components/TopicComponent'
import CreateTopicPopup from '../../components/CreateTopicPopup'
import { makeRequest } from '../../axios'
import { Navigate, useNavigate } from 'react-router-dom'
import searchButton from '../../assets/icon/search.png'

function Home() {
  
  const [debate,setDebate] = useState([{
    dbt_id:"",
    dbt_title:"",
  }]);
  const navigate = useNavigate();

  const getTopTopics = async () => {
    try {
      const res = await makeRequest.get('/posts/tops')
      console.log(res.data);
      return setDebate(res.data)
    } catch (err) {
      if (err.response.status === 401) {
        navigate('/signin');
      }
      console.log(err);
    }
  }
  useEffect(() => {
    getTopTopics();
  },[]);


  return (
    <>
      <UserNavbar/>
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
            <button><img src={searchButton}/></button>
            <input type="text" className='search-box' placeholder='ค้นหาประเด็นโต้แย้ง'/>
          </div>
          
        </div>

        {/* Banner */}
        <div className="billboard-container">
          <img src={bbImg} alt="" className='billboard-img'/>
        </div>
        {/*  */}

        {/* Popular topic */}
        <div className="popular-topic-container">
          <h2 className='popular-title'>Popular Topic</h2>
          <div className="popular-topic-grid">
            {debate.map((debate) => (
              <TopicComponent topicname={debate.dbt_title} id={debate.dbt_id}/>
            ))}
            {/* <TopicComponent topicname={debate[0].dbt_title} getTops={showTopic}/>
            <TopicComponent topicname={debate[1].dbt_title} getTops={showTopic}/>
            <TopicComponent topicname={debate[2].dbt_title} getTops={showTopic}/> */}
          </div>
        </div>
      </div>
      <div id="create-topic-popup" display="none">
          <CreateTopicPopup/>
      </div>
    </>
  )
}

console.log(window.location.origin);

export default Home;
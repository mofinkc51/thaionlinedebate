import React, {useState, useEffect, useRef, useMemo} from 'react';
import './DebateTopic.css'
import UserNavbar from '../../components/Navbar/UserNavBar'
import TopicTag from '../../components/TopicTag'
import optionButtonIcon from '../../assets/icon/more-vertical.png'
import userImg from '../../assets/profile.png'
import CommentComponent from '../../components/CommentComponent'
import AddAgreeComment from '../../components/topic-popup/AddAgreeComment'
import AddDisagreeComment from '../../components/topic-popup/AddDisagreeComment'
import EditTopicPopup from '../../components/topic-popup/EditTopicPopup';
import DeleteTopicPopup from '../../components/topic-popup/DeleteTopicPopup';
import AddToFavPopup from '../../components/topic-popup/AddToFavPopup';
import AddToDownloadPopup from '../../components/topic-popup/AddToDownloadPopup';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios';

function DebateTopic(props) {


  const [open, setOpen] = useState(false);

  const [selectedAgreePopup, setSelectedAgreePopup] = useState(null)
  const [selectedDisagreePopup, setSelectedDisagreePopup] = useState(null)
  const [selectedEditPopup, setSelectedEditPopup] = useState(null)
  const [selectedDeletePopup, setSelectedDeletePopup] = useState(null)
  const [selectedAddtofavPopup, setSelectedAddtofavPopup] = useState(null)
  const [selectedAddtoDownloadPopup, setSelectedAddtoDownloadPopup] = useState(null)

  let popup = null
  
  
  const topicId = window.location.pathname.split("/").pop();
  
  let stance = {
    dbc_stance: 0
  }
  
  let [commentDataAgree, setCommentDataAgree] = useState([]);
  let [commentDataDisagree, setCommentDataDisagree] = useState([]);
  
  const [topicData, setTopicData] = useState({
    topicName: "Loading...",
    topicCreator: "Loading User...",
    topicDescription: "Loading Description..."
  });
  const getCommentAgree = async () => {
    stance.dbc_stance = 0;
    try {
      const res = await makeRequest.get(`/comments/${topicId}`, { params: stance });
      console.log(res.data[0]);
      setCommentDataAgree(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const getCommentDisagree = async () => {
    stance.dbc_stance = 1;
    try {
      const res = await makeRequest.get(`/comments/${topicId}`, { params: stance });
      console.log(res.data[0]);
      setCommentDataDisagree(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const getTopicData = async () => {
    try {
      
      await Promise.all([getCommentAgree(), getCommentDisagree()]);
      const res = await makeRequest.get('/posts/topic/' + topicId);
      console.log(res.data[0]);
  
  
      return setTopicData({
        topicName: res.data[0].dbt_title,
        topicCreator: res.data[0].user_id,
        topicDescription: res.data[0].dbt_description
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getTopicData();
    getCommentAgree();
    getCommentDisagree();
  }, []);

  let agreeCount = commentDataAgree.length;
  let disagreeCount = commentDataDisagree.length;
  let totalComments = agreeCount + disagreeCount;
  let percentageAgree = (agreeCount / totalComments) * 100;
  let percentageDisAgree = (disagreeCount / totalComments) * 100;


  const handleAgreeComment = () => {
    setSelectedAgreePopup(<AddAgreeComment onCloseClick={onCommentCloseClick}/>)
  }
  const handleDisagreeComment = () => {
    setSelectedDisagreePopup(<AddDisagreeComment onCloseClick={onCommentCloseClick}/>)
  }

  const handleEditTopic = () => {
    setOpen(false)
    setSelectedEditPopup(<EditTopicPopup onCloseClick={onCommentCloseClick}/>)
  }

  const handleDeleteTopic = () => {
    setOpen(false)
    setSelectedDeletePopup(<DeleteTopicPopup onCloseClick={onCommentCloseClick}/>)
  }

  const handleAddToFav = () => {
    setOpen(false)
    setSelectedAddtofavPopup(<AddToFavPopup onCloseClick={onCommentCloseClick}/>)
  }

  const handleAddToDownload = () => {
    setOpen(false)
    setSelectedAddtoDownloadPopup(<AddToDownloadPopup onCloseClick={onCommentCloseClick}/>)
  }

  if(!!selectedAgreePopup){
    popup = <AddAgreeComment onCloseClick={onCommentCloseClick}/>
  }

  if(!!selectedDisagreePopup){
    popup = <AddDisagreeComment onCloseClick={onCommentCloseClick}/>
  }

  if(!!selectedEditPopup){
    popup = <EditTopicPopup onCloseClick={onCommentCloseClick}/>

  }

  if(!!selectedDeletePopup){
    popup = <DeleteTopicPopup onCloseClick={onCommentCloseClick}/>
  }

  if(!!selectedAddtofavPopup){
    popup = <AddToFavPopup onCloseClick={onCommentCloseClick}/>

  }

  if(!!selectedAddtoDownloadPopup){
    popup = <AddToDownloadPopup onCloseClick={onCommentCloseClick}/>
  }

  function onCommentCloseClick(){
    popup = null
    setSelectedAgreePopup(null)
    setSelectedDisagreePopup(null)
    setSelectedEditPopup(null)
    setSelectedDeletePopup(null)
    setSelectedAddtofavPopup(null)
    setSelectedAddtoDownloadPopup(null)
  }

  return (
    <>
        <UserNavbar />
        {/* page container */}
        <div className="debate-topic-page-container">
           {/* topic meta data box */}
          <div className="debate-topic-meta-data-container">
            {/* left content */}
            <div className='debate-topic-meta-data-left-content'>
              {/* topic name */}
              <p className='debate-topic-topic-name'>{topicData.topicName}</p>
              {/* topic tag */}
              <p className='debate-topic-label'>แท็กที่เกี่ยวข้อง:</p>

              <div className='debate-topic-tag-container'>
                <TopicTag tagName="เทคโนโลยี"/>
                {/* <TopicTag tagName="เซมิคอนดัคเตอร์"/> */}
                

              </div>
              {/* topic creator row */}
              <label className='debate-topic-label'>สร้างโดย: </label>
              <a className='debate-topic-topic-creator-link'>{topicData.topicCreator}</a>
            </div>
            {/* right content */}
            <div className="debate-topic-meta-data-right-content">
              <div className="debate-topic-description-box">
                <p className='debate-topic-topic-description'>{topicData.topicDescription}</p>
              </div>
              <p className='debate-topic-progress-bar-title'>อัตราส่วนการโต้แย้ง</p>
              {/* <progress className='debate-topic-progress-bar' id="file" value="70" max="100"></progress>  */}
              
              <div className="debate-topic-legend-row">
                {/* agree legend */}
                <div className='debate-topic-legend-element'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="6.5" fill="#0DC7B1"/>
                  </svg>
                  <p className='debate-topic-legend-text'>เห็นด้วย {Math.round(percentageAgree)}%</p>
                </div>

                {/* disagree legend */}
                <div className='debate-topic-legend-element'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="6.5" fill="#EB5757"/>
                  </svg>
                  <p className='debate-topic-legend-text'>ไม่เห็นด้วย {Math.round(percentageDisAgree)}%</p>
                </div>

              </div>
              
            </div>
            
            {/* drop down button */}
            <div className="debate-topic-option-dropdown">
              <div className="debate-topic-option-vert-button" onClick={()=>{setOpen(!open)}}>
                <img className='debate-topic-option-image' src={optionButtonIcon} alt="" />
              </div>
              <div id="myDropdown" class={`debate-topic-dropdown-content ${open? "active": "inactive"}`}>
                <button onClick={handleAddToFav}>เพิ่มเข้ารายการชื่นชอบ</button>
                <button onClick={handleAddToDownload}>เพิ่มเข้ารายการดาวน์โหลด</button>
                <button onClick={handleEditTopic}>แก้ไขประเด็นโต้แย้ง</button>
                <button onClick={handleDeleteTopic}>ลบประเด็นโต้แย้ง</button>
              </div>
            </div>

          </div>
          {/* end of meta data part */}

          {/* topic content part */}
          <div className="debate-topic-two-side-container">
            {/* left contaienr */}
            <div className="debate-topic-side-box">
              <div className="debate-topic-side-content-container">
                <p className='debate-topic-side-stance-title'>
                  ฝั่งที่เห็นด้วย
                </p>
                <div className="debate-topic-comment-scroll-box">
                {commentDataAgree.map((commentDataAgree, index) => (
                  <CommentComponent
                    key={`agree-${commentDataAgree.dbc_id}`}
                    comment={commentDataAgree.dbc_comment}
                    id={commentDataAgree.dbc_id}
                    timestamp={commentDataAgree.dbc_timestamp}
                  />
                ))}

                </div>
                <button className='debate-topic-agree-button' onClick={handleAgreeComment}>แสดงความคิดเห็นเพื่อเห็นด้วย</button>
                
              </div>
            </div>
            
            {/* right contaienr */}
            <div className="debate-topic-side-box">
              <div className="debate-topic-side-content-container">
                <p className='debate-topic-side-stance-title'>
                  ฝั่งที่ไม่เห็นด้วย
                </p>
                <div className="debate-topic-comment-scroll-box">
                {commentDataDisagree.map((commentDataDisAgree) => (
                    <CommentComponent comment={commentDataDisAgree.dbc_comment} 
                    id={commentDataDisAgree.dbc_id} timestamp={commentDataDisAgree.dbc_timestamp}

                    />
                  ))}

                </div>
                <button className='debate-topic-disagree-button' onClick={handleDisagreeComment}>แสดงความคิดเห็นเพื่อไม่เห็นด้วย</button>
                
              </div>
            </div>
          </div>
        </div>
        {popup}
    </>
  )
}



export default DebateTopic
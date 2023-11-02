import React, {useState, useEffect} from 'react';
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
import Swal from 'sweetalert2'

function DebateTopic(props) {


  const [open, setOpen] = useState(false);

  const [selectedAgreePopup, setSelectedAgreePopup] = useState(null)
  const [selectedDisagreePopup, setSelectedDisagreePopup] = useState(null)
  const [selectedEditPopup, setSelectedEditPopup] = useState(null)
  const [selectedDeletePopup, setSelectedDeletePopup] = useState(null)
  const [selectedAddtofavPopup, setSelectedAddtofavPopup] = useState(null)
  const [selectedAddtoDownloadPopup, setSelectedAddtoDownloadPopup] = useState(null)

  let popup = null
  
  const navigate = useNavigate();
  const topicId = window.location.pathname.split("/").pop();
  
  let stance = {
    dbc_stance: 0
  }
  
  let [commentDataAgree, setCommentDataAgree] = useState([]);
  let [commentDataDisagree, setCommentDataDisagree] = useState([]);
  
  const [topicData, setTopicData] = useState({
    dbt_id: "",
    dbt_title: "Loading...",
    dbt_id: "Loading User...",
    dbt_description: "Loading Description...",
    dbt_agree: "Loading...",
    dbt_disagree: "Loading..."
  });
  const getCommentAgree = async () => {
    stance.dbc_stance = 0;
    try {
      const res = await makeRequest.get(`/comments/${topicId}`, { params: stance });
      setCommentDataAgree(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const getCommentDisagree = async () => {
    stance.dbc_stance = 1;
    try {
      const res = await makeRequest.get(`/comments/${topicId}`, { params: stance });
      setCommentDataDisagree(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const getTopicData = async () => {
    try {
      
      await Promise.all([getCommentAgree(), getCommentDisagree()]);
      const res = await makeRequest.get('/posts/topic/' + topicId);
      console.log(res.data);
      return setTopicData({
        dbt_id: res.data[0].dbt_id,
        dbt_title: res.data[0].dbt_title,
        user_id: res.data[0].user_id,
        dbt_description: res.data[0].dbt_description,
        dbt_agree: res.data[0].dbt_agree,
        dbt_disagree: res.data[0].dbt_disagree
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getTopicData();
    checkEditTopic();
    getCommentAgree();
    getCommentDisagree();
  }, []);
  
  const checkEditTopic = async () => {
    try {
      const res = await makeRequest.get('/posts/checkedit/' + topicId);
      console.log(res.data);
      if (res.data === "true") {
        return document.getElementById('checkuser').style.display = 'block'
      } 
    } catch(err){
      console.log(err);
      document.getElementById('checkuser').style.display = 'none'
    }
  }

  let agreeCount = commentDataAgree.length;
  let disagreeCount = commentDataDisagree.length;
  let totalComments = agreeCount + disagreeCount;
  let percentageAgree = (agreeCount / totalComments) * 100 ? (agreeCount / totalComments) * 100 : 0;
  let percentageDisAgree = (disagreeCount / totalComments) * 100 ? (disagreeCount / totalComments) * 100 : 0;
  
  
  const handleAgreeComment = () => {
    setSelectedAgreePopup(<AddAgreeComment onCloseClick={onCommentCloseClick}/>)
  }
  if(!!selectedAgreePopup){
    popup = <AddAgreeComment onCloseClick={onCommentCloseClick}/>
  }

  const handleDisagreeComment = () => {
    setSelectedDisagreePopup(<AddDisagreeComment onCloseClick={onCommentCloseClick}/>)
  }
  if(!!selectedDisagreePopup){
    popup = <AddDisagreeComment onCloseClick={onCommentCloseClick}/>
  }
  const handleEditTopic = () => {
    setOpen(false)
    setSelectedEditPopup(<EditTopicPopup onCloseClick={onCommentCloseClick} data={topicData}/>)
  }
  if(!!selectedEditPopup){
    popup = <EditTopicPopup onCloseClick={onCommentCloseClick} data={topicData}/>

  }
  const handleDeleteTopic = async (e) => {
    e.preventDefault();
    try {
        Swal.fire({
            title: 'คุณต้องการลบประเด็นโต้แย้ง ?',
            text: "หากคุณตกลกจะเป็นการลบประเด็นโต้แย้งอย่างถาวร !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่ ลบประเด็นโต้แย้ง!',
          }).then(async (result) => {
            if (result.isConfirmed) {
                await makeRequest.delete(`/posts/${topicId}`)
                Swal.fire({
                    title:'ลบประเด็นโต้แย้งเรียบร้อย!',
                    icon: 'success',
                }).then(() => {
                  navigate('/');
                })
            }
          })
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: err.response.data,
        })
    }
};
  // const handleDeleteTopic = () => {
  //   setOpen(false)
  //   setSelectedDeletePopup(<DeleteTopicPopup onCloseClick={onCommentCloseClick} dbt_id={topicId}/>)
  // }
  // if(!!selectedDeletePopup){
  //   popup = <DeleteTopicPopup onCloseClick={onCommentCloseClick} dbt_id={topicId}/>
  // }

  const handleAddToFav = async () => {
    try {
      const res = await makeRequest.post('/likes/fav', {dbt_id: topicId});
      Swal.fire({
        icon: 'success',
        title: res.data
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: err.response.data
      })
    }
    setOpen(false)
    
    // setSelectedAddtofavPopup(<AddToFavPopup onCloseClick={onCommentCloseClick}/>)
  }
  if(!!selectedAddtofavPopup){
    popup = <AddToFavPopup onCloseClick={onCommentCloseClick}/>

  }

  const handleAddToDownload = () => {
    setOpen(false)
    setSelectedAddtoDownloadPopup(<AddToDownloadPopup onCloseClick={onCommentCloseClick}/>)
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
              <p className='debate-topic-topic-name'>{topicData.dbt_title}</p>
              {/* topic tag */}
              <p className='debate-topic-label'>แท็กที่เกี่ยวข้อง:</p>

              <div className='debate-topic-tag-container'>
                <TopicTag tagName="เทคโนโลยี"/>
                {/* <TopicTag tagName="เซมิคอนดัคเตอร์"/> */}
                

              </div>
              {/* topic creator row */}
              <label className='debate-topic-label'>สร้างโดย: </label>
              <a className='debate-topic-topic-creator-link'>{topicData.user_id}</a>
            </div>
            {/* right content */}
            <div className="debate-topic-meta-data-right-content">
              <div className="debate-topic-description-box">
                <p className='debate-topic-topic-description'>{topicData.dbt_description}</p>
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
                <div id="checkuser" display="none">
                  <button onClick={handleEditTopic}>แก้ไขประเด็นโต้แย้ง</button>
                  <button onClick={handleDeleteTopic}>ลบประเด็นโต้แย้ง</button>
                </div>    

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
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
import ReportTopicPopup from '../../components/topic-popup/ReportTopicPopup';

function DebateTopic(props) {


  const [open, setOpen] = useState(false);

  const [selectedAgreePopup, setSelectedAgreePopup] = useState(null)
  const [selectedDisagreePopup, setSelectedDisagreePopup] = useState(null)
  const [selectedEditPopup, setSelectedEditPopup] = useState(null)
  const [selectedAddtofavPopup, setSelectedAddtofavPopup] = useState(null)
  const [selectedAddtoDownloadPopup, setSelectedAddtoDownloadPopup] = useState(null)
  const [selectedReportPopup, setSelectedReportPopup] = useState(null)
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
    dbt_id: "Loading...",
    user_name: "Loading User...",
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
      return setTopicData({
        
        dbt_id: res.data[0].dbt_id,
        dbt_title: res.data[0].dbt_title,
        user_name: res.data[0].user_name,
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

  const [canEditDelete, setCanEditDelete] = useState(false);
  const checkEditTopic = async () => {
    try {
      const res = await makeRequest.get('/posts/checkedit/' + topicId);
      if (res.data === "true") {
        setCanEditDelete(true);
      }
      if (res.data === "false") {
        setCanEditDelete(false);
      }
    } catch(err){
      console.log(err);
    }
  }

  let agreeCount = commentDataAgree.length;
  let disagreeCount = commentDataDisagree.length;
  let totalComments = agreeCount + disagreeCount;
  let percentageAgree = (agreeCount / totalComments) * 100 ? (agreeCount / totalComments) * 100 : 0;
  let percentageDisAgree = (disagreeCount / totalComments) * 100 ? (disagreeCount / totalComments) * 100 : 0;
  
  
  const handleAgreeComment = () => {
    setSelectedAgreePopup(<AddAgreeComment onCloseClick={onCommentCloseClick} stance={topicData.dbt_agree}/>)
  }
  if(!!selectedAgreePopup){
    popup = <AddAgreeComment onCloseClick={onCommentCloseClick} stance={topicData.dbt_agree}/>
  }

  const handleDisagreeComment = () => {
    setSelectedDisagreePopup(<AddDisagreeComment onCloseClick={onCommentCloseClick} stance={topicData.dbt_disagree}/>)
  }
  if(!!selectedDisagreePopup){
    popup = <AddDisagreeComment onCloseClick={onCommentCloseClick} stance={topicData.dbt_disagree}/>
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
            text: "หากคุณตกลงจะเป็นการลบประเด็นโต้แย้งอย่างถาวร !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'grey',
            confirmButtonText: 'ใช่ ลบประเด็นโต้แย้ง!',
            cancelButtonText: 'ยกเลิก'
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

  function addToDownloadList(dbt_id) {
    // ดึงรายการที่มีอยู่จาก localStorage
    let downloadList = JSON.parse(localStorage.getItem('downloadList')) || [];
    
    // ตรวจสอบว่า dbt_id นี้มีอยู่แล้วในรายการหรือไม่
    if (!downloadList.includes(dbt_id)) {
      // เพิ่ม dbt_id ใหม่เข้าไปในรายการถ้ายังไม่มี
      downloadList.push(dbt_id);
      // บันทึกกลับเข้า localStorage
      localStorage.setItem('downloadList', JSON.stringify(downloadList));
    }
  }
  
  const handleAddToDownload = () => {
    setOpen(false)
    addToDownloadList(topicData.dbt_id)
    Swal.fire({
      icon: 'success',
      title: 'เพิ่มประเด็นโต้แย้งเรียบร้อย'
    })
    // setSelectedAddtoDownloadPopup(<AddToDownloadPopup onCloseClick={onCommentCloseClick}/>)
  }
  // if(!!selectedAddtoDownloadPopup){
  //   popup = <AddToDownloadPopup onCloseClick={onCommentCloseClick}/>
  // }

  const handleReportTopic = () => {
    setOpen(false)
    setSelectedReportPopup(<ReportTopicPopup onCloseClick={onCommentCloseClick} data={topicData}/>)
  }
  if(!!selectedReportPopup){
    popup = <ReportTopicPopup onCloseClick={onCommentCloseClick} data={topicData}/>
  }

  function onCommentCloseClick(){
    popup = null
    setSelectedAgreePopup(null)
    setSelectedDisagreePopup(null)
    setSelectedEditPopup(null)
    setSelectedAddtofavPopup(null)
    setSelectedAddtoDownloadPopup(null)
    setSelectedReportPopup(null)
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
              
              <p className='debate-topic-label'>แท็กที่เกี่ยวข้อง</p>
              <div className='debate-topic-tag-container'>
              
                <TopicTag tagName="เทคโนโลยี"/>
                <TopicTag tagName="IT"/>
                <TopicTag tagName="ความเจริญ"/>

              </div>
              {/* topic creator row */}
              <div className="debate-topic-creator-row">
                <label className='debate-topic-label'>สร้างโดย: </label>
                <a className='debate-topic-topic-creator-link'>{topicData.user_name}</a>
              </div>
            </div>
            {/* right content */}
            <div className="debate-topic-meta-data-right-content">
            <h3 className='debate-topic-topic-description-title'>รายละเอียดประเด็นโต้แย้ง</h3>
              
              <div className="debate-topic-description-box">
                <p className='debate-topic-topic-description'>{topicData.dbt_description}</p>
              </div>
              <h3 className='debate-topic-progress-bar-title'>อัตราส่วนการโต้แย้ง</h3>
              {/* <progress className='debate-topic-progress-bar' id="file" value="70" max="100"></progress>  */}
              
              <div className="debate-topic-legend-row">
                {/* agree legend */}
                <div className='debate-topic-legend-element'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="6.5" fill="#0DC7B1"/>
                  </svg>
                  <p className='debate-topic-legend-text'>{topicData.dbt_agree} {Math.round(percentageAgree)}%</p>
                </div>

                {/* disagree legend */}
                <div className='debate-topic-legend-element'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="6.5" fill="#EB5757"/>
                  </svg>
                  <p className='debate-topic-legend-text'>{topicData.dbt_disagree} {Math.round(percentageDisAgree)}%</p>
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
                {canEditDelete && (
                  <div>
                    <button onClick={handleEditTopic}>แก้ไขประเด็นโต้แย้ง</button>
                    <button onClick={handleDeleteTopic}>ลบประเด็นโต้แย้ง</button>
                  </div>    
                )}
                <button onClick={handleReportTopic}>รายงานปัญหา</button>
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
                  ฝั่ง{topicData.dbt_agree}
                </p>
                <div className="debate-topic-comment-scroll-box">
                {commentDataAgree.map((commentDataAgree, index) => (
                  <CommentComponent
                    comment={commentDataAgree.dbc_comment}
                    id={commentDataAgree.dbc_id}
                    timestamp={commentDataAgree.dbc_timestamp}
                    user_pic={commentDataAgree.user_pic}
                  />
                ))}

                </div>
                <button className='debate-topic-agree-button' onClick={handleAgreeComment}>แสดงความคิดเห็นเพื่อฝั่ง{topicData.dbt_agree}</button>
                
              </div>
            </div>
            
            {/* right contaienr */}
            <div className="debate-topic-side-box">
              <div className="debate-topic-side-content-container">
                <p className='debate-topic-side-stance-title'>
                  ฝั่ง{topicData.dbt_disagree}
                </p>
                <div className="debate-topic-comment-scroll-box">
                {commentDataDisagree.map((commentDataDisAgree) => (
                    <CommentComponent 
                    comment={commentDataDisAgree.dbc_comment} 
                    id={commentDataDisAgree.dbc_id} 
                    timestamp={commentDataDisAgree.dbc_timestamp}
                    user_pic={commentDataDisAgree.user_pic}
                    />
                  ))}

                </div>
                <button className='debate-topic-disagree-button' onClick={handleDisagreeComment}>แสดงความคิดเห็นเพื่อฝั่ง{topicData.dbt_disagree}</button>
                
              </div>
            </div>
          </div>
        </div>
        {popup}
    </>
  )
}



export default DebateTopic
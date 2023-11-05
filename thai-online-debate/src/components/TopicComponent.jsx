import React, { useEffect, useState } from 'react'
import './TopicComponent.css'
import saveIcon from '../assets/icon/bookmark.png'
import saveIconActive from '../assets/icon/bookmark-a.png'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { makeRequest } from '../axios';
function TopicComponent(props) {
  const topicName = props.topicname;
  const topicId = props.id;
  const navigate = useNavigate();
  const [toglefav, setToglefav] = useState(false);

  const showTopic = async (topicId) => {
    navigate(`/topic/${topicId}`);
  }

  const handleAddToFav = async () => {
    try {
      const res = await makeRequest.post('/likes/fav', {dbt_id: topicId});
      Swal.fire({
        icon: 'success',
        title: res.data
      }).then(() => {
        props.refresh();
      })
      checkFav();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: err.response.data
      })
    }
  }

  const checkFav = async () => {
    try {
      const res = await makeRequest.get("/likes/checkfav", {
        params: { dbt_id: topicId },
      });
      setToglefav(res.data === "true"); // Update state based on the response
    } catch (err) {
      console.log(err.response.data);
    }
  }
  useEffect(() => {
    checkFav();
  },[topicId])
  return (
    <div className='topic-component'>
        <div className="topic-component-title-container">
          <p className='topic-component-title'>{topicName}</p>
        </div>
        
        <div className="topic-component-line"></div>
        <div className="topic-component-bt-container">
          <button onClick={() => showTopic(topicId)} className='topic-component-debate-button'>ดีเบต</button>
          {toglefav ? (
            <button onClick={handleAddToFav} className='topic-component-save-button'><img src={saveIconActive} className='save-button'/></button>
            ) : (
              <button onClick={handleAddToFav} className='topic-component-save-button'><img src={saveIcon} className='save-button'/></button>
            )}
          
        </div>
    </div>
  )
}

export default TopicComponent
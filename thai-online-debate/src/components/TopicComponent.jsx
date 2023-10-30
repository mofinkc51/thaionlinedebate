import React from 'react'
import './TopicComponent.css'
import saveIcon from '../assets/icon/bookmark.png'
import { useNavigate } from 'react-router-dom';

function TopicComponent(props) {
  const topicName = props.topicname;
  const topicId = props.id;
  const navigate = useNavigate();
  const showTopic = async (topicId) => {
    navigate(`/topic/${topicId}`);
  }
  return (
    <div className='topic-component'>
        <div className="topic-component-title-container">
          <p className='topic-component-title'>{topicName}</p>
        </div>
        
        <div className="topic-component-line"></div>
        <div className="topic-component-bt-container">
          <button onClick={() => showTopic(topicId)} className='topic-component-debate-button'>ดีเบต</button>
          <button className='topic-component-save-button'><img src={saveIcon} className='save-button'/></button>
        </div>
    </div>
  )
}

export default TopicComponent
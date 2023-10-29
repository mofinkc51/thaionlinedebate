import React from 'react'
import './TopicComponent.css'
import saveIcon from '../assets/icon/bookmark.png'

function TopicComponent(props) {
  const topicname = props.topicname;
  return (
    <div className='topic-component'>
        <div className="topic-component-title-container">
          <p className='topic-component-title'>{topicname}</p>
        </div>
        
        <div className="topic-component-line"></div>
        <div className="topic-component-bt-container">
          <button onClick={props.getTops} className='topic-component-debate-button'>ดีเบต</button>
          <button className='topic-component-save-button'><img src={saveIcon} className='save-button'/></button>
        </div>
    </div>
  )
}

export default TopicComponent
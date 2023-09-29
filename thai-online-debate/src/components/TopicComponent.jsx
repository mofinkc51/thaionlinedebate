import React from 'react'
import './TopicComponent.css'
import saveIcon from '../assets/icon/bookmark.png'

function TopicComponent() {
  return (
    <div className='topic-component'>
        <div className="topic-component-title-container">
          <p className='topic-component-title'>ม.กรุงเทพดีแค่โฆษณา</p>
        </div>
        
        <div className="topic-component-line"></div>
        <div className="topic-component-bt-container">
          <button className='topic-component-debate-button'>ดีเบต</button>
          <button className='topic-component-save-button'><img src={saveIcon} className='save-button'/></button>
        </div>
    </div>
  )
}

export default TopicComponent
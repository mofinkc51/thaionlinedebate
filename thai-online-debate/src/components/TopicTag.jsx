import React from 'react'
import './TopicTag.css'

function TopicTag(props) {
    const tagName = props.tagName
    
  return (
    <>
    <div className="tag-component">
        <p className='tag-component-name'>{tagName}</p>
    </div>
    </>
  )
}

export default TopicTag
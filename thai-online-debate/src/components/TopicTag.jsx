import React from 'react'
import './TopicTag.css'
import { Link } from 'react-router-dom'

function TopicTag(props) {
    const tagName = props.tagName
  return (
    <>
      <div className="tag-component">{/* One hardcoded tag for test */}
        <Link to={`/tag/${tagName}`} className="tag-component-name">{tagName}</Link>
      </div>
    {/* <div className="tag-component">
        <p className='tag-component-name'>{tagName}</p>
    </div> */}
    </>
  )
}

export default TopicTag
import React from 'react'
import './InputTag.css'

function InputTag(props) {
    const tagNames = props.tagNames
  return (
            <div className="input-tag-component">{/* One hardcoded tag for test */}
                <span className="input-tag-component-text">{tagNames}</span>
                <button className="input-tag-component-close-btn">&times;</button>
            </div>
  )
}

export default InputTag
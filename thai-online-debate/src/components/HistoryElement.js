import React from 'react'
import './HistoryElement.css'
function HistoryElement(props) {
    const {date,title} = props
  return (
    <div>
        <p className='history-date'>{date}</p>
        <div className='history-element'>
            <p className='history-title'>{title}</p>
        </div>
    </div>
  )
}

export default HistoryElement
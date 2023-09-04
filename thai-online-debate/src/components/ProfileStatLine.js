import React from 'react'
import './ProfileStatLine.css'

function ProfileStatLine(props) {
    const {title, data} = props
  return (
    <div class="stat-line">
        <p>{title}</p>
        <p>{data}</p>
    </div>
  )
}

export default ProfileStatLine
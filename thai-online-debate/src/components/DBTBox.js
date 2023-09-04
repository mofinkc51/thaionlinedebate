import React from 'react'
import './DBTBox.css'
import bookmarkIcon from '../images/bookmark.png'

function DBTBox(props) {

    const {title} = props
    return (
        <div class="dbt-box">
            {/* Upper part show data */}
            <div class="upper-box">
                <h3>{title}</h3>
            </div>
            
            {/* action part */}
            <div class="lower-box">
                <div class="debate-button">
                    <a href='#'>ดีเบต</a>
                </div>
                <div class="bookmark-button">
                    <img src={bookmarkIcon} />
                </div>
            </div>
            
        </div>
    )
}

export default DBTBox
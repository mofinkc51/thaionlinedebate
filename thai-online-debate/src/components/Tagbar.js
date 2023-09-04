import React from 'react'
import './Tagbar.css';
import searchIcon from '../images/searchIcon.png'

function Tagbar() {
  return (
    <div class="tag-bar">
        {/* left */}
        <div class="tag-box">
            <div class="tag-element">
                <a href='#'>เทคโนโลยี</a>
            </div>
            <div class="tag-element">
                <a href='#'>สังคม</a>
            </div>
            <div class="tag-element"> 
                <a href='#'>วัฒนธรรม</a>
            </div>
            <div class="tag-element">
                <a href='#'>การศึกษา</a>
            </div>
            <div class="tag-element">
                <a href='#'>กีฬา</a>
            </div>
        </div>
        {/* right */}
        <div >
            {/* <img src={searchIcon} class="search-icon" /> */}
            <input class="search-box" placeholder='🔍 ค้นหาประเด็นโต้แย้ง'/>
        </div>
    </div>
  )
}

export default Tagbar
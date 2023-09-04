import React from 'react'
import './Mainpage.css'
import Tagbar from './components/Tagbar';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import DBTBox from './components/DBTBox';
import CreatePopup from './components/CreatePopup';

function Mainpage() {

    
    
  return (
    <div class='mainpage-body'>
        <Navbar />
        <Tagbar />
        <Banner />
        
        
        <div class='popular-body'>
            <div>
                <h2>Popular Topics</h2>
                <div class="popular-grid">
                    <DBTBox title=" Topic A"/>
                    <DBTBox title=" Topic B"/> 
                    <DBTBox title=" Topic C"/> 
                </div>
            </div>
        </div>

        {/* <CreatePopup/> */}
        
    </div>
  )
}

export default Mainpage
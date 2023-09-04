import React from 'react'
import Navbar from './components/Navbar'
import './Topic.css'

function Topic() {
  return (
    <div>
        <Navbar/>

        {/* topic page body */}
        <div className='page-body'>
            <div className='topic-page-body'>
                {/* Topic meta data box */}
                <div className='topic-meta-box'>
                    {/* topic meta data left side */}
                    <div className='topic-meta-box-left'>
                        <h1>Title</h1>
                        <label>แท็กที่เกี่ยวข้อง:</label><br/>
                        <label>สร้างโดย:</label><a href='#'>Nathan Ake</a>
                    </div>

                    {/* topic meta data right box */}
                    <div className='topic-meta-box-right'>
                        {/* topic description */}
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <p>อัตราส่วนการโต้แย้ง</p>

                        {/* stance ratio */}
                        <label>เห็นด้วย</label>
                        <label>ไม่เห็นด้วย</label>
                    </div>
                </div>
            </div>
        </div>
        

        

        

        {/*  */}



    </div>
  )
}

export default Topic
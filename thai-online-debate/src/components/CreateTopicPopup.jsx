import React,{ useState } from 'react'
import './CreateTopicPopup.css'
import closeButtonIcon from '../assets/icon/close.png'
import UserNavbar, { createTopic } from '../components/Navbar/UserNavBar'


function CreateTopicPopup() {
    const proceesInput = () => {
        const userInput = document.getElementById("create-topic-create-tag").value;
        console.log(userInput)
        return userInput
    
    }

    const pycall = () => {
        const script = document.createElement("script")
        script.src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
        script.async = true;
        document.body.appendChild(script)
        $.getJSON('./pycall', {content: "content from js"}, data => {
          alert(data.result);
          console.log(data.result);
        });
      };
      

    const sumEvent = () =>{
        proceesInput();
        pycall();
    }
   
    
    const [inputs,setInputs] = useState({
        tag:[]
      });
  return (
    <>
    <div className="showcreate" style={{display: 'none'}} >
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <div className='topic-bg-opacity'>
            <div className="create-topic-popup-box">
                <div className="create-topic-popup-box-container">
                    {/* Topic title row */}
                    <div className="create-topic-title-row">
                        <h2>ข้อมูลประเด็นโต้แย้ง</h2>
                        <button className='create-topic-close-button'><img src={closeButtonIcon} alt="" onClick={createTopic} /></button>
                    </div>
                    {/* Topic name row */}
                    <div className="create-topic-popup-topicname-row">
                        <p className='create-topic-popup-label'>หัวข้อประเด็นโต้แย้ง</p>
                        <input type="text" id = "create-topic-create-tag" className='create-topic-popup-topicname-input'/>
                    </div>
                    {/* Topic desc row */}
                    <div className="create-topic-popup-topicdesc-row">
                        <p className='create-topic-popup-label'>คำอธิบายประเด็นโต้แย้ง</p>
                        <textarea className="create-topic-popup-topicdesc-input" name="" id="" cols="30" rows="5"></textarea> 
                    </div>
                    {/* Stance row */}
                    <div className="create-topic-stance-row">
                        {/* Stance one */}
                        <div className="create-topic-stance">
                            <p className='create-topic-popup-label'>ฝั่งที่ 1</p>
                            <input type="text" className='create-topic-popup-stance-input'/>
                        </div>
                        {/* Stance two */}
                        <div className="create-topic-stance">
                            <p className='create-topic-popup-label'>ฝั่งที่ 2</p>
                            <input type="text" className='create-topic-popup-stance-input'/>
                        </div>

                    </div>
                    {/* tag row */}
                    <div className="create-topic-tag-row">
                        <p className='create-topic-popup-label'>แท็กที่เกี่ยวข้อง</p>
                        <div className="create-topic-tag-box">
                            <button>+</button>
                        </div>
                    </div>

                    {/* button row */}
                    <div className="create-topic-button-row">
                        <button onClick={sumEvent} className='create-topic-button'>สร้าง</button>

                    </div>
                    
                    
                </div>

            </div>

        </div>
    </div>
    </>
  )
}




export default CreateTopicPopup
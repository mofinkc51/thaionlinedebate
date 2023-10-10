import React, {useState, useEffect, useRef} from 'react';

import './DownloadRequestList.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import DownloadRequestRow from '../../components/download-request-row/DownloadRequestRow'
import DownloadFormPopup from '../../components/download-request-popup/DownloadFormPopup';
// import ConfirmRequestPopup from './ConfirmRequestPopup';

function DownloadRequestList() {
    const [selectedRequestPopup, setSelectedRequestPopup] = useState(null)
    const [selectedConfirmPopup, setSelectedConfirmPopup] = useState(null)
    let popup = null

    const handleRequestClick = () => {
        console.log('clicked')
        setSelectedRequestPopup(<DownloadFormPopup onCloseClick={onCloseClick}/>)
    }

    

    if(!!selectedRequestPopup){
        popup = <DownloadFormPopup onCloseClick={onCloseClick}/>
      }
    
    function onCloseClick(){
        popup = null
        setSelectedRequestPopup(null)
    }
  return (
    <>
    <UserNavBar/>
    <div className="download-request-page-container">
        <div className="download-request-title-row">
            <h2 className='download-request-title'>รายการประเด็นโต้แย้งที่ต้องการดาวน์โหลด</h2>
            <button onClick={handleRequestClick}>ส่งคำร้องการดาวน์โหลด</button>
        </div>
        <table>
            {/* table header  */}
            <tr className='download-request-table-header'>
                <th>หัวข้อประเด็นโต้แย้ง</th>
                <th>ฝั่งที่ 1</th>
                <th>ฝั่งที่ 2</th>
                <th>จำนวนข้อความโต้แย้ง</th>
                <th>จัดการ</th>
            </tr>
            
            {/* table body */}
            <DownloadRequestRow/>
            {/* <DownloadRequestRow/>
            <DownloadRequestRow/>
            <DownloadRequestRow/>
            <DownloadRequestRow/>

            <DownloadRequestRow/>

            <DownloadRequestRow/>
            <DownloadRequestRow/>
            <DownloadRequestRow/> */}


            

            
        </table>

    </div>
    {popup}
    {/* <DownloadFormPopup onCloseClick={onCloseClick}/> */}
    </>
  )
}

export default DownloadRequestList
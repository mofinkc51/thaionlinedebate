import React from 'react'
import './DownloadRequestList.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import DownloadRequestRow from '../../components/download-request-row/DownloadRequestRow'

function DownloadRequestList() {
    // const [selectedRequestPopup, setSelectedRequestPopup] = useState(null)

  return (
    <>
    <UserNavBar/>
    <div className="download-request-page-container">
        <div className="download-request-title-row">
            <h2 className='download-request-title'>รายการประเด็นโต้แย้งที่ต้องการดาวน์โหลด</h2>
            <button>ส่งคำร้องการดาวน์โหลด</button>
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
    </>
  )
}

export default DownloadRequestList
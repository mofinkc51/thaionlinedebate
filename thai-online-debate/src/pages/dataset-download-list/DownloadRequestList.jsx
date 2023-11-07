import React, {useState, useEffect, useRef} from 'react';

import './DownloadRequestList.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import DownloadRequestRow from '../../components/download-request-row/DownloadRequestRow'
import DownloadFormPopup from '../../components/download-request-popup/DownloadFormPopup';
import { makeRequest } from '../../axios';
import downloadFilesAsZip from '../../downloadzip'
import Swal from 'sweetalert2';
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
    const [downloadData, setDownloadData] = useState([]);
    const [downloadDataApproved, setDownloadDataApproved] = useState([]);
    const getDownloadData = async () => {
        // ดึง dbt_id จาก localStorage
        const downloadList = JSON.parse(localStorage.getItem('downloadList'));
        console.log(downloadList);
        try {
            const res = await makeRequest.get('/downloads', { params: downloadList });
            setDownloadData(res.data);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const refreshTopics = () => {
        getDownloadData();
      };

    useEffect(() => {
        getDownloadData()
      }, []);
      const datadownload = [

      ]
      const getDownloadDataApproved = async () => {
        const downloadList = JSON.parse(localStorage.getItem('downloadList'));
        if (downloadData.length === 0){
            return Swal.fire({
                icon: 'error',
                title: 'กรุณาเพิ่มประเด็นโต้แย้งที่ต้องการดาวน์โหลดก่อน'
            })
        }
        console.log(downloadList);
        try {

            for (let i=0 ; i < downloadList.length; i++){
                const res = await makeRequest.get('/downloads/approved', { params: {dbt_id : downloadList[i] }});
                if (res.data.length > 0){
                    datadownload.push(res.data);
                }
            }
            console.log(datadownload);
            downloadFilesAsZip(datadownload);
        } catch (error) {
            console.error(error);
        }
    };
      const handleDownload = () => {
        getDownloadDataApproved();
      }

  return (
    <>
    <UserNavBar/>
    <div className="download-request-page-container">
        <div className="download-request-title-row">
            <h2 className='download-request-title'>รายการประเด็นโต้แย้งที่ต้องการดาวน์โหลด</h2>
            <button onClick={handleDownload}>ส่งคำร้องการดาวน์โหลด</button>
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
            {downloadData.map((downloadData) => (
                <DownloadRequestRow data={downloadData} refresh={refreshTopics}/>
            ))}

        </table>

    </div>
    {popup}
    {/* <DownloadFormPopup onCloseClick={onCloseClick}/> */}
    </>
  )
}

export default DownloadRequestList
import React, { useEffect, useState } from 'react'
import UserNavBar from '../../components/Navbar/UserNavBar'
import './DownloadList.css'
import DownloadRow from '../../components/download-row/DownloadRow'
import { makeRequest } from '../../axios';

function DownloadList() {

  const [downloadData, setDownloadData] = useState([]);
  const getDownloadData = async () => {
    try {
      const res = await makeRequest.get("/downloads/pending");
      setDownloadData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDownloadData();
  }, []);
  return (
    <>
    <UserNavBar/>
    <div className="download-list-page-container">
        <div className="download-list-title-row">
            <h2 className='download-list-title'>ประวัติรายการประเด็นโต้แย้งที่ต้องการดาวน์โหลด</h2>
        </div>
        <table>
            {/* table header  */}
            <tr className='download-list-table-header'>
                <th>วัน-เวลา</th>
                <th>เวลาคงเหลือ</th>
                <th>จำนวนประเด็นโต้แย้ง</th>
                <th>สถานะ</th>
                <th>ตรวจสอบ</th>
            </tr>
            {/* table body */}
            {downloadData.map((downloadData) => (
            <DownloadRow data={downloadData} />
          ))}

            
        </table>

    </div>
    </>
  )
}

export default DownloadList
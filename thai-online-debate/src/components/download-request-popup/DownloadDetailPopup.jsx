import React from 'react'
import './DownloadDetailPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'

function DownloadDetailPopup(props) {
    const requestData = {
        requester: 'Nathat Kuanthanom',
        dateTime: '13/05/2022 16.30 น',
        topicRequested: '1. รัสเซียมีสิทธิรุกรานยูเครน',
        reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad inventore harum quos iure ratione facilis optio provident quo alias distinctio!',
    }
  return (
    <div className="download-detail-bg-opacity">
        <div className="download-detail-popup-box">
            <div className="download-detail-popup-box-container">
                {/* request title row */}
                <div className="download-detail-title-row">
                    <h2>รายละเอียดคำร้องขอชุดข้อมูล</h2>
                    <button className='download-detail-close-button' ><img src={closeButtonIcon} alt="" /></button>
                </div>

                {/* requester and date row */}
                <div className="download-detail-requester-row">
                    <div className="download-detail-requester-box">
                        <h4>ชื่อผู้ร้อง</h4>
                        <p className='download-detail-text'>{requestData.requester}</p>
                    </div>
                    <div className="download-detail-date-box">
                        <h4>วัน-เวลา</h4>
                        <p className='download-detail-text'>{requestData.dateTime}</p>
                    </div>
                </div>

                 {/* topic requested row */}
                <div className="download-detail-topic-requested-row">
                    <h4>ชุดข้อมูลที่ต้องการดาวน์โหลด</h4>
                    <p className='download-detail-text'>รัสเซียมีสิทธิรุกรานยูเครน</p>
                    
                </div>
                {/* reason row */}
                <div className="download-detail-topic-reason-row">
                    <h4>เหตุผลที่ต้องการนำข้อมูลไปใช้</h4>
                    <p className='download-detail-text'>{requestData.reason}</p>
                </div>
                

                {/* proof of request */}
                <div className="download-detail-popup-proof-row">
                    <h4>หลักฐานการยืนยันตัวตน</h4>
                    <div className='download-detail-popup-proof-input'>
                        <label className='download-detail-text'>บัตรประชาชน</label>
                        <button className='download-detail-upload-proof-button'>ตรวจสอบ</button>
                    </div>
                    <div className='download-detail-popup-proof-input'>
                        <label className='download-detail-text'>เอกสารยืนยันจากต้นสังกัด</label>
                        <button className='download-detail-upload-proof-button'>ตรวจสอบ</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default DownloadDetailPopup
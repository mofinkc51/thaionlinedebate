import React from 'react'
import './ReportTopicPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'

function ReportTopicPopup(props) {
    const {onCloseClick} = props;
  return (
    <>
    <div className="report-topic-bg-opacity">
        <div className="report-topic-popup-box">
            <div className="report-topic-popup-box-container">
                {/* request title row */}
                <div className="report-topic-title-row">
                    <h2>รายงานปัญหา</h2>
                    <button className='report-topic-close-button' onClick={onCloseClick}><img src={closeButtonIcon} alt="" /></button>
                </div>
                {/* request desc row */}
                <div className="report-topic-popup-topicdesc-row">
                    <label className='report-topic-popup-label'>รายละเอียดปัญหา</label>
                    <textarea className="report-topic-popup-topicdesc-input" name="" id="" cols="30" rows="5"></textarea> 
                </div>

                {/* button row */}
                <div className="report-topic-button-row">
                    <button className='report-topic-confirm-button'>รายงาน</button>
                    <button className='report-topic-cancel-button' onClick={onCloseClick}>ยกเลิก</button>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default ReportTopicPopup
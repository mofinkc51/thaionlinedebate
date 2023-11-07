import React , { useEffect, useRef, useState } from 'react'
import './ReportTopicPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'
import Swal from 'sweetalert2'
import { makeRequest } from '../../axios';

function ReportTopicPopup(props) {
    const onCloseClick = props.onCloseClick;
    const inputRef = useRef();
    const [reportData, setReportData] = useState({
        rp_description: "",
        dbt_id: props.data.dbt_id ,
    });

    const handleChange = (e) => {
        setReportData((prev)=>({...prev, [e.target.name]:e.target.value}));
    }
    useEffect(() => {
        inputRef.current.focus();
    },[]);
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!reportData.rp_description) {
            return Swal.fire({
                icon: 'error',
                title: 'กรุณากรอกรายละเอียดปัญหา',
                didClose: () => {
                    setTimeout(() => inputRef.current.focus(), 10);
                }
            })
        }
        try {
            await makeRequest.post('/reports', reportData);
            Swal.fire({
                icon: 'success',
                title: 'ส่งข้อความรายงานปัญหาเรียบร้อย',
            })  
            onCloseClick();
        } catch(err) {
            Swal.fire({
                icon: 'error',
                title: err.response.data
            })
        }
    }

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
                    <textarea className="report-topic-popup-topicdesc-input"
                    name="rp_description" cols="30" rows="5"
                    onChange={handleChange} ref={inputRef}
                    required
                    ></textarea> 
                </div>

                {/* button row */}
                <div className="report-topic-button-row">
                    <button className='report-topic-confirm-button' onClick={onSubmit} >รายงาน</button>
                    <button className='report-topic-cancel-button' onClick={onCloseClick}>ยกเลิก</button>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default ReportTopicPopup
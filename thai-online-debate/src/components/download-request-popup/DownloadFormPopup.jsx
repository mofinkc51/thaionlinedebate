import React, { useState } from 'react'
import './DownloadFormPopup.css'
import closeButtonIcon from '../../assets/icon/close.png'
import { makeRequest } from '../../axios';
import Swal from 'sweetalert2';

function DownloadFormPopup(props) {
    const [drData, setDrData] = useState({
        dr_name: "",
        dr_desc: "",
        dr_proof_one: "",
        dr_proof_two: "",
        dr_proof_one_Data: null, // บัตรประชาชน
        dr_proof_two_Data: null, // เอกสารจากต้นสังกัด
    });
  
    const handleChange = (e) => {
        setDrData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleFileChange = (e) => {
        setDrData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('image', drData.dr_proof_one_Data);
        formData.append('pdf', drData.dr_proof_two_Data);
    
        try {
            const uploadResponse = await makeRequest.post('/upload', formData);
            const { image, pdf } = uploadResponse.data;
    
            // อัปเดต state ด้วยชื่อไฟล์ที่ได้จากการอัพโหลด
            const updatedDrData = {
                ...drData,
                dr_proof_one: image,
                dr_proof_two: pdf
            };
    
            // ส่งข้อมูลไปยัง endpoint '/downloads'
            const response = await makeRequest.put('/downloads', updatedDrData);
    
            Swal.fire({
                icon: 'success',
                title: 'อัพโหลดสําเร็จ',
            }).then(() => {
                props.refreshTopics();
                props.onCloseClick();
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error.response.data,
            });
        }
    };
    
  return (
    <>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="download-form-bg-opacity">
        <div className="download-form-popup-box">
            <div className="download-form-popup-box-container">
                {/* request title row */}
                <div className="download-form-title-row">
                    <h2>ส่งคำร้องขอการดาวน์โหลดชุดข้อมูล</h2>
                    <button className='download-form-close-button' onClick={() => props.onCloseClick()}><img src={closeButtonIcon} alt="" /></button>
                </div>
                {/* request name row */}
                <div className="download-form-popup-topicname-row">
                    <label className='download-form-popup-label'>ชื่อจริง - นามสกุล</label>
                    <input type="text" className='download-form-popup-topicname-input' 
                    onChange={handleChange} name="dr_name"/>
                </div>
                {/* request desc row */}
                <div className="download-form-popup-topicdesc-row">
                    <label className='download-form-popup-label'>เหตุผลที่ต้องการนำข้อมูลไปใช้</label>
                    <textarea className="download-form-popup-topicdesc-input" 
                    onChange={handleChange} name="dr_desc" id="" cols="30" rows="5"></textarea> 
                </div>

                {/* proof of request */}
                <div className="download-form-popup-proof-row">
                    <label className='download-form-popup-label'>หลักฐานการนำข้อมูลไปใช้</label><br/>
                    <div className='download-form-popup-proof-input'>
                        <label className='download-form-proof-text'>บัตรประชาชน</label>
                        <input type="file" name="dr_proof_one_Data" onChange={handleFileChange} accept=".png, .jpg, .jpeg" />
                    
                    </div>
                    <div className='download-form-popup-proof-input'>
                        <label className='download-form-proof-text'>เอกสารยืนยันจากต้นสังกัด</label>
                        <input type="file" name="dr_proof_two_Data" onChange={handleFileChange} accept=".pdf" />
                    </div>
                </div>

                {/* button row */}
                <div className="download-form-button-row">
                    <button className='download-form-confirm-button'>ยืนยัน</button>
                    <button className='download-form-cancel-button' onClick={() => props.onCloseClick()}>ยกเลิก</button>
                </div>
            </div>
        </div>

    </div>
    </form>
    </>
  )
}

export default DownloadFormPopup
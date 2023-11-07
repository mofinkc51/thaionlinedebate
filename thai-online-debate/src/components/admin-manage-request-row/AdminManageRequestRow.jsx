import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminManageRequestRow.css';
import editButtonIcon from '../../assets/icon/edit.png';
import deleteButtonIcon from '../../assets/icon/trash.png';


function AdminManageRequestRow({ data, onEdit}) {
    // Helper function to get the countdown from now until 7 days after the timestamp
    const navigate = useNavigate();

    const handleNavigateEdit = () => {
        console.log("edit button clicked", data);
        navigate(`/manage/main/request/${data.dr_id}`);
    };

    const getCountdownTime = (timestamp) => {
        const createdAt = new Date(timestamp);
        const sevenDaysLater = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
        const now = new Date();
        const timeRemaining = sevenDaysLater - now;


        if (timeRemaining < 0) {
            return 'หมดเวลา';
        }

        let seconds = Math.floor((timeRemaining / 1000) % 60);
        let minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        let hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

        days = days < 10 ? '0' + days : days;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return `${days} วัน ${hours} ชั่วโมง ${minutes} นาที `;
    }

    const [countdown, setCountdown] = useState(() => getCountdownTime(data.dr_timestamp));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(getCountdownTime(data.dr_timestamp));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [data.dr_timestamp]);

    const handleEdit = () => {
        console.log("edit button clicked", data);
        navigate(`/manage/main/request/${data.dr_id}`);  // <-- ใช้ navigate ที่นี่
    };

    const handleDelete = () => {
        console.log("delete button clicked", data);
    };

    // Helper function to format the timestamp
    const formatDate = (timestamp) => {
        const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
                        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear() + 543; // Add 543 for the Buddhist calendar year
        return `${day} ${month} ${year}`;
    }

    

    

return (
        <tr className='admin-manage-request-row'>
            <td>{data.user_id}</td>
            <td>{formatDate(data.dr_timestamp)}</td>
            <td>{countdown}</td>
            <td>{data.dr_total_topic}</td>
            <td>{/* ที่นี่คุณต้องใส่โลจิกสำหรับสถานะ proof one */}</td>
            <td className='request-header-manage'>
                <button onClick={() => onEdit(data)}><img src={editButtonIcon} alt="Edit" /></button> {/* แก้ไขส่วนนี้ */}
                <button onClick={handleDelete}><img src={deleteButtonIcon} alt="Delete" /></button>
            </td>
        </tr>
    );
}

export default AdminManageRequestRow;

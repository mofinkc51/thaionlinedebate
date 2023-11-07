import React, { useEffect, useState } from 'react';
import './AdminDownloadRequestList.css';
import AdminManageRequestRow from '../../components/admin-manage-request-row/AdminManageRequestRow';

function AdminDownloadRequestList() {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const handleRequestEdit = (request) => {
        setSelectedRequest(request);
    };
    
    useEffect(() => {
        // Fetch the data from your backend
        fetch('http://localhost:8800/api/admin/apvdownload')
            .then(response => response.json())
            .then(data => {
                //console.log("Data from backend:", data);
                const filteredData = data.filter(item => item.dr_id !== null);
                setRequests(filteredData);
            })
            .catch(err => console.error("Error fetching data:", err));
    }, []);
    
    

    return (
        <>
            <div className="admin-download-request-title-row">
                <h2>อนุมัติคำร้องการดาวน์โหลดชุดข้อมูล</h2>
            </div>
            {/* table part */}
            <table className='admin-download-request-table'>
                {/* table header  */}
                <tr className='admin-manage-request-table-header'>
                    <th className='request-header-requester-name'>ชื่อผู้ร้อง</th>
                    <th className='request-header-date'>วัน-เวลา</th>
                    <th>เวลาคงเหลือ</th>
                    <th className='request-header-topic-quantity'>จำนวนประเด็นโต้แย้ง</th>
                    <th>สถานะ</th>
                    <th className='request-header-manage'>จัดการ</th>
                </tr>
                {/* table body */}
                {requests.map((request, index) => (
                <AdminManageRequestRow key={index} data={request} onEdit={handleRequestEdit} />
                    )
                )
                
            }
            </table>
        </>
    );
}

export default AdminDownloadRequestList;

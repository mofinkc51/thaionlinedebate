// AdminDownloadRequestList.js
import React, { useEffect, useState } from 'react';
import './AdminDownloadRequestList.css';
import AdminManageRequestRow from '../../components/admin-manage-request-row/AdminManageRequestRow';
import axios from 'axios';
import AdminManageRequest from './AdminManageRequest';

function AdminDownloadRequestList() {
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);

  const handleBackToRequestList = () => {
    setEditingRequest(null);
  };

  useEffect(() => {
    // ดึงข้อมูลจากเซิร์ฟเวอร์
    axios.get('http://localhost:8800/api/admin/apvdownload')
      .then(response => {
        const filteredData = response.data.filter(item => item.dr_id !== null);
        setRequests(filteredData);
      })
      .catch(err => console.error("ผิดพลาดในการดึงข้อมูล:", err));
  }, []);

  const handleRequestEdit = (request) => {
    setEditingRequest(request);
  };

  

  return (
    <div className="admin-download-request-container">
      {!editingRequest && (
  <div className="admin-download-request-title-row">
    <h2>อนุมัติคำร้องการดาวน์โหลดชุดข้อมูล</h2>
  </div>
)}
      {editingRequest ? (
  <>
    <button onClick={handleBackToRequestList} className="back-button">
      <img
        src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png"
        alt="Back"
        className="back-icon"
      />
    </button>
    <AdminManageRequest data={editingRequest} drId={editingRequest.dr_id} />
  </>
) : (
  <table className='admin-download-request-table'>
    {/* ... */}
    <tbody>
      {requests.map((request, index) => (
        <AdminManageRequestRow
          key={index}
          data={request}
          onEdit={handleRequestEdit}
        />
      ))}
    </tbody>
  </table>
)}
    </div>
  );
}

export default AdminDownloadRequestList;

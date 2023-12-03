// AdminDownloadRequestList.js
import React, { useEffect, useState } from "react";
import "./AdminDownloadRequestList.css";
import AdminManageRequestRow from "../../components/admin-manage-request-row/AdminManageRequestRow";
import AdminManageRequest from "./AdminManageRequest";
import { makeRequest } from "../../axios";

function AdminDownloadRequestList() {
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [approvedData, setApprovedData] = useState([]);
  const [downloadDetail, setDownloadDetail] = useState({})
  const [detailDebate, setDetailDebate] = useState([])

  const handleBackToRequestList = () => {
    setEditingRequest(null);
  };

  useEffect(() => {
    getDownloadData();
  }, []);

  const getDownloadData = async () => {
    try {
      const res = await makeRequest.get("/admin/downloadrequest");
      setRequests(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getApprovedData = async () => {
    try {
      const res = await makeRequest.get("/admin/getApproval");
      setApprovedData(res.data);
      console.log(" Approved data: ", res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const refreshData = () => {
    getDownloadData();
    getApprovedData();
  }
  useEffect(() => {
    getDownloadData();
    getApprovedData();
  }, []);

  const handleRequestEdit = (request) => {
    setEditingRequest(request);
  };
  const getDownloadDetail = async (dr_id) => {
    try {
      const res = await makeRequest.get(`/downloads/detail/${dr_id}`);
      setDownloadDetail(res.data); // กำหนดค่า downloadDetail
      const resDebate = await makeRequest.get(`/downloads/detail/debate/${dr_id}`);
      setDetailDebate(resDebate.data);
    } catch (error) {
      console.error(error);
    }
  }
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
          <AdminManageRequest
            onBack={handleBackToRequestList}
            data={editingRequest}
            debate={detailDebate}
            drId={editingRequest.dr_id}
            refresh={refreshData}
          />
        </>
      ) : (
        <table className="admin-download-request-table">
          {/* ... */}
          {/* table header  */}
          <tr className="admin-manage-request-table-header">
            <th className="request-header-requester-name">ชื่อผู้ร้อง</th>
            <th className="request-header-date">วัน-เวลา</th>
            <th>เวลาคงเหลือ</th>
            <th className="request-header-topic-quantity">จำนวนประเด็นโต้แย้ง</th>
            <th>สถานะ</th>
            <th className="request-header-manage">จัดการ</th>
          </tr>
          <tbody>
            {requests.map((request, index) => (
              <AdminManageRequestRow
                id={index}
                data={request}
                getDetail={() => getDownloadDetail(request.dr_id)}
                approveData={approvedData[index]}
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
 
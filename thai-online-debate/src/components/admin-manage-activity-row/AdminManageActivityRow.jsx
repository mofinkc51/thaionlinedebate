import React, { useState } from "react";
import "./AdminManageActivityRow.css";
import editButtonIcon from "../../assets/icon/edit.png";
import deleteButtonIcon from "../../assets/icon/trash.png";
import EditActivityPopup from "../admin-popup/EditActivityPopup";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";

function AdminManageActivityRow({ activity, onEdit }) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isEditPopupReopen, setIsEditPopupReopen] = useState(false);

  const handleEditButtonClick = () => {
    console.log("Edit Button Clicked. Activity:", activity);
    setIsEditPopupOpen(true);
    setIsEditPopupReopen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setIsEditPopupReopen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("th-TH", options);
  };

  const getActivityStatus = (start_date, end_date) => {
    const now = new Date();
    const start = new Date(start_date);
    const end = new Date(end_date);

    if (now < start) {
      return (
        <div className="download-row-status-box-pending">
          <p>รอดำเนินการ</p>
        </div>
      ); // สถานะก่อนวันเริ่มต้น
    } else if (now >= start && now <= end) {
      return (
        <div className="download-row-status-box-approved">
          <p>กำลังดำเนินการ</p>
        </div>
      ); // สถานะระหว่างวันเริ่มต้นและสิ้นสุด
    } else {
      return (
        <div className="download-row-status-box-rejected">
          <p>สิ้นสุดแล้ว</p>
        </div>
      ); // สถานะหลังจากวันสิ้นสุด
    }
  };
  const handleDeleteTopic = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "คุณต้องการลบกิจกรรมโต้แย้ง ?",
        text: "หากคุณตกลงจะเป็นการลบกิจกรรมโต้แย้งอย่างถาวร !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "grey",
        confirmButtonText: "ใช่ ลบประเด็นโต้แย้ง!",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log("Activity ID:", activity.dbt_id);
          await makeRequest.delete(`/admin/deleteActivity/${activity.dbt_id}`);
          Swal.fire({
            title: "ลบประเด็นโต้แย้งเรียบร้อย!",
            icon: "success",
          }).then(() => {
            onEdit();
          });
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data,
      });
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return (
          <div className="download-row-status-box-approved">
            <p>กำลังดำเนินการ</p>
          </div>
        );
      case "pending":
        return (
          <div className="download-row-status-box-pending">
            <p>รอดำเนินการ</p>
          </div>
        );
      case "rejected":
        return (
          <div className="download-row-status-box-rejected">
            <p>สิ้นสุดแล้ว</p>
          </div>
        );
      // Add more cases for other statuses if needed
      default:
        return "Unknown"; // Default text
    }
  };

  return (
    <>
      <tr className="admin-manage-activity-row">
        <td className="admin-manage-activity-topic-name">
          <p>{activity ? activity.dbt_title : "Loading..."}</p>
        </td>
        <td>
          <p className="admin-manage-activity-row-p">
            {activity ? formatDate(activity.act_start_date) : "Loading..."}
          </p>
        </td>
        <td>
          <p className="admin-manage-activity-row-p">
            {activity ? formatDate(activity.act_end_date) : "Loading..."}
          </p>
        </td>
        <td>
          <p className="admin-manage-activity-row-p">
            {activity ? activity.user_name : "Loading..."}
          </p>
        </td>
        <td className="admin-manage-activity-row-status">
          <div>
            {activity
              ? getActivityStatus(
                  activity.act_start_date,
                  activity.act_end_date
                )
              : "Loading..."}
          </div>
        </td>
        <td className="admin-manage-activity-row-manage">
          <div>
            <button onClick={handleEditButtonClick}>
              <img src={editButtonIcon} alt="Edit" />
            </button>
            <button onClick={handleDeleteTopic}>
              <img src={deleteButtonIcon} alt="Delete" />
            </button>
          </div>
        </td>
      </tr>

      {isEditPopupOpen && (
        <EditActivityPopup
          activity={activity}
          refresh={onEdit}
          onClose={closeEditPopup}
          isReopen={isEditPopupReopen}
        />
      )}
    </>
  );
}

export default AdminManageActivityRow;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminManageActivity.css'
import AdminManageActivityRow from '../../components/admin-manage-activity-row/AdminManageActivityRow'
import CreateActivityPopup from '../../components/admin-popup/CreateActivityPopup'
import EditActivityPopup from '../../components/admin-popup/EditActivityPopup'
import DeleteActivityPopup from '../../components/admin-popup/DeleteActivityPopup'
import { makeRequest } from '../../axios';
function AdminManageActivity() {

  const [activities, setActivities] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // ทำการเปลี่ยน URL เป็น endpoint ของคุณที่ใช้เรียกข้อมูล
        const response = await makeRequest.get('/admin/activity');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
        // จัดการ error ตามที่ต้องการ
      }
    };

    fetchActivities();
  }, []); // ขึ้นอยู่กับ dependency array ที่ว่าง เพื่อให้เรียกข้อมูลเมื่อ component mount

  const handleCreateButtonClick = () => {
    setShowCreatePopup(true);
  };
  return (
    <>
      <div className="admin-manage-activity-title-row">
        <h2 className='admin-manage-activity-title'>จัดการกิจกรรมโต้แย้ง</h2>
        <button onClick={() => setShowCreatePopup(true)}>สร้างกิจกรรมโต้แย้ง</button>
      </div>

      {/* table part */}
      <table className='admin-download-activity-table'>

        {/* table header  */}
        <tr className='admin-manage-activity-table-header'>
            <th className='activity-table-header-topic-name'>ชื่อกิจกรรมโต้แย้ง</th>
            <th className='activity-table-header-time'>วัน-เวลาที่เริ่ม</th>
            <th className='activity-table-header-time'>วัน-เวลาที่สิ้นสุด</th>
            <th>สร้างโดย</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
        </tr>

        {/* table body */}
        {activities.map((activity) => (
        <AdminManageActivityRow key={activity.act_id} activity={activity} />
      ))}
      </table>
      {showCreatePopup && <CreateActivityPopup closePopup={() => setShowCreatePopup(false)} />}
      {/* <EditActivityPopup/> */}
      {/*<DeleteActivityPopup/>*/}

    </>
  )
}

export default AdminManageActivity

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminManageActivity.css';
import AdminManageActivityRow from '../../components/admin-manage-activity-row/AdminManageActivityRow';
import CreateActivityPopup from '../../components/admin-popup/CreateActivityPopup';
import EditActivityPopup from '../../components/admin-popup/EditActivityPopup';

const AdminManageActivity = () => {
  const [activities, setActivities] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/admin/activity');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const handleCreate = async (createdData) => {
    try {
      // Add the created data to the activities state
      setActivities([...activities, createdData]);

      // Close the create popup
      setShowCreatePopup(false);
    } catch (error) {
      console.error('Error handling create:', error);
    }
  };

  const handleEdit = (editedData) => {
    const updatedActivities = activities.map((activity) =>
      activity.act_id === editedData.act_id ? editedData : activity
    );
    setActivities(updatedActivities);
  };

  return (
    <>
      <div className="admin-manage-activity-title-row">
        <h2 className='admin-manage-activity-title'>จัดการกิจกรรมโต้แย้ง</h2>
        <button onClick={() => setShowCreatePopup(true)}>สร้างกิจกรรมโต้แย้ง</button>
      </div>

      <table className='admin-download-activity-table'>
        <tr className='admin-manage-activity-table-header'>
          <th className='activity-table-header-topic-name'>ชื่อกิจกรรมโต้แย้ง</th>
          <th className='activity-table-header-time'>วัน-เวลาที่เริ่ม</th>
          <th className='activity-table-header-time'>วัน-เวลาที่สิ้นสุด</th>
          <th>สร้างโดย</th>
          <th>สถานะ</th>
          <th>จัดการ</th>
        </tr>

        {activities.map((activity) => (
          <AdminManageActivityRow key={activity.act_id} activity={activity} onEdit={() => {setSelectedActivity(activity); setShowEditPopup(true);}} />
        ))}
      </table>

      {showCreatePopup && <CreateActivityPopup closePopup={() => setShowCreatePopup(false)} onCreate={handleCreate} />}
      {/* Include EditActivityPopup component with necessary props */}
      {showEditPopup && <EditActivityPopup closePopup={() => setShowEditPopup(false)} onEdit={handleEdit} selectedActivity={selectedActivity} />}
    </>
  );
};

export default AdminManageActivity;

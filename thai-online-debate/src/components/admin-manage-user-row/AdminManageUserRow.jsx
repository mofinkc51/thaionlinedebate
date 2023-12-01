
import React, { useState } from 'react';
import inspectIcon from '../../assets/icon/inspect.png';
import './AdminManageUserRow.css';
function AdminManageUserRow({ user, onInspect }) {
  const { user_id , user_name, user_email, user_status } = user; 
  const [status, setStatus] = useState(user_status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value === "ปกติ" ? 'active' : 'not-active';
    setStatus(newStatus);

    // สร้าง object สำหรับส่งไปยัง API
    const updateStatusPayload = {
      user_id: user_id,
      user_status: newStatus
    };

    try {
      // ส่ง request ไปยัง server เพื่ออัปเดตสถานะ
      const response = await fetch('http://localhost:8800/api/admin/updatestatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateStatusPayload)
      });

      if (!response.ok) {
        throw new Error('Error updating user status');
      }

      // อ่านข้อมูล response (ถ้ามี)
      const responseData = await response.json();

      // สามารถอัปเดต state ใน frontend หรือทำการแจ้งเตือนถึงการเปลี่ยนแปลง
      console.log('Status updated successfully:', responseData);
    } catch (error) {
      // จัดการกับข้อผิดพลาดที่อาจเกิดขึ้น
      console.error('Failed to update status:', error);
    }
  };

  return (
    <tr className='admin-manage-user-row'>
      <td>{user_name}</td>
      <td>{user_email}</td>
      <td>
        <select value={status === 'active' ? 'ปกติ' : 'บัญชีถูกระงับ'} onChange={handleStatusChange}>
          <option value="ปกติ">ปกติ</option>
          <option value="บัญชีถูกระงับ">บัญชีถูกระงับ</option>
        </select>
      </td>
      <td>
        <button onClick={() => onInspect(user_id)}><img src={inspectIcon} alt="Inspect" /></button>
      </td>
    </tr>
  );
}

export default AdminManageUserRow;
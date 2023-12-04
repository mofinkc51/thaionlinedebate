
import React, { useState } from 'react';
import inspectIcon from '../../assets/icon/inspect.png';
import './AdminManageUserRow.css';
import { makeRequest } from '../../axios';
function AdminManageUserRow({ user, onInspect }) {
  const { user_id , user_name, user_email, user_status } = user; 
  const [status, setStatus] = useState(user_status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value === "ปกติ" ? 'active' : 'suspended';
    setStatus(newStatus);

    // สร้าง object สำหรับส่งไปยัง API
    const updateStatusPayload = {
      user_id: user_id,
      user_status: newStatus
    };

    try {
      // Assuming makeRequest.put is similar to makeRequest.get but for PUT requests
      const response = await makeRequest.put('admin/updatestatus', updateStatusPayload);
    
      // Assuming response structure is similar to that in makeRequest.get
      if (response && response.data) {
        // Update state in frontend or notify about the changes
        console.log('Status updated successfully:', response.data);
      } else {
        throw new Error('No response data received');
      }
    } catch (error) {
      // Handle any errors that might occur
      console.error('Failed to update status:', error);
    }
    
  };

  return (
    <tr className='admin-manage-user-row'>
      <td>{user_name}</td>
      <td>{user_email}</td>
      <td>
        <select id='drop-down-user-status' value={status === 'active' ? 'ปกติ' : 'บัญชีถูกระงับ' } style={{ backgroundColor: status === 'active' ? '#EBF9F1' : '#FBE7E8', color: status === 'active' ? '#1F9254' : '#A30D11'}} onChange={handleStatusChange}>
          <option value="ปกติ">ปกติ</option>
          <option value="บัญชีถูกระงับ" >บัญชีถูกระงับ</option>
        </select>
      </td>
      <td>
        <button onClick={() => onInspect(user_id)}><img src={inspectIcon} alt="Inspect" /></button>
      </td>
    </tr>
  );
}

export default AdminManageUserRow;
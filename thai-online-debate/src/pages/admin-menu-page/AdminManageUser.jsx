import React, { useEffect, useState } from 'react';
import AdminManageUserRow from '../../components/admin-manage-user-row/AdminManageUserRow';
import searchIcon from '../../assets/icon/search.png'; // เพิ่ม import นี้
import './AdminManageUser.css' ;

const AdminManageUser = () => {
  const [filteredUsers, setFilteredUsers] = useState([]); // เพิ่มตัวแปรนี้
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState(''); // State สำหรับเก็บข้อความค้นหา

    
  useEffect(() => {
    fetch('http://localhost:8800/api/admin/findall')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        
      });
  }, []);

  useEffect(() => {
    // ใน useEffect นี้คุณสามารถกรองข้อมูลผู้ใช้ตามข้อความค้นหาที่ได้รับ
    const filteredUsers = users.filter((user) =>
      user.user_name.toLowerCase().includes(searchText.toLowerCase())
    );
    // อัพเดทข้อมูลผู้ใช้ที่แสดงในตาราง
    // โดยใช้ข้อมูลผู้ใช้ที่ถูกกรองเท่านั้น
    setFilteredUsers(filteredUsers);
  }, [searchText, users]);

  return (
    <>
      {/* ... */}
      <div className="admin-manage-user-title-row">
        <h2>จัดการบัญชีผู้ใช้</h2>
        <div className="admin-manage-user-search-container">
          <button> <img src={searchIcon} alt="" /></button>
          <input
            type="text"
            placeholder="ค้นหาบัญชีผู้ใช้"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <table className='admin-manage-user-table'>
        {/* table header */}
        <tr className='admin-manage-user-table-header'>
          <th>ชื่อบัญชีผู้ใช้</th>
          <th>อีเมล</th>
          <th>สถานะ</th>
          <th>ตรวจสอบ</th>
        </tr>
        {/* table body */}
        {filteredUsers.map((user) => (
          <AdminManageUserRow key={user.user_id} user={user} />
        ))}
      </table>
    </>

);
};
export default AdminManageUser;
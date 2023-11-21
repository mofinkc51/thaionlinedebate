import React, { useEffect, useState } from 'react';
import AdminManageUserRow from '../../components/admin-manage-user-row/AdminManageUserRow';
import searchIcon from '../../assets/icon/search.png'; 
import './AdminManageUser.css' ;
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminManageUser = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState(''); // State สำหรับเก็บข้อความค้นหา
  const navigate = useNavigate();

  const handleInspectUser = (userId) => {
    console.log('User ID:', userId);
    navigate(`/profile/${userId}`);
  };
  
    
  useEffect(() => {
    axios.get('http://localhost:8800/api/admin/findall')
      .then((response) => {
        setUsers(response.data); // ใช้ response.data แทน data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.user_name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log('Filtered users:', filteredUsers);
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
  <AdminManageUserRow key={user.user_id} user={user} onInspect={handleInspectUser} />
))}
      </table>
    </>

);
};
export default AdminManageUser;
import React, { useEffect, useMemo, useState } from 'react';
import AdminManageUserRow from '../../components/admin-manage-user-row/AdminManageUserRow';
import searchIcon from '../../assets/icon/search.png'; 
import './AdminManageUser.css' ;
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios';

const AdminManageUser = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState(''); // State สำหรับเก็บข้อความค้นหา
  const navigate = useNavigate();

  const handleInspectUser = (userId) => {
    navigate(`/profile/${userId}`);
  };
  
    
const getUserData = async () => {
  try {
    const response = await makeRequest.get('admin/findall')
    setUsers(response.data);
  } catch (error) {
    console.error(error);
  
  }
}

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.user_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  }, [searchText, users]);

  useEffect(() => {
    getUserData();
  },[])
    //sort state and function
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleHeaderClick = (key) => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
    
    // Function to render the sort arrow based on the current sort configuration
    const renderSortArrow = (key) => {
      if (sortConfig.key === key) {
        if (sortConfig.direction === 'ascending') {
          return '▲'; 
        }
        if (sortConfig.direction === 'descending') {
          return '▼'; 
        }
      }
      return '▼';
    };
    // A basic sorting function
    const sortedusers = useMemo(() => {
      let sortableItems = [...users]; // Copy the users array to avoid mutating the original state
      if (sortConfig.key !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
    return sortableItems;
    }, [users, sortConfig]);

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
          <th onClick={() => handleHeaderClick('user_name')}>ชื่อผู้ใช้ {renderSortArrow('user_name')}</th>
          <th onClick={() => handleHeaderClick('user_email')}>อีเมล {renderSortArrow('user_email')}</th>
          <th onClick={() => handleHeaderClick('user_status')}>สถานะ {renderSortArrow('user_status')}</th>
          <th>ตรวจสอบ</th>
        </tr>
        {/* table body */}
        {sortedusers.map((user) => (
          <AdminManageUserRow key={user.user_id} user={user} onInspect={handleInspectUser} />
        ))}
      </table>
    </>

);
};
export default AdminManageUser;
import React, { useEffect, useMemo, useState } from 'react';
import AdminManageUserRow from '../../components/admin-manage-user-row/AdminManageUserRow';
import searchIcon from '../../assets/icon/search.png'; 
import './AdminManageUser.css' ;
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios';

const API_ENDPOINT = 'admin/findall';

const AdminManageUser = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, [searchText]);

  const getUserData = async () => {
    try {
      const response = await makeRequest.get(`${API_ENDPOINT}?search=${searchText}`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleInspectUser = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleHeaderClick = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

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

  const sortedusers = useMemo(() => {
    let sortableItems = [...users];
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
      <div className="admin-manage-user-scrollable">
        <table className='admin-manage-user-table'>
          <tr className='admin-manage-user-table-header'>
            <th className='admin-manage-user-header-name' onClick={() => handleHeaderClick('user_name')}>ชื่อผู้ใช้ {renderSortArrow('user_name')}</th>
            <th className='admin-manage-user-header-email' onClick={() => handleHeaderClick('user_email')}>อีเมล {renderSortArrow('user_email')}</th>
            <th className='admin-manage-user-header-status' onClick={() => handleHeaderClick('user_status')}>สถานะ {renderSortArrow('user_status')}</th>
            <th className='admin-manage-user-header-action'>ตรวจสอบ</th>
          </tr>
          {sortedusers.map((user) => (
            <AdminManageUserRow key={user.user_id} user={user} onInspect={handleInspectUser} />
          ))}
        </table>
      </div>
      
    </>
  );
};

export default AdminManageUser;

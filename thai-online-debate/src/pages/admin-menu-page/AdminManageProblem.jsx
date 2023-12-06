import React, { useState, useEffect, useMemo } from 'react';
import AdminManageProblemRow from '../../components/admin-manage-problem-row/AdminManageProblemRow';
import EditProblemPopup from '../../components/admin-popup/EditProblemPopup';
import DeleteProblemPopup from '../../components/admin-popup/DeleteProblemPopup';
import './AdminManageProblem.css';
import axios from 'axios';
import { makeRequest } from '../../axios';

function AdminManageProblem() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  
  const handleProblemEdit = (editedDescription) => {
    console.log('Edited description:', editedDescription);
    // ดำเนินการส่งข้อมูลการแก้ไขปัญหาและปิด EditProblemPopup
    // นี่คือตำแหน่งที่คุณควรส่งข้อมูลการแก้ไขปัญหาไปยังเซิร์ฟเวอร์หรือจัดการกับข้อมูลตามความเหมาะสม
    // ในกรณีนี้คุณอาจต้องอัปเดตข้อมูลใน problems ที่ใช้ useState
    setSelectedProblem(null); // ปิด EditProblemPopup
  };
  
  const getUserData = async () => {
    try {
      const response = await makeRequest.get('/admin/reportproblem')
      console.log(response.data);
      setProblems(response.data);
    } catch (error) {
      console.error(error);
    
    }
  }

  const handleEditProblemClick = (problem) => {
    setSelectedProblem(problem);
  };
  const handleProblemDeletion = () => {
    // Remove the problem from the UI state
    const updatedProblems = problems.filter((problem) => problem.rp_id !== problemToDelete);
    setProblems(updatedProblems);
    // Close the delete popup
    setDeletePopupOpen(false);
  };

  useEffect(() => {
    getUserData();
  },[]);
  const refreshProblems = () => {
    getUserData();
  }

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
  const sortedProblems = useMemo(() => {
    let sortableItems = [...problems]; // Copy the problems array to avoid mutating the original state
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
  }, [problems, sortConfig]);
return (
    <>
      <div className="admin-manage-activity-title-row">
        <h2 className='admin-manage-activity-title'>จัดการปัญหา</h2>
      </div>
      <div className='admin-manage-problem-scroll-box'>
        <table className='admin-download-activity-table'>
          {/* table header  */}
          <thead>
            <tr className='admin-manage-activity-table-header'>
              <th className='admin-manage-problem-header-name' onClick={() => handleHeaderClick('user_name')}>ชื่อผู้ร้อง {renderSortArrow('user_name')}</th>
              <th className='admin-manage-problem-header-date' onClick={() => handleHeaderClick('rp_timestamp')}>วัน-เวลา {renderSortArrow('rp_timestamp')}</th>
              <th className='admin-manage-problem-header-desc' onClick={() => handleHeaderClick('rp_description')}>รายละเอียดปัญหา {renderSortArrow('rp_description')}</th>
              <th className='admin-manage-problem-header-status' onClick={() => handleHeaderClick('rp_status')}>สถานะ {renderSortArrow('rp_status')}</th>
              <th className='admin-manage-problem-header-manage'>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {sortedProblems.map((problem) => (
              <AdminManageProblemRow
                key={problem.rp_id}
                problem={problem}
                onEditClick={() => handleEditProblemClick(problem)}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedProblem && (
        <EditProblemPopup
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
          onConfirm={handleProblemEdit}
          refreshProblems={refreshProblems}
        />
      )}
      {deletePopupOpen && (
        <DeleteProblemPopup
          onCancel={() => setDeletePopupOpen(false)}
          onConfirm={handleProblemDeletion}
          rp_id={problemToDelete}
        />
      )}
    </>
  );
}

export default AdminManageProblem;

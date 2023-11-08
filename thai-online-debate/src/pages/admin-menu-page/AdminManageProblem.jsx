import React, { useState, useEffect } from 'react';
import AdminManageProblemRow from '../../components/admin-manage-problem-row/AdminManageProblemRow';
import EditProblemPopup from '../../components/admin-popup/EditProblemPopup';
import axios from 'axios';

function AdminManageProblem() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8800/api/admin/reportproblem')
      .then(response => {
        setProblems(response.data);
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  }, []);

  const handleEditProblemClick = (problem) => {
    setSelectedProblem(problem);
  };

  return (
    <>
      <div className="admin-manage-activity-title-row">
        <h2 className='admin-manage-activity-title'>จัดการปัญหา</h2>
      </div>
      <table className='admin-download-activity-table'>
        <tr className='admin-manage-activity-table-header'>
          <th>ชื่อผู้ร้อง</th>
          <th>วัน-เวลา</th>
          <th>รายละเอียดปัญหา</th>
          <th>สถานะ</th>
          <th>จัดการ</th>
        </tr>
        {problems.map((problem) => (
          <AdminManageProblemRow
            key={problem.rp_id}
            problem={problem} // ส่งข้อมูลปัญหาไปยัง AdminManageProblemRow
            onEditClick={() => handleEditProblemClick(problem)}
          />
        ))}
      </table>
      {selectedProblem && <EditProblemPopup problem={selectedProblem} />}
    </>
  );
}

export default AdminManageProblem;

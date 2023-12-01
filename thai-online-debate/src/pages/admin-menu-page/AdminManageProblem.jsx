import React, { useState, useEffect } from 'react';
import AdminManageProblemRow from '../../components/admin-manage-problem-row/AdminManageProblemRow';
import EditProblemPopup from '../../components/admin-popup/EditProblemPopup';
import DeleteProblemPopup from '../../components/admin-popup/DeleteProblemPopup';
import axios from 'axios';

function AdminManageProblem() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  

  const onDelete = (rpIdToDelete) => {
    // Set the problem to delete and open the delete popup
    setProblemToDelete(rpIdToDelete);
    setDeletePopupOpen(true);
  };

  const handleProblemEdit = (editedDescription) => {
    // ดำเนินการส่งข้อมูลการแก้ไขปัญหาและปิด EditProblemPopup
    // นี่คือตำแหน่งที่คุณควรส่งข้อมูลการแก้ไขปัญหาไปยังเซิร์ฟเวอร์หรือจัดการกับข้อมูลตามความเหมาะสม
    // ในกรณีนี้คุณอาจต้องอัปเดตข้อมูลใน problems ที่ใช้ useState
    setSelectedProblem(null); // ปิด EditProblemPopup
  };
  

  useEffect(() => {
    axios.get('http://localhost:8800/api/admin/reportproblem')
      .then((response) => {
        setProblems(response.data);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  }, []);

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

    return (
    <>
      <div className="admin-manage-activity-title-row">
        <h2 className='admin-manage-activity-title'>จัดการปัญหา</h2>
      </div>
      <table className='admin-download-activity-table'>
        {/* ... Table header */}
        <tbody>
          {problems.map((problem) => (
            <AdminManageProblemRow
              key={problem.rp_id}
              problem={problem}
              onEditClick={() => handleEditProblemClick(problem)}
              onDelete={() => onDelete(problem.rp_id)}
            />
          ))}
        </tbody>
      </table>
      {selectedProblem && (
        <EditProblemPopup
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
          onConfirm={handleProblemEdit}
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

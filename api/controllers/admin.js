import { db } from "../connect.js";
import { createHash } from 'crypto';
import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = (req, res) => {
  const sql = "SELECT user_name,user_email,user_id,user_status FROM user";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json(err);
    }

    if (data.length === 0) {
      console.log("No users found");
      return res.status(404).json("No users found");
    }

    const users = data.map(user => {
      const { password, ...info } = user;
      return info;
    });

    return res.status(200).json(users);
  });
};

export const getProblem = (req, res) => {
  // Here we assume 'dbt_id' in the 'activity' table is the foreign key to the 'debatetopic' table.
  const sql = "SELECT u.user_name ,rp.* FROM reportedproblem AS rp LEFT JOIN user AS u ON rp.user_id = u.user_id WHERE rp.rp_check IS NULL OR rp.rp_check = false";

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json(err);
    }
    if (data.length === 0) return res.status(404).json("Report not found");

    console.log("Data:", data);
    return res.status(200).json(data);
  });
};



  
  export const getApprove = (req, res) => {
    const sql = `
        SELECT dr.*, u.user_name 
        FROM downloadrequest dr
        JOIN user u ON dr.user_id = u.user_id
    `;
  
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json("Requests not found");
        }
  
        console.log("Data:", data);
        return res.status(200).json(data);
    });
};


  export const getActivity = (req, res) => {
    const sql = `
      SELECT a.*, d.dbt_title 
      FROM activity a 
      LEFT JOIN debatetopic d ON a.dbt_id = d.dbt_id
    `;
  
    db.query(sql, (err, data) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json(err);
      }
      if (data.length === 0) return res.status(404).json("Activities not found");
  
      console.log("Data:", data);
      return res.status(200).json(data);
    });
  };

export const updateStatus = (req, res) => {
  const { user_id, user_status } = req.body;
  if (!user_id || !user_status) {
    return res.status(400).json({ message: "user_id and user_status are required" });
  }

  // คำสั่ง SQL สำหรับอัปเดตสถานะของผู้ใช้
  const sql = "UPDATE user SET user_status = ? WHERE user_id = ?";

  // ประมวลผลคำสั่ง SQL
  db.query(sql, [user_status, user_id], (err, results) => {
    if (err) {
      console.error("Error updating user status:", err);
      return res.status(500).json({ message: "Error updating user status" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User status updated successfully" });
  });
};

const crypto = ('crypto');

function generateDrId() {
  const currentDate = (new Date()).valueOf().toString();
  const random = Math.random().toString();
  return createHash('sha1').update(currentDate + random).digest('hex');
}

export const downloadRequest = (req, res) => {
  const { dr_total_topic, dr_proof_one, dr_proof_two, userIdFromClient } = req.body;
  
  // สร้าง dr_id ใหม่
  const dr_id = generateDrId();

  const sqlUserCheck = 'SELECT user_id FROM user WHERE user_id = ?';
  db.query(sqlUserCheck, [userIdFromClient], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error checking user", error: err });
      return;
    }
    
    if (result.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const sqlInsert = `INSERT INTO downloadrequest (dr_id, dr_total_topic, dr_proof_one, dr_proof_two, user_id) VALUES (?, ?, ?, ?, ?)`;
    db.query(sqlInsert, [dr_id, dr_total_topic, dr_proof_one, dr_proof_two, userIdFromClient], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error adding download request", error: err });
      } else {
        res.status(200).json({ message: "Download request added successfully", dr_id: dr_id });
      }
    });
  });
};

export const getApprovefromdr_id = (req, res) => {

  const drId = req.params.dr_id;
  const sql = `
      SELECT dr.*, u.user_name 
      FROM downloadrequest dr
      JOIN user u ON dr.user_id = u.user_id
      WHERE dr.dr_id = ?
  `;

  db.query(sql, [drId], (err, data) => {
      if (err) {
          console.error("Error:", err);
          return res.status(500).json(err);
      }
      if (data.length === 0) {
          return res.status(404).json("Request not found");
      }

      console.log("Data:", data);
      return res.status(200).json(data);
  });
};


export const postActivity = async (req, res) => {
  const { act_start_date, act_end_date, admin_email, dbt_title } = req.body;

  try {
    const adminIdResult = await new Promise((resolve, reject) => {
      const query = "SELECT admin_id FROM admin WHERE admin_email = ?";
      db.query(query, [admin_email], (err, results) => {
        if (err) return reject(err);
        if (results.length > 0) return resolve(results[0].admin_id);
        return reject(new Error('Admin not found.'));
      });
    });

    let dbtId;
    if (dbt_title) {
      const dbtIdResult = await new Promise((resolve, reject) => {
        const query = "SELECT dbt_id FROM debatetopic WHERE dbt_title = ?";
        db.query(query, [dbt_title], (err, results) => {
          if (err) return reject(err);
          if (results.length > 0) return resolve(results[0].dbt_id); 
          return resolve(null);
        });
      });

      if (!dbtIdResult) {
        dbtId = uuidv4();
        const insertDebateTopic = "INSERT INTO debatetopic (dbt_id, dbt_title) VALUES (?, ?)";
        await new Promise((resolve, reject) => {
          db.query(insertDebateTopic, [dbtId, dbt_title], (err, results) => {
            if (err) return reject(err);
            return resolve(results.insertId);
          });
        });
      } else {
        dbtId = dbtIdResult;
      }
    } else {
      return res.status(400).json({ message: "dbt_title is required" });
    }
    const act_id = uuidv4();
    const sql = `
      INSERT INTO activity (act_id, act_start_date, act_end_date, admin_id, dbt_id) 
      VALUES (?, ?, ?, ?, ?)
    `;
    await new Promise((resolve, reject) => {
      db.query(sql, [act_id, act_start_date, act_end_date, adminIdResult, dbtId], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });

    res.status(201).json({ message: "Activity added successfully", activityId: act_id });
  } catch (error) {
    res.status(500).json({ message: "Error adding activity", error: error.message });
  }
};

export const reportupdateStatus = (req, res) => {
  const rpId = req.body.rp_id;
  const checkSql = 'SELECT rp_id FROM reportedproblem';
  db.query(checkSql, [rpId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการค้นหาข้อมูล' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'ไม่พบ rp_id ที่ระบุในฐานข้อมูล' });
    }
    const updateSql = 'UPDATE reportedproblem SET rp_check = ? WHERE rp_id = ?';
    db.query(updateSql, [true, rpId], (err, updateResults) => {
      if (err) {
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดตคอลัมน์' });
      }

      return res.json({ message: 'อัปเดตคอลัมน์ rp_check เรียบร้อยแล้ว' });
    });
  });
};

export const admindescription = (req, res) => {
  const rpId = req.body.rp_id;
  const adminDescription = req.body.admin_description;

  const checkSql = 'SELECT rp_id FROM reportedproblem';
  db.query(checkSql, [rpId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการค้นหาข้อมูล' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'ไม่พบ rp_id ที่ระบุในฐานข้อมูล' });
    }

    const updateSql = 'UPDATE reportedproblem SET rp_admindescription = ? WHERE rp_id = ?';
    db.query(updateSql, [adminDescription, rpId], (err, updateResults) => {
      if (err) {
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดตคอลัมน์' });
      }

      return res.json({ message: 'อัปเดตคอลัมน์ rp_admindescription เรียบร้อยแล้ว' });
    });
  });
};







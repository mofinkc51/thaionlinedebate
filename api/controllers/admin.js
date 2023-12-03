import { db } from "../connect.js";
import { createHash } from 'crypto';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken";
import moment from "moment";

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
  const sql = `
    SELECT u.user_name, rp.* 
    FROM reportedproblem AS rp 
    LEFT JOIN user AS u ON rp.user_id = u.user_id
    ORDER BY rp.rp_status DESC, rp_timestamp DESC;
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json(err);
    }
    if (data.length === 0) return res.status(404).json("Report not found");
    return res.status(200).json(data);
  });
};

export const getDownloadRequest = (req, res) => {
    const sql = `
         SELECT dr.*, u.user_name 
        FROM downloadrequest dr
        JOIN user u ON dr.user_id = u.user_id
        WHERE dr.dr_status = 0 OR dr.dr_status IS NULL;
    `;
  
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json("Requests not found");
        }
  
        // console.log("Data:", data);
        return res.status(200).json(data);
    });
};


  export const getActivity = (req, res) => {
    const sql = `
      SELECT  d.dbt_title,a.act_id,a.act_start_date,a.act_end_date,user.user_name,d.dbt_id
      FROM activity a 
      LEFT JOIN debatetopic d ON a.dbt_id = d.dbt_id
      LEFT JOIN user ON d.user_id = user.user_id
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

  export const postActivity = (req, res) => { 
    const { dbt_title, dbt_description, dbt_agree, dbt_disagree, act_end_date, act_start_date } = req.body;
    console.log(req.body);
    const token = req.cookies.accessToken;
  
    if (!token) 
      return res.status(401).json("ไม่มีการตรวจสอบสิทธิ์!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token ไม่ถูกต้อง!");
  
      const sqlInsertTopic =
        "INSERT INTO debatetopic (`dbt_title`,`dbt_description`,`dbt_timestamp`,`dbt_agree`,`dbt_disagree`, `user_id`) VALUES (?)";
      const valuesTopic = [
        dbt_title,
        dbt_description,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        dbt_agree,
        dbt_disagree,
        userInfo.id
      ];
  
      // First, insert into debatetopic
      db.query(sqlInsertTopic, [valuesTopic], (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Get the last inserted dbt_id
        const dbt_id = data.insertId;
  
        // Process tags if the activity was successfully inserted
        const tags = req.body.tags;
  
        // Check if tags is an array before iterating
        if (Array.isArray(tags)) {
          // Function to handle tag insertion
          const handleTagInsert = (tag, index, callback) => {
            // Check if tag exists in the tag table first
            db.query("SELECT tag_id FROM tag WHERE tag_title = ?", [tag], (err, data) => {
              if (err) return callback(err);
              if (data.length > 0) {
                // Tag exists, use existing tag_id
                return callback(null, data[0].tag_id);
              } else {
                // Tag does not exist, insert new tag
                db.query("INSERT INTO tag (tag_title) VALUES (?)", [tag], (err, data) => {
                  if (err) return callback(err);
                  // Use new tag_id
                  return callback(null, data.insertId);
                });
              }
            });
          };
  
          // Function to handle insertion into debatetag table
          const insertDebateTag = (tagId) => {
            db.query("INSERT INTO debatetag (dbt_id, tag_id) VALUES (?, ?)", [dbt_id, tagId], (err, data) => {
              if (err) res.status(500).json(err);
            });
          };
  
          // Iterate over each tag and insert into debatetag table
          tags.forEach((tag, index) => {
            handleTagInsert(tag, index, (err, tagId) => {
              if (err) return res.status(500).json(err);
              insertDebateTag(tagId);
            });
          });
  
          return res.status(200).json("หัวข้อและแท็กถูกสร้างเรียบร้อยแล้ว");
        } else {
          return res.status(400).json("แท็กต้องเป็นอาร์เรย์");
        }
      });
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

export const getApproval = (req, res) => {

  const sql = `SELECT *FROM approval `;

  db.query(sql, (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length === 0) {
          return res.status(404).json("Approval not found");
      }
      console.log("Data:", data);
      return res.status(200).json(data);
  });
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
  const {rp_id ,adminNote} = req.body;
  const success = "success";
  const checkSql = 'UPDATE reportedproblem SET rp_status = ? ,rp_admin_note = ? WHERE rp_id = ?';

  db.query(checkSql, [success,adminNote,rp_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการค้นหาข้อมูล' });
    }
      return res.json({ message: 'อัปเดตคอลัมน์ rp_admindescription เรียบร้อยแล้ว' });
    });
};


export const postApproval = (req, res) => {
  const { dr_id, user_email } = req.body;

  // Check if dr_id already exists in the approval table
  const checkApprovalSql = 'SELECT * FROM approval WHERE dr_id = ?';
  
  db.query(checkApprovalSql, [dr_id], (checkError, approvalData) => {
    if (checkError) {
      console.error('Error checking approval data:', checkError);
      return res.status(500).send('Error checking approval data');
    }

    // If dr_id exists in approval table, send a message indicating so
    if (approvalData.length > 0) {
      return res.status(409).send('ไม่สามารถอนุมัติได้ เนื่องจากมีการอนุมัติแล้ว'); 
    }

    // If dr_id does not exist, proceed to get admin details
    const selectAdminIdSql = 'SELECT * FROM admin';

    db.query(selectAdminIdSql, (error, adminData) => {
      if (error) {
        console.error('Error retrieving admin data:', error);
        return res.status(500).send('Error retrieving admin data');
      }

      const adminMatch = adminData.find((admin) => admin.admin_email === user_email);

      if (!adminMatch) {
        return res.status(400).send('No matching admin found');
      }

      const admin_id = adminMatch.admin_id;

      // Prepare and execute the insertion into approval table
      const insertApprovalSql = `
        INSERT INTO approval (dr_id, admin_id, ap_timestamp, ap_download_expired_date, ap_status)
        VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'approved')
      `;

      db.query(insertApprovalSql, [dr_id, admin_id], (insertError) => {
        if (insertError) {
          console.error('Error inserting approval data:', insertError);
          return res.status(500).send('Error inserting approval data');
        }

        // Update the download request status to 'approved'
        const updateDownloadRequestSql = 'UPDATE downloadrequest SET dr_status = ? WHERE dr_id = ?';

        db.query(updateDownloadRequestSql, ['approved', dr_id], (updateError) => {
          if (updateError) {
            console.error('Error updating download request status:', updateError);
            return res.status(500).send('Error updating download request status');
          }

          // Send a successful response
          res.status(200).send('Approval data inserted and download request status updated successfully');
        });
      });
    });
  });
};
export const postRejected = (req, res) => {
  const { dr_id, user_email } = req.body;

  // Check if dr_id already exists in the approval table
  const checkApprovalSql = 'SELECT * FROM approval WHERE dr_id = ?';
  
  db.query(checkApprovalSql, [dr_id], (checkError, approvalData) => {
    if (checkError) {
      console.error('Error checking approval data:', checkError);
      return res.status(500).send('Error checking approval data');
    }
    // If dr_id exists in approval table, send a message indicating so
    if (approvalData.length > 0) {
      return res.status(409).send('ไม่สามารถปฐิเสธอนุมัติได้ เนื่องจากมีการอนุมัติแล้ว');
    }
    // If dr_id does not exist, proceed to get admin details
    const selectAdminIdSql = 'SELECT * FROM admin';

    db.query(selectAdminIdSql, (error, adminData) => {
      if (error) {
        console.error('Error retrieving admin data:', error);
        return res.status(500).send('Error retrieving admin data');
      }

      const adminMatch = adminData.find((admin) => admin.admin_email === user_email);

      if (!adminMatch) {
        return res.status(400).send('No matching admin found');
      }

      const admin_id = adminMatch.admin_id;

      // Prepare and execute the insertion into approval table
      const insertApprovalSql = `
        INSERT INTO approval (dr_id, admin_id, ap_timestamp, ap_download_expired_date, ap_status)
        VALUES (?, ?, NOW(), NOW(), 'rejected')
      `;

      db.query(insertApprovalSql, [dr_id, admin_id], (insertError) => {
        if (insertError) {
          console.error('Error inserting approval data:', insertError);
          return res.status(500).send('Error inserting approval data');
        }

        // Update the download request status to 'approved'
        const updateDownloadRequestSql = 'UPDATE downloadrequest SET dr_status = ? WHERE dr_id = ?';

        db.query(updateDownloadRequestSql, ['rejected', dr_id], (updateError) => {
          if (updateError) {
            console.error('Error updating download request status:', updateError);
            return res.status(500).send('Error updating download request status');
          }

          // Send a successful response
          res.status(200).send('Approval data inserted and download request status updated successfully');
        });
      });
    });
  });
};
export const editActivity = (req, res) => {

  const { dbt_title, dbt_description, dbt_agree, dbt_disagree,act_end_date, act_start_date,dbt_id } = req.body;
  console.log(dbt_title, dbt_description, dbt_agree, dbt_disagree,act_end_date, act_start_date,dbt_id)

  const token = req.cookies.accessToken;
  if (!token) 
  return res.status(401).json("Not authenticatede!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sql =
      "UPDATE debatetopic SET dbt_title=?,dbt_description=?,dbt_agree=?,dbt_disagree=? WHERE dbt_id=? AND user_id=?;"

    db.query(sql,[
      dbt_title,
      dbt_description,
      dbt_agree,
      dbt_disagree,
      dbt_id,
      userInfo.id,
    ],(err, data) => {
      if (err) return res.status(500).json(err) && console.log(err);

      if (data.affectedRows === 0) {
        return res.status(403).json("You can update only your post!");
      }
      // Assuming tags are an array of tag_titles to be linked with the dbt_id
      const tags = req.body.tags;
      console.log("Tags:", tags);
      // Insert activity information into activity table
      const sqlUpdateActivity = `
      UPDATE activity SET act_start_date =?, act_end_date = ? WHERE dbt_id = ?
    `;
      db.query(sqlUpdateActivity, [act_start_date, act_end_date, dbt_id], (err, data) => {
        if (err) return res.status(500).json(err) && console.log(err);
        if (!tags || tags.length === 0) {
          return res.status(200).json("Topic updated without tags");
        }
        // Delete old tags from debatetag table
        db.query("DELETE FROM debatetag WHERE dbt_id=?", [dbt_id], (deleteErr, deleteData) => {
          if (deleteErr) return res.status(500).json(deleteErr);
          // Function to handle tag insertion
          const handleTagInsert = (tag, index, callback) => {
            // Check if tag exists in the tag table first
            db.query("SELECT tag_id FROM tag WHERE tag_title = ?", [tag], (err, data) => {
              if (err) return callback(err);
              if (data.length > 0) {
                // Tag exists, use existing tag_id
                return callback(null, data[0].tag_id);
              } else {
                // Tag does not exist, insert new tag
                db.query("INSERT INTO tag (tag_title) VALUES (?)", [tag], (err, data) => {
                  if (err) return callback(err) && console.log(err);
                  // Use new tag_id
                  console.log("Tag inserted:", tag);
                  return callback(null, data.insertId);
                });
              }
            });
          };
          // Function to handle insertion into debatetag table
          const insertDebateTag = (tagId) => {
            db.query("INSERT INTO debatetag (dbt_id, tag_id) VALUES (?, ?)", [dbt_id, tagId], (err, data) => {
              if (err) res.status(500).json(err);
            });
          };
          tags.forEach((tag, index) => {
            handleTagInsert(tag, index, (err, tagId) => {
              if (err) return res.status(500).json(err);
              console.log("Tag ID:", tagId);
              insertDebateTag(tagId);
            });
          });
          return res.status(200).json("Topic and tags have been updated");
        });
      });
    });
  });
};

export const deleteActivity = (req,res)=>{
  const dbt_id = req.params.dbt_id;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticatede!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sql =
      "DELETE FROM debatetopic WHERE dbt_id=?";
      db.query(sql,[dbt_id],(err, data) => {
        if (err) res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("cant delete topic");
        return res.status(200).json("deleted topic");
      }
    );
  });
}
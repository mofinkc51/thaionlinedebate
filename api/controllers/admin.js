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
    const { dbt_title, dbt_description, dbt_agree, dbt_disagree,act_end_date, act_start_date } = req.body;
    console.log(req.body);
    const token = req.cookies.accessToken;
    if (!token) 
      return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
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
        // Process each tag from the request
        const tags = req.body.tags;
  
         // Insert activity information into activity table
          const sqlInsertActivity = `
          INSERT INTO activity (act_start_date, act_end_date, admin_id, dbt_id) VALUES (?, ?, ?, ?)
        `;
        db.query(sqlInsertActivity, [act_start_date, act_end_date, userInfo.id, dbt_id], (err, data) => {
          if (err) return res.status(500).json(err);
  
          // Process tags if the activity was successfully inserted
  
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
          return res.status(200).json("Topic and tags have been created");
        });
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


export const postApproval = (req, res) => {
  const { dr_id, user_email } = req.body;

  // console.log('user_email received:', user_email);
  // console.log('dr_id received:', dr_id);


  const selectAdminIdSql = 'SELECT * FROM admin';

  db.query(selectAdminIdSql, (error, adminData) => {
    if (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล admin:', error);
      return res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล admin');
    }

    const adminMatch = adminData.find((admin) => admin.admin_email === user_email);

    if (!dr_id || !adminMatch) {
      res.status(400).send('ข้อมูลไม่ถูกต้องหรือไม่พบ admin ที่เกี่ยวข้อง');
      return;
    }

    const admin_id = adminMatch.admin_id;

    const insertApprovalSql = `
      INSERT INTO approval (dr_id, admin_id, ap_timestamp, ap_download_expired_date, ap_status)
      VALUES (?, ?, NOW(), ?, 'อนุมัติ')
    `;
 
    const ap_timestamp = new Date();
    const ap_download_expired_date = new Date();
    ap_download_expired_date.setDate(ap_download_expired_date.getDate() + 7);

    const ap_status = 'อนุมัติ';

    db.query(insertApprovalSql, [dr_id, admin_id, ap_download_expired_date, ap_status], (insertError) => {
      if (insertError) {
        console.error('เกิดข้อผิดพลาดในการแทรกข้อมูล approval:', insertError);
        return res.status(500).send('เกิดข้อผิดพลาดในการแทรกข้อมูล approval');
      }

      res.status(200).send('บันทึกข้อมูลสำเร็จ');
    });
  });
};

export const approvalStatus = (req, res) => {
  const drId = req.body.dr_id;
  const checkSql = 'SELECT dr_id FROM downloadrequest ';
  db.query(checkSql, [drId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการค้นหาข้อมูล' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'ไม่พบ dr_id ที่ระบุในฐานข้อมูล' });
    }
    
    const updateSql = 'UPDATE downloadrequest SET dr_status = ? WHERE dr_id = ?';
    
    db.query(updateSql, [1, drId], (err, updateResults) => {
      if (err) {
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดตคอลัมน์' });
      }

      return res.json({ message: 'อัปเดตคอลัมน์ dr_status เรียบร้อยแล้ว' });
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
        if (err) return res.status(500).json(err) && console.log("act error");
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
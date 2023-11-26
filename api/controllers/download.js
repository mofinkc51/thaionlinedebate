import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import moment from "moment";

export const getDownload = (req,res)=>{
  let dbt_ids = Object.values(req.query)
  const token = req.cookies.accessToken;
  if (dbt_ids.length === 0)
  dbt_ids = ""
  if (!token) 
  return res.status(401).json("Not authenticatede!");
  const sql = "SELECT debatetopic.dbt_id,dbt_title,COUNT(debatecomment.dbt_id) AS count , dbt_agree,dbt_disagree FROM debatetopic LEFT JOIN debatecomment ON debatetopic.dbt_id = debatecomment.dbt_id WHERE debatetopic.dbt_id IN (?) GROUP BY debatetopic.dbt_id, debatetopic.dbt_title ";
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    db.query(sql,[dbt_ids],(err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data);
    })
  })
} 

export const getDownloadApproved = (req,res)=>{
  console.log(req.query)
  let dbt_id = req.query.dbt_id
  // let dbt_ids = Object.values(req.query)
  if (dbt_id.length === 0)
  return res.status(401).json("No list download!");
  const sql = "SELECT dbc_comment as comment, dbc_stance as stance FROM debatecomment WHERE dbt_id=? ";
    db.query(sql,[dbt_id],(err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data);
    })
}

export const addDownloadRequest = (req,res)=>{
  const token = req.cookies.accessToken;
  if (!token) 
  return res.status(401).json("Not authenticatede!");
  jwt.verify(token, "secretkey", (err, userInfo) => {



  });
}
export const addDownload = (req, res) => {
  console.log(req.body.dbt_id)
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json("Not authenticated!");
    }
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      // เริ่ม transaction
      db.beginTransaction((err) => {
        console.log("pass")
        if (err) return res.status(500).json(err);
  
        // ตรวจสอบว่ามี downloadrequest สำหรับ user_id นี้หรือยัง
        const sqlCheckDownloadRequest = "SELECT dr_id FROM downloadrequest WHERE user_id = ?";
        const user_id = userInfo.id;
  
        db.query(sqlCheckDownloadRequest, [user_id], (err, downloadReq) => {
          console.log("passSQL")
          if (err) {
            db.rollback(() => {
              return res.status(500).json(err);
            });
          } else {
            // ถ้ายังไม่มี, สร้าง downloadrequest ใหม่
            if (downloadReq.length === 0) {
              const sqlInsertDownloadRequest = "INSERT INTO downloadrequest (`dr_timestamp`, `dr_total_topic`, `dr_status`,`user_id`) VALUE (?)";
              const values = [
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                0,
                'pending',
                user_id
              ];
              db.query(sqlInsertDownloadRequest, [values], (err, result) => {
                if (err) {
                  console.log(err)
                  db.rollback(() => {
                    return res.status(500).json(err);
                  });
                } else { 
                  const dr_id = result.insertId;
                  // เพิ่มข้อมูลเข้าไปใน requestdebate
                  const sqlInsertRequestDebate = "INSERT INTO requestdebate (dbt_id, dr_id) VALUES (?, ?)";
                  db.query(sqlInsertRequestDebate, [req.body.dbt_id, dr_id], (err, result) => {
                    if (err) {
                      console.log(err)
                      db.rollback(() => {
                        return res.status(500).json(err);
                      });
                    } else {
                      // จบ transaction
                      db.commit((err) => {
                        if (err) {
                          db.rollback(() => {
                            console.log("err92")
                            return res.status(500).json(err);
                          });
                        } else {
                          return res.status(200).json("RequestDebate has been added and DownloadRequest is checked/created");
                        }
                      });
                    }
                  });
                }
              });
            } else {
              // ถ้า downloadrequest มีอยู่แล้ว, ดึง dr_id ที่มีอยู่
              const sqlSelectDownloadRequest = "SELECT dr_id FROM downloadrequest WHERE user_id = ? AND dr_status = 'pending'";
              db.query(sqlSelectDownloadRequest, [user_id], (err, downloadReq) => {
                if (err) {
                  db.rollback(() => {
                    console.log("Error at selecting downloadrequest:", err);
                    return res.status(500).json(err);
                  });
                } else {
                  // ตรวจสอบว่าได้รับ dr_id จาก downloadrequest ที่มีอยู่
                  if (downloadReq.length > 0) {
                    const dr_id = downloadReq[0].dr_id; // ดึง dr_id ที่มีอยู่
                    const sqlInsertRequestDebate = "INSERT INTO requestdebate (dbt_id, dr_id) VALUES (?, ?)";
                    db.query(sqlInsertRequestDebate, [req.body.dbt_id, dr_id], (err, result) => {
                      if (err) {
                        db.rollback(() => {
                          console.log("Error at inserting requestdebate:", err);
                          return res.status(500).json(err);
                        });
                      } else {
                        // จบ transaction
                        db.commit((err) => {
                          if (err) {
                            db.rollback(() => {
                              console.log("Error at committing transaction:", err);
                              return res.status(500).json(err);
                            });
                          } else {
                            return res.status(200).json("RequestDebate has been added and existing DownloadRequest is used");
                          }
                        });
                      }
                    });
                  } else {
                    // ถ้าไม่พบ dr_id (ซึ่งไม่ควรเกิดขึ้นเพราะ downloadrequest ควรมีอยู่แล้ว)
                    db.rollback(() => {
                      console.log("No existing downloadrequest found for user:", user_id);
                      return res.status(500).json({ message: "No existing downloadrequest found for user." });
                    });
                  }
                }
              });
            }
            
          }
        });
      });
    });
  };
  
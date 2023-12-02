import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getDownload = (req, res) => {
  const token = req.cookies.accessToken;
  console.log(req.params)
  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const user_id = userInfo.id; // ดึง user_id จาก token

    // ค้นหา dbt_id จาก downloadrequest ที่มีสถานะเป็น 'added'
    const sqlGetDbtIds = `
      SELECT rd.dbt_id 
      FROM requestdebate AS rd 
      JOIN downloadrequest AS dr ON rd.dr_id = dr.dr_id 
      WHERE dr.dr_status = 'added' 
      AND dr.user_id = ?
    `;

    db.query(sqlGetDbtIds, [user_id], (err, dbtIdsResults) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (dbtIdsResults.length === 0) {
        return res.status(201).json(dbtIdsResults);
      }

      // ดึงข้อมูลจาก debatetopic โดยใช้ dbt_id ที่ได้มา
      const dbtIds = dbtIdsResults.map((result) => result.dbt_id);
      const sqlGetDebateInfo = `
        SELECT debatetopic.dbt_id, dbt_title, COUNT(debatecomment.dbt_id) AS count, dbt_agree, dbt_disagree 
        FROM debatetopic 
        LEFT JOIN debatecomment ON debatetopic.dbt_id = debatecomment.dbt_id 
        WHERE debatetopic.dbt_id IN (?) 
        GROUP BY debatetopic.dbt_id, debatetopic.dbt_title
      `;

      db.query(sqlGetDebateInfo, [dbtIds], (err, debateInfoResults) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.status(200).json(debateInfoResults);
      });
    });
  });
};
export const getDownloadAdmin = (req,res)=>{
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
export const getDownloadDetail = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    const sql = "SELECT dr_name,dr_timestamp,dr_desc,dr_proof_one,dr_proof_two FROM downloadrequest WHERE dr_id = ?";
    const dr_id = req.params.dr_id;
    db.query(sql, [dr_id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (result.length === 0) {
        return res.status(404).json("Download request not found.");
      }
      return res.status(200).json(result[0]);
    })
  })
}
export const getDownloadDetailDebate = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    const sql = "SELECT dbt_title,rd.dbt_id , dr.dr_id FROM requestdebate as rd JOIN  downloadrequest as dr ON rd.dr_id = dr.dr_id JOIN debatetopic ON debatetopic.dbt_id = rd.dbt_id WHERE rd.dr_id = ?";
    const dr_id = req.params.dr_id;
    db.query(sql, [dr_id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (result.length === 0) {
        return res.status(404).json("Download request not found.");
      }
      return res.status(200).json(result);
    })
  })
}
export const updatePending = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    const user_id = userInfo.id;
    const sqlDr_id =
      "SELECT dr_id FROM downloadrequest WHERE user_id = ? AND dr_status = 'added'";
    db.query(sqlDr_id, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (result.length === 0) {
        return res.status(404).json("No download requests found.");
      }
      const dr_id = result[0].dr_id;
      const sqlCountRequestDebate =
        "SELECT COUNT(*) AS count FROM requestdebate WHERE dr_id = ?";
      db.query(sqlCountRequestDebate, [dr_id], (err, resultCount) => {
        if (err) {
          return res.status(500).json(err);
        }
        const CountRq = resultCount[0].count;
        // รับข้อมูลจาก request body
        const { dr_name, dr_desc, dr_proof_one, dr_proof_two } = req.body;
        // ตรวจสอบว่าข้อมูลที่จำเป็นทั้งหมดถูกส่งมาหรือไม่
        if (!dr_name || !dr_desc || !dr_proof_one || !dr_proof_two) {
          return res.status(400).json("All fields are required!");
        }
        const sql =
          "UPDATE downloadrequest SET dr_timestamp = ?, dr_name = ?, dr_desc = ?,dr_total_topic = ? ,dr_proof_one = ?, dr_proof_two = ?, dr_status = 'pending' WHERE dr_id = ?";

        db.query(
          sql,[
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          dr_name, 
          dr_desc,CountRq, 
          dr_proof_one, 
          dr_proof_two, 
          dr_id
        ],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json("An error occurred during the database operation.");
            }

            if (result.affectedRows === 0) {
              return res.status(404).json("No records found to update.");
            }

            res.status(200).json("Update successful!");
          }
        );
      });
    });
  });
};
export const getDownloadPending = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not authenticated!");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    const user_id = userInfo.id; // ดึง user_id จาก token
    const sql = "SELECT dr_id,dr_timestamp,dr_total_topic,dr_status FROM downloadrequest WHERE user_id = ? AND dr_status in ('approved', 'pending', 'rejected')";
    db.query(sql, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    })
  })
}

export const getDownloadApproved = (req, res) => {
  console.log(req.query);
  let dbt_id = req.query.dbt_id;
  if (dbt_id.length === 0) return res.status(401).json("No list download!");
  const sql =
    "SELECT dbc_comment as comment, dbc_stance as stance FROM debatecomment WHERE dbt_id=? ";
  db.query(sql, [dbt_id], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};
//delete
export const deleteDownload = (req, res) => {
  const dbt_id = req.params.dbt_id;
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const user_id = userInfo.id; // หรือวิธีการอื่นในการดึง user_id จาก token

    // ค้นหา dr_id ที่ตรงกับ user_id และมี dr_status เป็น 'added'
    const sqlGetDrIds = `
      SELECT dr_id 
      FROM downloadrequest 
      WHERE user_id = ? 
      AND dr_status = 'added'
    `;

    db.query(sqlGetDrIds, [user_id], (err, drIdsResults) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (drIdsResults.length === 0) {
        return res
          .status(404)
          .json({ message: "No added download requests found for this user." });
      }
      // ลบรายการใน requestdebate ที่มี dr_id ที่ตรงกับ dr_id ที่ได้มา
      const drIds = drIdsResults.map((result) => result.dr_id);
      const sqlDeleteRequestDebate = `
        DELETE FROM requestdebate 
        WHERE dr_id IN (?) AND dbt_id = ?
      `;

      db.query(
        sqlDeleteRequestDebate,
        [drIds, dbt_id],
        (err, deleteResults) => {
          if (err) {
            return res.status(500).json(err);
          }
          res
            .status(200)
            .json({ message: "Download requests have been deleted." });
        }
      );
    });
  });
};
//addtodownloadlist
export const addDownload = (req, res) => {
  console.log(req.body.dbt_id);
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // เริ่ม transaction
    db.beginTransaction((err) => {
      if (err) return res.status(500).json(err);

      // ตรวจสอบว่ามี downloadrequest สำหรับ user_id นี้หรือยัง
      const sqlCheckDownloadRequest =
        "SELECT dr_id FROM downloadrequest WHERE user_id = ? AND dr_status = 'added'";
      const user_id = userInfo.id;

      db.query(sqlCheckDownloadRequest, [user_id], (err, downloadReq) => {
        if (err) {
          db.rollback(() => {
            return res.status(500).json(err);
          });
        } else {
          // ถ้ายังไม่มี, สร้าง downloadrequest ใหม่
          if (downloadReq.length === 0) {
            const sqlInsertDownloadRequest =
              "INSERT INTO downloadrequest (`dr_timestamp`, `dr_total_topic`, `dr_status`,`user_id`) VALUE (?)";
            const values = [
              moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
              0,
              "added",
              user_id,
            ];
            db.query(sqlInsertDownloadRequest, [values], (err, result) => {
              if (err) {
                console.log(err);
                db.rollback(() => {
                  return res.status(500).json(err);
                });
              } else {
                const dr_id = result.insertId;
                // ถ้ามี Dr_id แล้วเพิ่มข้อมูลเข้าไปใน requestdebate
                const sqlInsertRequestDebate =
                  "INSERT INTO requestdebate (dbt_id, dr_id) VALUES (?, ?)";
                db.query(
                  sqlInsertRequestDebate,
                  [req.body.dbt_id, dr_id],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      db.rollback(() => {
                        return res.status(500).json(err);
                      });
                    } else {
                      // จบ transaction
                      db.commit((err) => {
                        if (err) {
                          db.rollback(() => {
                            return res.status(500).json(err);
                          });
                        } else {
                          return res
                            .status(200)
                            .json(
                              "RequestDebate has been added and DownloadRequest is checked/created"
                            );
                        }
                      });
                    }
                  }
                );
              }
            });
          } // ...
          else {
            // ถ้า downloadrequest มีอยู่แล้ว, ดึง dr_id ที่มีอยู่
            const sqlSelectDownloadRequest =
              "SELECT dr_id FROM downloadrequest WHERE user_id = ? AND dr_status = 'added'";
            db.query(
              sqlSelectDownloadRequest,
              [user_id],
              (err, downloadReq) => {
                if (err) {
                  db.rollback(() => {
                    return res.status(500).json(err);
                  });
                } else {
                  if (downloadReq.length > 0) {
                    const dr_id = downloadReq[0].dr_id; // ดึง dr_id ที่มีอยู่

                    // ตรวจสอบจำนวนข้อมูลใน requestdebate ก่อนเพิ่มข้อมูลใหม่
                    const sqlCountRequestDebate =
                      "SELECT COUNT(*) AS count FROM requestdebate WHERE dr_id = ?";
                    db.query(sqlCountRequestDebate, [dr_id], (err, results) => {
                      if (err) {
                        db.rollback(() => {
                          return res.status(500).json(err);
                        });
                      } else {
                        const count = results[0].count;
                        if (count >= 5) {
                          // ถ้ามี 5 แถวแล้ว, ส่ง response กลับไป
                          return res
                            .status(201)
                            .json(
                              "Cannot add more than 5 topics to downloadrequest."
                            );
                        } else {
                          // ถ้ายังไม่ถึง 5 แถว, เพิ่มข้อมูลใหม่ลงใน requestdebate
                          const sqlInsertRequestDebate =
                            "INSERT INTO requestdebate (dbt_id, dr_id) VALUES (?, ?)";
                          db.query(
                            sqlInsertRequestDebate,
                            [req.body.dbt_id, dr_id],
                            (err, result) => {
                              if (err) {
                                db.rollback(() => {
                                  return res
                                    .status(404)
                                    .json("มีประเด็นโต้แย้งนี้อยู่แล้ว");
                                });
                              } else {
                                // จบ transaction
                                db.commit((err) => {
                                  if (err) {
                                    db.rollback(() => {
                                      return res.status(500).json(err);
                                    });
                                  } else {
                                    return res
                                      .status(200)
                                      .json("เพิ่มเข้าลิสต์ดาวน์โหลดเรียบร้อย");
                                  }
                                });
                              }
                            }
                          );
                        }
                      }
                    });
                  } else {
                    // ถ้าไม่พบ dr_id (ซึ่งไม่ควรเกิดขึ้นเพราะ downloadrequest ควรมีอยู่แล้ว)
                    db.rollback(() => {
                      return res
                        .status(500)
                        .json({
                          message:
                            "No existing downloadrequest found for user.",
                        });
                    });
                  }
                }
              }
            );
          }
        }
      });
    });
  });
};

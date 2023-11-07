import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

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

export const addDownload = (req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) 
    return res.status(401).json("Not authenticatede!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const sql =
        "INSERT INTO debatecomment (`dbc_id`,`dbc_comment`,`dbc_total_like`,`dbc_stance`,`dbc_timestamp`, `user_id`, `dbt_id`) VALUES (?)";
        const randomId = function(length) {
          return Math.random().toString(36).substring(2, length+2);
      };

      const values = [
        randomId(8),
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.dbc_comment,
        req.body.dbc_total_like,
        req.body.dbc_stance,
        userInfo.id,
        req.body.dbt_id
    ];
      db.query(sql,[values],(err, data) => {

          if (err) res.status(500).json(err);
          return res.status(200).json("Comment has been created");
        }
      );
    });
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
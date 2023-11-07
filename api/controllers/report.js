import { db } from "../connect.js"
import moment from "moment";
import jwt from "jsonwebtoken";

export const addReport = (req,res)=>{
    const token = req.cookies.accessToken
    const dbt_id = req.body.dbt_id
    const rp_description = req.body.rp_description
    const status = "รอตรวจสอบ"
    const sql = "INSERT INTO reportedproblem ( `rp_description`,`rp_timestamp`,`rp_status` ,`dbt_id`, `user_id`) VALUES (?)"
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
  
        const values = [
          rp_description,
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          status,
          dbt_id,
          userInfo.id
      ];
        db.query(sql,[values],(err, data) => {
            if (err) res.status(500).json(err);
            return res.status(200).json("Topic has been created");
          }
        );
      });
}
export const getReport = (req,res)=>{
    
}
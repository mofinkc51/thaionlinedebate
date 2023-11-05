import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken";

export const getDownload = (req,res)=>{

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

export const deleteDownload = (req,res)=>{

}
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
export const getPost = (req,res)=>{
    
}

export const addPost = (req,res)=>{
    const token = req.cookies.accessToken;
    
    if (!token) 
    return res.status(401).json("Not authenticatede!");
    
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const sql =
        "INSERT INTO debatetopic (`dbt_id`,`dbt_title`,`dbt_description`,`dbt_timestamp`,`dbt_agree`,`dbt_disagree`, `user_id`) VALUES (?)";
        const randomId = function(length = 6) {
          return Math.random().toString(36).substring(2, length+2);
      };

      const values = [
        randomId(10),
        req.body.dbt_title,
        req.body.dbt_description,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.dbt_agree,
        req.body.dbt_disagree,
        userInfo.id
    ];
      db.query(sql,[values],(err, data) => {

          if (err) res.status(500).json(err);
          return res.status(200).json("User has been created");
        }
      );
    });
}

export const updatePost = (req,res)=>{
    
}

export const deletePost = (req,res)=>{
    
}

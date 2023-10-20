import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req,res)=>{
    const user_id = req.params.user_id;
    const sql = "SELECT * FROM user WHERE user_id=?";
  
    db.query(sql, [user_id], (err, data) => {
      if (err) return res.status(500).json(err);
      const { password, ...info } = data[0];
      return res.json(info);
    });
    
};

export const updateUser = (req,res)=>{
    const token = req.cookies.accessToken;

    if (!token) 
    return res.status(401).json("Not authenticatede!");
    
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const sql =
        "UPDATE user SET user_name=?,user_phonenum=?,user_pic=? WHERE user_id=? ";
  
      db.query(sql,[
        req.body.user_name, 
        req.body.user_phonenum,
        req.body.user_pic,
        userInfo.id,

      
      ],(err, data) => {

          if (err) res.status(500).json(err);
          if (data.affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("You can update only your post!");
        }
      );
    });


}

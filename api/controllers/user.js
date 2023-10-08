import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req,res)=>{
    const user_id = req.params.user_id;
    const q = "SELECT * FROM user WHERE user_id=?";
  
    db.query(q, [user_id], (err, data) => {
      if (err) return res.status(500).json(err);
      const { password, ...info } = data[0];
      return res.json(info);
    });
    
};

export const updateUser = (req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "UPDATE user SET `user_name`=?,`user_email`=? WHERE user_id=? ";
  
      db.query(
        q,
        [
          req.body.user_name,
          req.body.user_email,
          userInfo.user_id,
        ],
        (err, data) => {
          if (err) res.status(500).json(err);
          if (data.affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("You can update only your post!");
        }
      );
    });


}

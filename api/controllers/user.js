import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT * FROM user WHERE user_id=?";

  if (!user_id) return res.status(400).json("user_id is required");

  db.query(sql, user_id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    const { user_password, ...info } = data[0];
    return res.status(200).json(data[0]);
  });
};

//
export const getUserCount = (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT ? AS u,(SELECT COUNT(*) FROM debatetopic WHERE user_id = u) AS debate_count,(SELECT COUNT(*) FROM debatecomment WHERE user_id = u) AS comment_count,(SELECT COUNT(*) FROM favoritetopic WHERE user_id = u) AS fav_count;"
  
  db.query(sql, user_id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");
    
    return res.status(200).json(data[0]);
  });
  
}
//SELECT dbt_id, MAX(dbc_timestamp) AS timestamp FROM debatecomment WHERE user_id = 'aysg4ijg' GROUP BY dbt_id ORDER BY timestamp DESC;
export const getUserHistory = (req, res) => {
  const user_id = req.params.user_id;
  
  const sql = "SELECT dc.dbt_id, dt.dbt_title, MAX(dc.dbc_timestamp) AS timestamp FROM debatecomment AS dc JOIN debatetopic AS dt ON dc.dbt_id = dt.dbt_id WHERE dc.user_id = ? GROUP BY dc.dbt_id, dt.dbt_title ORDER BY timestamp DESC; "
  db.query(sql, user_id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("ไม่มีประวัติประเด็นโต้แย้ง");

    console.log(data);
    return res.status(200).json(data);
  });

}
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

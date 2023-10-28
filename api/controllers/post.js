import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getTopics = (req,res)=>{  
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Token is expired Please logged Out!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const sql = "SELECT debatetopic.dbt_id, debatetopic.dbt_title, COUNT(*) AS num_comments FROM debatetopic JOIN debatecomment ON debatetopic.dbt_id = debatecomment.dbt_id GROUP BY debatetopic.dbt_id ORDER BY num_comments DESC LIMIT   3;";
  
    db.query(sql, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getTopic = (req,res)=>{
  
}
export const getPost = (req,res)=>{
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Token is expired Please logged Out!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);

    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    ORDER BY p.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
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
          return res.status(200).json("Topic has been created");
        }
      );
    });
}

export const updatePost = (req,res)=>{
    
}

export const deletePost = (req,res)=>{
    
}

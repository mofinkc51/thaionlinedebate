import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getTops = (req,res)=>{  

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Token is expired Please logged Out!");

  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
    const sql = 
    "SELECT debatetopic.dbt_id, debatetopic.dbt_title, COUNT(debatecomment.dbt_id) AS num_comments FROM debatetopic LEFT JOIN debatecomment ON debatetopic.dbt_id = debatecomment.dbt_id GROUP BY debatetopic.dbt_id, debatetopic.dbt_title, debatetopic.dbt_timestamp ORDER BY num_comments DESC, debatetopic.dbt_timestamp DESC LIMIT 6;"
  
    db.query(sql, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getTopic = (req,res)=>{
  const dbt_id = req.params.dbt_id;
  const sql = "SELECT d.dbt_id, d.dbt_title, d.dbt_description, d.dbt_timestamp, d.dbt_agree, d.dbt_disagree, d.user_id, u.user_name FROM debatetopic AS d JOIN user AS u ON d.user_id = u.user_id WHERE d.dbt_id=?";

  if (!dbt_id) return res.status(400).json("dbt_id is required");

  db.query(sql, dbt_id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Topic not found");

    return res.status(200).json(data);
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
export const getLastTopic = (req,res)=>{
  const token = req.cookies.accessToken;
  if (!token) 
  return res.status(401).json("Not authenticatede!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const sql = "SELECT dbt_id,dbt_timestamp FROM debatetopic WHERE user_id = ? ORDER BY dbt_timestamp DESC LIMIT 1"
    db.query(sql,[userInfo.id],(err, data) => {
        if (err) res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("last not found");
        return res.status(200).json(data);
      }
    );
  });
}
export const getFav = (req,res)=>{
  const token = req.cookies.accessToken;

  if (!token) 
  return res.status(401).json("Not authenticatede!");
  
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sql = "SELECT debatetopic.dbt_id, debatetopic.dbt_title, favoritetopic.favtop_id FROM debatetopic INNER JOIN favoritetopic ON debatetopic.dbt_id = favoritetopic.dbt_id WHERE favoritetopic.user_id=?;"
    db.query(sql,[userInfo.id],(err, data) => {

        if (err) res.status(500).json(err);
        if (data.length === 0) return res.status(200).json(data);
        return res.status(200).json(data);
      }
    );
  });
}

export const checkTopicCanEdit = (req,res)=>{
  const dbt_id = req.params.dbt_id;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticatede!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sql =
      "SELECT * FROM debatetopic WHERE dbt_id=? AND user_id=?";

    db.query(sql,[dbt_id,userInfo.id],(err, data) => {
        if (err) res.status(500).json(err);
        if (data.length === 0) return res.status(200).json("false");
        return res.status(200).json("true");
      }
    );
  });
}
export const updatePost = (req,res)=>{
  const token = req.cookies.accessToken;
  if (!token) 
  return res.status(401).json("Not authenticatede!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sql =
      "UPDATE debatetopic SET dbt_title=?,dbt_description=?,dbt_agree=?,dbt_disagree=? WHERE dbt_id=? AND user_id=?;"

    db.query(sql,[
      req.body.dbt_title,
      req.body.dbt_description,
      req.body.dbt_agree,
      req.body.dbt_disagree,
      req.body.dbt_id,
      userInfo.id,
    ],(err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
}

export const deletePost = (req,res)=>{
  const dbt_id = req.params.dbt_id;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticatede!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sql =
      "DELETE FROM debatetopic WHERE dbt_id=? AND user_id=?";

    db.query(sql,[dbt_id,userInfo.id],(err, data) => {
        if (err) res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("cant delete topic");
        return res.status(200).json("deleted topic");
      }
    );
  });
}
export const getSearch = (req,res)=>{
  const sql = "SELECT dbt_id, dbt_title FROM debatetopic";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Topic not found");
    return res.status(200).json(data);
  });
}
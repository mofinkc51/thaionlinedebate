import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getTops = (req,res)=>{  

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Token is expired Please logged Out!");

  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
    const sql = "SELECT debatetopic.dbt_id, debatetopic.dbt_title, COUNT(*) AS num_comments FROM debatetopic JOIN debatecomment ON debatetopic.dbt_id = debatecomment.dbt_id GROUP BY debatetopic.dbt_id ORDER BY num_comments DESC LIMIT 3;";
  
    db.query(sql, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getTopic = (req,res)=>{
  const dbt_id = req.params.dbt_id;
  const sql = "SELECT * FROM debatetopic WHERE dbt_id=?";

  if (!dbt_id) return res.status(400).json("dbt_id is required");

  db.query(sql, dbt_id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Topic not found");

    return res.status(200).json(data);
  });
}
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
          return res.status(200).json("Topic has been created");
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
        if (data.length === 0) return res.status(404).json("fav not found");
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
        if (data.length === 0) return res.status(404).json("false");
        return res.status(200).json("true");
      }
    );
  });
}
export const updatePost = (req,res)=>{
  // const dbt_id = req.params.dbt_id;
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
        console.log(req.body.dbt_id,userInfo.id)
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
}

export const deletePost = (req,res)=>{
    
}

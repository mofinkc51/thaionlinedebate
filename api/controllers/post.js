import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getTops = (req,res)=>{  

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Token is expired Please logged Out!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    console.log(userInfo)
    const sql = 
    "SELECT debatetopic.dbt_id, debatetopic.dbt_title, COUNT(debatecomment.dbt_id) AS num_comments FROM debatetopic LEFT JOIN debatecomment ON debatetopic.dbt_id = debatecomment.dbt_id GROUP BY debatetopic.dbt_id, debatetopic.dbt_title, debatetopic.dbt_timestamp ORDER BY num_comments DESC, debatetopic.dbt_timestamp DESC LIMIT 12;"
  
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

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) 
    return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const sqlInsertTopic =
      "INSERT INTO debatetopic (`dbt_title`,`dbt_description`,`dbt_timestamp`,`dbt_agree`,`dbt_disagree`, `user_id`) VALUES (?)";
    const valuesTopic = [
      req.body.dbt_title,
      req.body.dbt_description,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.dbt_agree,
      req.body.dbt_disagree,
      userInfo.id
    ];
    // First, insert into debatetopic
    db.query(sqlInsertTopic, [valuesTopic], (err, data) => {
      if (err) return res.status(500).json(err);
      // Get the last inserted dbt_id
      const dbt_id = data.insertId;
      // Process each tag from the request
      const tags = req.body.tags; // Your second dataset ["กฎหมายชาวบ้าน","Part Time",...]
      console.log(dbt_id,tags)
      // Function to handle tag insertion
      const handleTagInsert = (tag, index, callback) => {
        // Check if tag exists in the tag table first
        db.query("SELECT tag_id FROM tag WHERE tag_title = ?", [tag], (err, data) => {
          if (err) return callback(err);
          if (data.length > 0) {
            // Tag exists, use existing tag_id
            return callback(null, data[0].tag_id);
          } else {
            // Tag does not exist, insert new tag
            db.query("INSERT INTO tag (tag_title) VALUES (?)", [tag], (err, data) => {
              if (err) return callback(err);
              // Use new tag_id
              return callback(null, data.insertId);
            });
          }
        });
      };

      // Function to handle insertion into debatetag table
      const insertDebateTag = (tagId) => {
        db.query("INSERT INTO debatetag (dbt_id, tag_id) VALUES (?, ?)", [dbt_id, tagId], (err, data) => {
          if (err) res.status(500).json(err);
        });
      };

      // Iterate over each tag and insert into debatetag table
      tags.forEach((tag, index) => {
        handleTagInsert(tag, index, (err, tagId) => {
          if (err) return res.status(500).json(err);
          insertDebateTag(tagId);
        });
      });

      return res.status(200).json("Topic and tags have been created");
    });
  });
};

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

//SELECT tag_id, COUNT(dbt_id) AS tag_count FROM debatetag GROUP BY tag_id ORDER BY tag_count DESC LIMIT 5 
export const getTags = (req,res)=>{
  const sql = "SELECT tag.tag_title,debatetag.tag_id, COUNT(dbt_id) AS tag_count FROM debatetag LEFT JOIN tag ON debatetag.tag_id = tag.tag_id GROUP BY debatetag.tag_id ORDER BY tag_count DESC LIMIT 5;";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    return res.status(200).json(data);
  });
}
export const getTopicByTag = (req,res)=>{
  const tag_name = req.params.tag_name;
  const sql = "SELECT tag.tag_id, debatetopic.dbt_id,debatetopic.dbt_title FROM tag  LEFT JOIN debatetag ON tag.tag_id = debatetag.tag_id  LEFT JOIN debatetopic ON debatetopic.dbt_id = debatetag.dbt_id WHERE tag.tag_title = ?; "
  db.query(sql,tag_name, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    return res.status(200).json(data);
  })
}

export const getAllTag = (req,res)=>{
  const sql = "SELECT tag_title FROM tag;"
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    return res.status(200).json(data);
  })
}
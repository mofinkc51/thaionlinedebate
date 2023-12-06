import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComment = (req, res) => {
  const dbt_id = req.params.dbt_id;
  const sql = "SELECT dc.*, u.user_pic ,dc.user_id FROM debatecomment AS dc JOIN user AS u ON dc.user_id = u.user_id WHERE dc.dbt_id=? AND dc.dbc_stance=? ORDER BY dc.dbc_timestamp DESC;";
  const stance = req.query;
  if (!dbt_id) return res.status(400).json("dbt_id is required");
  db.query(sql, [dbt_id, stance.dbc_stance], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(200).json(data);

    return res.status(200).json(data);
  });
}

export const addComment = (req, res) => {

    const token = req.cookies.accessToken;
    
    if (!token) 
    return res.status(401).json("Not authenticatede!");
    
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const sql =
        "INSERT INTO debatecomment (`dbc_comment`,`dbc_total_like`,`dbc_stance`,`dbc_timestamp`, `user_id`, `dbt_id`) VALUES (?)";

      const values = [
        req.body.dbc_comment,
        req.body.dbc_total_like,
        req.body.dbc_stance,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.dbt_id
    ];
      db.query(sql,[values],(err, data) => {

          if (err) res.status(500).json(err);
          return res.status(200).json("Comment has been created");
        }
      );
    });
};

export const getCanComment = (req, res) => {
  const dbc_id = req.params.dbc_id;
  const dbt_id = req.query.dbt_id;
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json("Not authenticatede!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    if (userInfo.role_id === 'admin') return res.status(200).json("true");
    const sql =
      "SELECT dbc_id FROM debatecomment WHERE dbc_id = ? AND dbt_id=? AND user_id=?";
    db.query(sql,[dbc_id,dbt_id,userInfo.id],(err, data) => {
        if (err) res.status(500).json(err);
        if (data.length === 0) return res.status(200).json("false");
        return res.status(200).json("true");
      }
    );
  });
}

export const updateComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) 
  return res.status(401).json("Not authenticatede!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    if (userInfo.role_id === 'admin') {
      const sql =
      "UPDATE debatecomment SET dbc_comment=?,dbc_timestamp=? WHERE dbc_id=?"
      db.query(sql,[
        req.body.dbc_comment,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.dbc_id
      ],(err, data) => {
          if (err) res.status(500).json(err);
          if (data.affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("You can update only your comment!");
        }
      );
    } else {
      const sql =
      "UPDATE debatecomment SET dbc_comment=?,dbc_timestamp=? WHERE dbc_id=?"
    db.query(sql,[
      req.body.dbc_comment,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.dbc_id
    ],(err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your comment!");
      }
    );
    }

  });
}

export const deleteComment= (req,res) => {
  const dbc_id = req.params.dbc_id;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticatede!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sql =
      "DELETE FROM debatecomment WHERE dbc_id=?";
    db.query(sql,dbc_id,(err, data) => {
        if (err) res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("cant delete comment");
        return res.status(200).json("deleted comment");
      }
    );
  });
}
export const toggleLikeComment = (req, res) => {
  const dbc_id = req.params.dbc_id;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sqlCheckLike = `
      SELECT * FROM comment_likes WHERE dbc_id = ? AND user_id = ?
    `;
    db.query(sqlCheckLike, [dbc_id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length === 0) {
        // If like does not exist, insert like
        const sqlInsertLike = `
          INSERT INTO comment_likes (dbc_id, user_id) VALUES (?, ?)
        `;
        db.query(sqlInsertLike, [dbc_id, userInfo.id], (err, insertResult) => {
          if (err) return res.status(500).json(err);

          // Update total likes
          const sqlUpdateTotalLike = `
            UPDATE debatecomment SET dbc_total_like = dbc_total_like + 1 WHERE dbc_id = ?
          `;
          db.query(sqlUpdateTotalLike, [dbc_id], (err, updateResult) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Like added.");
          });
        });
      } else {
        // If like exists, remove like
        const sqlRemoveLike = `
          DELETE FROM comment_likes WHERE dbc_id = ? AND user_id = ?
        `;
        db.query(sqlRemoveLike, [dbc_id, userInfo.id], (err, deleteResult) => {
          if (err) return res.status(500).json(err);

          // Update total likes
          const sqlUpdateTotalLike = `
            UPDATE debatecomment SET dbc_total_like = dbc_total_like - 1 WHERE dbc_id = ?
          `;
          db.query(sqlUpdateTotalLike, [dbc_id], (err, updateResult) => {
            if (err) return res.status(500).json(err);
            return res.status(201).json("Like removed.");
          });
        });
      }
    });
  });
};

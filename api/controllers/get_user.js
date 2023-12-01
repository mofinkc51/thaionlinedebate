import { db } from "../connect.js";

export const getAllUsers = (req, res) => {
  const sql = "SELECT user_name,user_email,user_id FROM user";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json(err);
    }

    if (data.length === 0) {
      console.log("No users found");
      return res.status(404).json("No users found");
    }

    const users = data.map(user => {
      const { password, ...info } = user;
      return info;
    });

    return res.status(200).json(users);
  });
};

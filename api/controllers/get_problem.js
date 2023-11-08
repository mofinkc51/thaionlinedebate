
import { db } from "../connect.js";

export const getProblem = (req, res) => {
  // Here we assume 'dbt_id' in the 'activity' table is the foreign key to the 'debatetopic' table.
  const sql = "SELECT u.user_name ,rp.* FROM reportedproblem AS rp LEFT JOIN user AS u ON rp.user_id = u.user_id";

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json(err);
    }
    if (data.length === 0) return res.status(404).json("Report not found");

    console.log("Data:", data);
    return res.status(200).json(data);
  });
};
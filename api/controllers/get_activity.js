// get_activity.js
import { db } from "../connect.js";

export const getActivity = (req, res) => {
  // Here we assume 'dbt_id' in the 'activity' table is the foreign key to the 'debatetopic' table.
  const sql = `
    SELECT a.*, d.dbt_title 
    FROM activity a 
    LEFT JOIN debatetopic d ON a.dbt_id = d.dbt_id
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json(err);
    }
    if (data.length === 0) return res.status(404).json("Activities not found");

    console.log("Data:", data);
    return res.status(200).json(data);
  });
};
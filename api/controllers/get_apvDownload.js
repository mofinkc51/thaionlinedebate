// get_apvDownload.js
import { db } from "../connect.js";

export const getApprove = (req, res) => {
  const sql = "SELECT * FROM downloadrequest";

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json(err);
    }
    if (data.length === 0) return res.status(404).json("User not found");

    console.log("Data:", data);
    return res.status(200).json(data);
  });
};

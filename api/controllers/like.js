import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const addFavorite = (req, res) => {
    const token = req.cookies.accessToken;
    const dbt_id = req.body.dbt_id;
    if (!token) {
        return res.status(401).json("Not authenticated!");
    }
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const sql = "SELECT favtop_id FROM favoritetopic WHERE user_id = ? AND dbt_id=?";
        db.query(sql, [userInfo.id, dbt_id], (err, data) => {
            if (err) return res.status(500).json(err);

            if (data.length) {
                // If the topic is already favorited, remove it from favorites
                const deleteFavSql = "DELETE FROM favoritetopic WHERE user_id = ? AND dbt_id=?";
                db.query(deleteFavSql, [userInfo.id, dbt_id], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("ลบออกจากรายการประเด็นโต้แย้งที่ชื่นชอบแล้ว");
                });
            } else {
                // If the topic is not favorited, add it to favorites
                const addFavSql = "INSERT INTO favoritetopic (favtop_id, favtop_timestamp, user_id, dbt_id) VALUES (?)";
                const newFavId = Math.random().toString(36).substring(2, 8);
                const newFavValues = [
                    newFavId,
                    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                    userInfo.id,
                    dbt_id
                ];
                db.query(addFavSql, [newFavValues], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("เพิ่มเข้ารายการประเด็นโต้แย้งที่ชื่นชอบแล้ว");
                });
            }
        });
    });
};

export const checkFav = (req, res) => {
    const token = req.cookies.accessToken;
    const dbt_id = req.query.dbt_id;
    if (!token) {
        return res.status(401).json("Not authenticated!");
    }
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const sql = "SELECT favtop_id FROM favoritetopic WHERE user_id = ? AND dbt_id=?";
        db.query(sql, [userInfo.id, dbt_id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) return res.status(200).json("false");
            return res.status(200).json("true");
        });
    });
}
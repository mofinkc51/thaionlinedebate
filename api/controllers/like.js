import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const addFavorite = (req, res) => {
    const token = req.cookies.accessToken;
    const dbt_id = req.body.dbt_id;
    if (!token) 
    return res.status(401).json("Not authenticatede!");

    const sql = "SELECT favtop_id FROM favoritetopic WHERE user_id = ? AND dbt_id=?";
    
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        db.query(sql,[userInfo.id, dbt_id], (err,data)=>{
            if(err) return res.status(500).json(err)
            if(data.length) return res.status(409).json("cant fav same topic");

            const sql = "INSERT INTO favoritetopic (`favtop_id`,`favtop_timestamp`, `user_id`,`dbt_id`) VALUES (?)";
            
            const randomId = function(length = 6) {
                return Math.random().toString(36).substring(2, length+2);
            };
            const VALUES = [
                randomId(6),
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userInfo.id,
                dbt_id
            ]
            db.query(sql,[VALUES],(err, data) => {
                if (err) res.status(500).json(err);
                return res.status(200).json("Fav has been added");
                }
            );
        })
    });
}
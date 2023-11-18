import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken";

export const register = (req,res)=>{
    //check user

    const sql = "SELECT * FROM user WHERE user_email = ?"

    db.query(sql,[req.body.user_email], (err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("email is already exists");
    
    //create user
        //hash pass
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.user_password,salt)
        
        const sql = "INSERT INTO user (`user_id`,`user_name`,`user_email`,`user_phonenum`,`user_password`,`user_pic`) VALUE (?)";
        
        const randomId = function(length = 6) {
            return Math.random().toString(36).substring(2, length+2);
          };
        const defaultPic = "profile.png";
        const values = [
            randomId(8),
            req.body.user_name,
            req.body.user_email,
            req.body.user_phonenum,
            hashedPassword,
            defaultPic
        ];
        db.query(sql, [values], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            return res.status(200).json("User has been created");
        });
    });
}; 

export const login = (req, res) => {
    const sql = "SELECT * FROM user WHERE user_email = ?";
    db.query(sql, [req.body.user_email], (err, userData) => {
        if (err) return res.status(500).json(err);
        if (userData.length === 0) return res.status(404).json("User not found");
        const checkPass = bcrypt.compareSync(req.body.user_password, userData[0].user_password);
        if (!checkPass) 
            return res.status(400).json("Wrong password or email");
        if (userData[0].role_id === 'admin') {
            // ตรวจสอบในตาราง admin
            const sqlCheckAdmin = "SELECT * FROM admin WHERE admin_email = ?";
            db.query(sqlCheckAdmin, [userData[0].user_email], (err, adminData) => {
                if (err) return res.status(500).json(err);

                if (adminData.length === 0) {
                    // ผู้ใช้มี role_id เป็น admin แต่ไม่มีข้อมูลในตาราง admin, ทำการเพิ่มข้อมูล
                    const sqlInsertAdmin = "INSERT INTO admin (admin_id, admin_email, admin_username, admin_phonenum) VALUES (?, ?, ?, ?)";
                    db.query(sqlInsertAdmin, [userData[0].user_id, userData[0].user_email, userData[0].user_username, userData[0].user_phonenum], (err, insertResult) => {
                        if (err) {
                            console.error("Error while inserting into admin table:", err);
                            return res.status(500).json(err);
                        }

                        console.log("Admin data inserted successfully, result:", insertResult);
                    });
                }
            });
        }

        // สร้าง token และส่งข้อมูลผู้ใช้กลับ (รวมถึงขั้นตอนอื่นๆที่ทำในฟังก์ชันเดิม)
        const token = Jwt.sign({ id: userData[0].user_id }, "secretkey");
        const { user_password, ...ot } = userData[0];

        res.cookie("accessToken", token, { httpOnly: true })
            .status(200) 
            .json(ot);
    });
};




export const changePassword = (req, res) => {
    const sqlSelect = "SELECT * FROM user WHERE user_id = ?";
    db.query(sqlSelect, [req.body.user_id], (err, data) => {
        if (err) return res.status(500).json(err); 
        if (data.length === 0) return res.status(404).json("User not found");

        const checkPass = bcrypt.compareSync(req.body.user_password, data[0].user_password);
        if (!checkPass) 
            return res.status(400).json("Wrong password");
        // If the password is correct, update the password in the database
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.new_password, salt);
        const sqlUpdate = "UPDATE user SET user_password=? WHERE user_id=?";
        db.query(sqlUpdate, [hashedPassword, req.body.user_id], (updateErr, updateData) => {
            if (updateErr) return res.status(500).json(updateErr); 
            // Generate a new token
            const token = Jwt.sign({ id: data[0].user_id }, "secretkey");
            // Respond with success message
            res.cookie("accessToken", token, { httpOnly: true })
              .status(200)
              .json("Password updated successfully");
        });
    });
};
   
export const logout = (req,res)=>{
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none"
    }).status(200).json("User has logged out");
    
};

export const checktoken = (req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) {
        console.log("no token")
        return token;
    } else {
        console.log(token)
        return res.status(200).json("Token is valid");
    } 
};
 
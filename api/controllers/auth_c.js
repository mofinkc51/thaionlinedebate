import { db } from "../connect.js"
import bcrypt from "bcryptjs"
export const register = (req,res)=>{
    //check user

    const q = "SELECT * FROM user WHERE user_name = ?"

    db.query(q,[req.body.user_name], (err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User already ext")
    
    //create user
        //hash pass
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.user_password,salt)
        
        const q = "INSERT INTO user (`user_id`,`user_name`,`user_email`,`user_phonenum`,`user_password`) VALUE (?)";
        
        const randomId = function(length = 6) {
            return Math.random().toString(36).substring(2, length+2);
          };

        const values = [
            randomId(8),
            req.body.user_name,
            req.body.user_email,
            req.body.user_phonenum,
            hashedPassword
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        });
    });
};

export const login = (req,res)=>{

};

export const logout = (req,res)=>{
    
};
import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"!@#mofin123",
    database:"thaionlinedebate"
})

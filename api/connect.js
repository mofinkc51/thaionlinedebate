import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234567890",
    database:"thai-online-debate",
})

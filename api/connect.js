import mysql from "mysql"

export const db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"0869844339bB@",
    database:"thai-online-debate",
    port:3306
})
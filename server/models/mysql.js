import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: "admin",
  password: process.env.DB_PASSWORD,
  database: "board_DB",
  multipleStatements: true,
});

export default db;

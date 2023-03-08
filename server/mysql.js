import mysql from "mysql";

const db = mysql.createPool({
  host: "web-db.czezlldmbgmn.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "alsrua17931!",
  database: "board_DB",
  multipleStatements: true,
});

export default db;

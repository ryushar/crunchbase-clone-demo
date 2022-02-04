import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 20,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: "mydb"
});

export default async function handler(req, res) {
  const ip = req.connection.remoteAddress;

  try {
    const result = await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM crunchbase_demo WHERE ip = ?", ip, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    const data = result.length === 1 ? result[0] : {};
    if (data.founded_date)
      data.founded_date = new Date(data.founded_date + " GMT+0").toJSON().substring(0, 10);
    if (data.closed_date)
      data.closed_date = new Date(data.closed_date + " GMT+0").toJSON().substring(0, 10);
    delete data.ip;
    delete data.profile_image;
    delete data.profile_image_mimetype;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

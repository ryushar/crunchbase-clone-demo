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
      pool.query(
        "SELECT profile_image, profile_image_mimetype FROM crunchbase_demo WHERE ip = ?",
        ip,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    if (result.length === 1) {
      const buffer = result[0].profile_image;
      const mimetype = result[0].profile_image_mimetype;
      res.setHeader("Content-Type", mimetype);
      res.send(buffer);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

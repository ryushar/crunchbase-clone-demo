import formidable from "formidable";
import { readFile, unlink } from "fs/promises";
import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 20,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: "mydb"
});

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  const ip = req.connection.remoteAddress;

  try {
    const form = formidable({});
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const parsed = {};
    for (const key of Object.getOwnPropertyNames(fields)) {
      parsed[key] = JSON.parse(fields[key]);
    }

    const imagePath = files.profile_image && files.profile_image.filepath;
    const image = imagePath ? await readFile(imagePath) : null;

    const values = {
      name: parsed.name || "",
      description: parsed.description || "",
      also_known_as: parsed.also_known_as || "",
      legal_name: parsed.legal_name || "",
      founded_date: parsed.founded_date,
      is_closed: parsed.is_closed ? 1 : 0,
      closed_date: parsed.closed_date,
      num_employees: parsed.num_employees || "",
      company_type: parsed.company_type || "",
      website_url: parsed.website_url || "",
      linkedin_url: parsed.linkedin_url || "",
      email: parsed.email || "",
      phone_no: parsed.phone_no || "",
      full_description: parsed.full_description || "",
      address_name: (parsed.headquarters && parsed.headquarters.address_name) || "",
      address_line_1: (parsed.headquarters && parsed.headquarters.address_line_1) || "",
      address_line_2: (parsed.headquarters && parsed.headquarters.address_line_2) || "",
      postal_code: (parsed.headquarters && parsed.headquarters.postal_code) || "",
      city: (parsed.headquarters && parsed.headquarters.city) || "",
      profile_image: image
    };

    const query = [ip];
    for (const key of Object.getOwnPropertyNames(values)) {
      query.push(values[key]);
    }
    query.push(values);

    await new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO crunchbase_demo VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE ?",
        query,
        (error) => {
          if (error) {
            console.log(error);
            reject(error);
          } else resolve();
        }
      );
    });

    if (imagePath) unlink(imagePath);

    res.status(204).send();
  } catch {
    res.status(500).send();
  }
}

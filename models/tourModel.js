import db from "../config/database.js";
import mysql from "mysql2";
// Create tour
export const createTour = (
  Tour_name,
  Price_per_person,
  Country,
  City,
  Street,
  tour_Description,
  Days,
  Nights,
) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO Tours
      (Tour_name, Price_per_person,Country , City, Street, tour_Description,Days,Nights)
      VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;

    db.query(
      sql,
      [
        Tour_name,
        Price_per_person,
        Country,
        City,
        Street,
        tour_Description,
        Days,
        Nights,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      },
    );
  });
};

// Get all tours
export const getAllTours = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Tours`;

    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Get single tour
export const getSingleTour = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT *
      FROM Tours
      WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

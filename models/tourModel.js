import db from "../config/database.js";
import mysql from "mysql2";
// Create tour
export const createTour = (
  Tour_name,
  Price_per_person,
  Country,
  City,
  Street,
 Description,
  Days,
  Nights,
) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO Tours(Tour_name, Price_per_person,Country , City, Street, Description,Days,Nights)VALUES (?, ?, ?, ?, ?, ?, ?,?)`;

    db.query(
      sql,
      [
        Tour_name,
        Price_per_person,
        Country,
        City,
        Street,
        Description,
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
      if (result.length == 0) resolve("There does not exist any tours now");
      resolve(result);
    });
  });
};

// Get single tour
export const getSingleTour = (Tour_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT *
      FROM Tours
      WHERE Tour_ID = ?`;
    db.query(sql, [Tour_ID], (err, result) => {
      if (err) return reject("Tour doesn't exist", err);
      if (result.length == 0) resolve("Tour not found");
      resolve(result[0]);
    });
  });
};

// Delete tour
export const deleteTourById = (Tour_ID) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM Tours WHERE Tour_ID = ?`;

    db.query(sql, [Tour_ID], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

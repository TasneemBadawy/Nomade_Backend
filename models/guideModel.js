import db from "../config/database.js";

// find by email function

export const findGuideByEmail = (Email) => {
  return new Promise((resolve, reject) => {
    // the query that will search
    const sql = `SELECT * FROM Tourguide WHERE Email = ?`;

    db.query(sql, [Email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

// create a new guide account

export const createGuide = (FName, LName, Email, Password) => {
  return new Promise((resolve, reject) => {
    const sql = `
        INSERT INTO Tourguide (FName, LName, Email, Password)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [FName, LName, Email, Password], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

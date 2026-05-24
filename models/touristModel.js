import db from "../config/database.js";

// find by email function

const findTouristByEmail = (Email) => {
  return new Promise((resolve, reject) => {
    // the query that will search
    const sql = `SELECT * FROM User
        WHERE Email = ? `;

    db.query(sql, [Email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

// create a user

const createTourist = (FName, LName, Email, Password) => {
  return new Promise((resolve, reject) => {
    // the query we will need

    const sql = `
        INSERT INTO User
        (FName, LName, Email, Password)
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

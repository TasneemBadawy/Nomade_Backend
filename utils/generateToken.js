import jwt from "jsonwebtoken";

// the function that generates the token
export const generateToken = (email) => {
  return jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export default generateToken;

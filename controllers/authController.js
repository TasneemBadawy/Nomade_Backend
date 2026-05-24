import bcrypt from "bcrypt";
import { findTouristByEmail, createTourist } from "../models/touristModel.js";
import { findGuideByEmail, createGuide } from "../models/guideModel.js";

/******************************Tourist*******************************************/
/***************************Register Tourist**********************************/

const registerTourist = async (req, res) => {
  const { FName, LName, Email, password } = req.body;

  // first find if exist in the database
  const existedUser = await findTouristByEmail(Email);

  try {
    // if exists
    if (existedUser) {
      console.log("the user already existed");
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    await createTourist(FName, LName, Email, hashPassword);

    res.status(201).json({
      message: "Registered Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};
/**************************Login Tourist**********************************/

const logInTourist = async (req, res) => {
  const { Email, password } = req.body;

  // see if it exists

  try {
    const existedUser = await findTouristByEmail(Email);

    if (!existedUser) {
      console.log("The user doesn't exist");
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    //Compare the two passwords
    const passwordCheck = await bcrypt.compare(password, existedUser.Password);
    if (passwordCheck) {
      res.status(200).send("logged in successfully");
    } else {
      console.log("The user doesn't exist");
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

/******************************Guide**************************/
/***************************Register Guide**********************************/

const registerGuide = async (req, res) => {
  const { FName, LName, Email, password } = req.body;

  // first find if exist in the database
  const existedGuide = await findGuideByEmail(Email);

  try {
    // if exists
    if (existedGuide) {
      console.log("The TourGuide already existed");
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    await createGuide(FName, LName, Email, hashPassword);

    res.status(201).json({
      message: "Registered Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};
/***************************Login Guide**********************************/

const logInGuide = async (req, res) => {
  const { Email, password } = req.body;

  // see if it exists

  try {
    const existedGuide = await findGuideByEmail(Email);

    if (!existedGuide) {
      console.log("The TourGuide doesn't exist");
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    //Compare the two passwords
    const passwordCheck = await bcrypt.compare(password, existedGuide.Password);
    if (passwordCheck) {
      res.status(200).send("logged in successfully");
    } else {
      console.log("The TourGuide doesn't exist");
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

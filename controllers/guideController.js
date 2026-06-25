import bcrypt from "bcrypt";
import {
  findGuideByEmail,
  createGuide,
  getAllGuides,
  getGuideCompleteProfile,
  updateGuideProfile,
  updateGuidePhoneNumbers,
  updateGuideSpecializations,
  updateGuideCertificates,
  updateGuideLanguages,
} from "../models/guideModel.js";
import { generateToken } from "../utils/generateToken.js";

// Validation helpers
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateSocialMediaUrl = (url) => {
  if (!url || url === "") return true;
  const urlRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
  return urlRegex.test(url);
};

// Register a new guide
export const registerGuide = async (req, res) => {
  const {
    FName,
    LName,
    Email,
    Password,
    Country,
    About,
    FaceBook,
    Linkedin,
    Instagram,
    phoneNumbers = [],
    specializations = [],
    certificates = [],
    languages = [],
  } = req.body;

  // Validation
  const errors = [];

  if (!FName || FName.trim() === "") errors.push("First name is required");
  if (!LName || LName.trim() === "") errors.push("Last name is required");
  if (!Email || !validateEmail(Email)) errors.push("Valid email is required");
  if (!Password || !validatePassword(Password))
    errors.push("Password must be at least 6 characters");
  if (Country && Country.length > 50) errors.push("Country name too long");
  if (About && About.length > 65535) errors.push("About section too long");
  if (FaceBook && !validateSocialMediaUrl(FaceBook))
    errors.push("Invalid Facebook URL");
  if (Linkedin && !validateSocialMediaUrl(Linkedin))
    errors.push("Invalid LinkedIn URL");
  if (Instagram && !validateSocialMediaUrl(Instagram))
    errors.push("Invalid Instagram URL");

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Check if guide already exists
    const existingGuide = await findGuideByEmail(Email);
    if (existingGuide) {
      return res.status(409).json({
        error: "A guide with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create guide with all related data
    await createGuide(
      FName,
      LName,
      Email,
      hashedPassword,
      Country || null,
      About || null,
      FaceBook || null,
      Linkedin || null,
      Instagram || null,
      phoneNumbers,
      specializations,
      certificates,
      languages,
    );

    res.status(201).json({
      message: "Guide registered successfully",
    });
  } catch (err) {
    console.error("Guide registration error:", err);
    res.status(500).json({
      error: "Failed to register guide",
      message: err.message,
    });
  }
};

// Guide Login
export const loginGuide = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !validateEmail(Email)) {
    return res.status(400).json({
      error: "Valid email is required",
    });
  }

  if (!Password) {
    return res.status(400).json({
      error: "Password is required",
    });
  }

  try {
    const guide = await findGuideByEmail(Email);

    if (!guide) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(Password, guide.Password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = generateToken(Email);
    delete guide.Password;

    res.status(200).json({
      message: "Logged in successfully",
      token,
      guide,
    });
  } catch (err) {
    console.error("Guide login error:", err);
    res.status(500).json({
      error: "Failed to login",
      message: err.message,
    });
  }
};

//  Get all guides
export const getGuides = async (req, res) => {
  try {
    const guides = await getAllGuides();
    res.status(200).json({
      count: guides.length,
      data: guides,
    });
  } catch (err) {
    console.error("Error fetching guides:", err);
    res.status(500).json({
      error: "Failed to retrieve guides",
      message: err.message,
    });
  }
};

//  Get single guide
export const getGuide = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      error: "Invalid guide ID",
    });
  }

  try {
    const guide = await getGuideCompleteProfile(id);

    if (!guide) {
      return res.status(404).json({
        error: "Guide not found",
      });
    }

    res.status(200).json({
      data: guide,
    });
  } catch (err) {
    console.error("Error fetching guide:", err);
    res.status(500).json({
      error: "Failed to retrieve guide",
      message: err.message,
    });
  }
};

// Update guide profile
export const updateGuide = async (req, res) => {
  const { id } = req.params;
  const {
    FName,
    LName,
    Email,
    Country,
    About,
    FaceBook,
    Linkedin,
    Instagram,
    phoneNumbers,
    specializations,
    certificates,
    languages,
  } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      error: "Invalid guide ID",
    });
  }

  // Validation
  const errors = [];
  if (Email && !validateEmail(Email)) errors.push("Valid email is required");
  if (FaceBook && !validateSocialMediaUrl(FaceBook))
    errors.push("Invalid Facebook URL");
  if (Linkedin && !validateSocialMediaUrl(Linkedin))
    errors.push("Invalid LinkedIn URL");
  if (Instagram && !validateSocialMediaUrl(Instagram))
    errors.push("Invalid Instagram URL");

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Check if guide exists
    const existingGuide = await getGuideCompleteProfile(id);
    if (!existingGuide) {
      return res.status(404).json({
        error: "Guide not found",
      });
    }

    // Update main profile
    const updateData = {
      FName: FName || existingGuide.FName,
      LName: LName || existingGuide.LName,
      Email: Email || existingGuide.Email,
      Country: Country !== undefined ? Country : existingGuide.Country,
      About: About !== undefined ? About : existingGuide.About,
      FaceBook: FaceBook !== undefined ? FaceBook : existingGuide.FaceBook,
      Linkedin: Linkedin !== undefined ? Linkedin : existingGuide.Linkedin,
      Instagram: Instagram !== undefined ? Instagram : existingGuide.Instagram,
    };

    await updateGuideProfile(id, updateData);

    // Update multivalued attributes if provided
    if (phoneNumbers !== undefined) {
      await updateGuidePhoneNumbers(id, phoneNumbers);
    }
    if (specializations !== undefined) {
      await updateGuideSpecializations(id, specializations);
    }
    if (certificates !== undefined) {
      await updateGuideCertificates(id, certificates);
    }
    if (languages !== undefined) {
      await updateGuideLanguages(id, languages);
    }

    const updatedGuide = await getGuideCompleteProfile(id);

    res.status(200).json({
      message: "Guide profile updated successfully",
      data: updatedGuide,
    });
  } catch (err) {
    console.error("Error updating guide:", err);
    res.status(500).json({
      error: "Failed to update guide",
      message: err.message,
    });
  }
};

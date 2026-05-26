import {
  createTour,
  getAllTours,
  getSingleTour,
} from "../models/tourModel.js";

// Add Tour
export const addTour = async (req, res) => {
  const {
    Tour_name,
    Price_per_person,
    Description,
    Days,
    Nights,
    Country,
    City,
    Street,
  } = req.body;

  try {
    await createTour(
      Tour_name,
      Price_per_person,
      Description,
      Days,
      Nights,
      Country,
      City,
      Street
    );

    res.status(201).json({
      message: "Tour created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Get all tours
export const getTours = async (req, res) => {
  try {
    const tours = await getAllTours();
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Get single tour
export const getOneTour = async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await getSingleTour(id);
    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
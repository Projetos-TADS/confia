import DataService from "../services/DataService.js";
import Review from "../models/reviewModel.js";

const reviewsFile = "reviews.json";

async function getReviews(req, res) {
  try {
    const reviews = await DataService.readData(reviewsFile);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error reading review data." });
  }
}

async function createReview(req, res) {
  try {
    const { serviceId, clientId, rating, comment } = req.body;
    if (!serviceId || !clientId || rating === undefined || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const reviews = await DataService.readData(reviewsFile);
    const newId = reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;
    const newReview = new Review(newId, serviceId, clientId, rating, comment);

    reviews.push(newReview);
    await DataService.writeData(reviewsFile, reviews);

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error creating review." });
  }
}

export default { getReviews, createReview };

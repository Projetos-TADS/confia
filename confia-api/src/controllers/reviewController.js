import DataService from "../services/DataService.js";
import Review from "../models/reviewModel.js";

async function getReviews(req, res) {
  try {
    const reviews = await DataService.getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Erro ao ler os dados de avaliação." });
  }
}

async function createReview(req, res) {
  try {
    const { serviceId, clientId, rating, comment } = req.body;
    if (!serviceId || !clientId || rating === undefined || !comment) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const newReview = new Review(null, serviceId, clientId, rating, comment);
    const createdReview = await DataService.createReview(newReview);

    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar avaliação." });
  }
}

export default { getReviews, createReview };

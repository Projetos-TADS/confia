import DataService from "../services/DataService.js";
import Service from "../models/serviceModel.js";

async function getServices(req, res) {
  try {
    const services = await DataService.getServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Erro ao ler os dados de serviço." });
  }
}

async function createService(req, res) {
  try {
    const { providerId, title, description, category, price } = req.body;
    if (!providerId || !title || !description || !category || price === undefined) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const newService = new Service(null, providerId, title, description, category, price);
    const createdService = await DataService.createService(newService);

    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar serviço." });
  }
}

export default { getServices, createService };

import DataService from "../services/DataService.js";
import Service from "../models/serviceModel.js";

const servicesFile = "services.json";

async function getServices(req, res) {
  try {
    const services = await DataService.readData(servicesFile);
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error reading service data." });
  }
}

async function createService(req, res) {
  try {
    const { providerId, title, description, category, price } = req.body;
    if (!providerId || !title || !description || !category || price === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const services = await DataService.readData(servicesFile);
    const newId = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
    const newService = new Service(newId, providerId, title, description, category, price);

    services.push(newService);
    await DataService.writeData(servicesFile, services);

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Error creating service." });
  }
}

export default { getServices, createService };

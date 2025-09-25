import DataService from "../services/DataService.js";
import User from "../models/userModel.js";

async function getUsers(req, res) {
  try {
    const users = await DataService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao ler os dados do usuário." });
  }
}

async function createUser(req, res) {
  try {
    const { name, email, password, userType, location } = req.body;
    if (!name || !email || !password || !userType || !location) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const users = await DataService.getUsers();
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      return res.status(400).json({ message: "E-mail já está em uso." });
    }

    const newUser = new User(null, name, email, password, userType, location);
    const createdUser = await DataService.createUser(newUser);

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário." });
  }
}

export default { getUsers, createUser };

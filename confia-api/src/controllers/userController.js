import DataService from "../services/DataService.js";
import User from "../models/userModel.js";

const usersFile = "users.json";

async function getUsers(req, res) {
  try {
    const users = await DataService.readData(usersFile);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error reading user data." });
  }
}

async function createUser(req, res) {
  try {
    const { name, email, password, userType, location } = req.body;
    if (!name || !email || !password || !userType || !location) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const users = await DataService.readData(usersFile);
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser = new User(newId, name, email, password, userType, location);

    users.push(newUser);
    await DataService.writeData(usersFile, users);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user." });
  }
}

export default { getUsers, createUser };

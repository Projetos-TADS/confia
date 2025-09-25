import DataService from "../services/DataService.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    const user = await DataService.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const { password: _, ...userToReturn } = user;
    res.status(200).json(userToReturn);
  } catch (error) {
    console.error("Falha no login:", error);
    res.status(500).json({ message: "Erro ao tentar fazer login." });
  }
}

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

    const emailExists = await DataService.getUserByEmail(email);
    if (emailExists) {
      return res.status(400).json({ message: "E-mail já está em uso." });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new User(null, name, email, hashedPassword, userType, location);
    const createdUser = await DataService.createUser(newUser);

    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Falha ao criar usuário:", error);
    res.status(500).json({ message: "Erro ao criar usuário." });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    if (email) {
      const existingUser = await DataService.getUserByEmail(email);
      if (existingUser && existingUser.id !== parseInt(id)) {
        return res.status(400).json({ message: "E-mail já está em uso." });
      }
    }

    if (password) {
      req.body.password = bcrypt.hashSync(password, 8);
    }

    const updatedUser = await DataService.updateUser(id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Falha ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const changes = await DataService.deleteUser(id);
    if (changes > 0) {
      res.status(200).json({ message: "Usuário excluído com sucesso." });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Falha ao excluir usuário:", error);
    res.status(500).json({ message: "Erro ao excluir usuário." });
  }
}

export default { loginUser, getUsers, createUser, updateUser, deleteUser };

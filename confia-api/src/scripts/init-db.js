import openDb from "../database.js";
import fs from "fs/promises";
import path from "path";

async function initDb() {
  const db = await openDb();

  await db.exec("DROP TABLE IF EXISTS Reviews");
  await db.exec("DROP TABLE IF EXISTS Services");
  await db.exec("DROP TABLE IF EXISTS Users");

  console.log("Tabelas antigas removidas (se existiam).");

  await db.exec(`
    CREATE TABLE Users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      userType TEXT NOT NULL,
      location TEXT NOT NULL
    );

    CREATE TABLE Services (
      id INTEGER PRIMARY KEY,
      providerId INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (providerId) REFERENCES Users(id)
    );

    CREATE TABLE Reviews (
      id INTEGER PRIMARY KEY,
      serviceId INTEGER NOT NULL,
      clientId INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      FOREIGN KEY (serviceId) REFERENCES Services(id),
      FOREIGN KEY (clientId) REFERENCES Users(id)
    );
  `);

  console.log("Tabelas criadas com sucesso.");

  async function readJsonData(fileName) {
    const filePath = path.join(process.cwd(), "data", fileName);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  }

  const users = await readJsonData("users.json");
  for (const user of users) {
    await db.run(
      "INSERT INTO Users (id, name, email, password, userType, location) VALUES (?, ?, ?, ?, ?, ?)",
      user.id,
      user.name,
      user.email,
      user.password,
      user.userType,
      user.location
    );
  }
  console.log(`${users.length} usuários inseridos.`);

  const services = await readJsonData("services.json");
  for (const service of services) {
    await db.run(
      "INSERT INTO Services (id, providerId, title, description, category, price) VALUES (?, ?, ?, ?, ?, ?)",
      service.id,
      service.providerId,
      service.title,
      service.description,
      service.category,
      service.price
    );
  }
  console.log(`${services.length} serviços inseridos.`);

  const reviews = await readJsonData("reviews.json");
  for (const review of reviews) {
    await db.run(
      "INSERT INTO Reviews (id, serviceId, clientId, rating, comment) VALUES (?, ?, ?, ?, ?)",
      review.id,
      review.serviceId,
      review.clientId,
      review.rating,
      review.comment
    );
  }
  console.log(`${reviews.length} avaliações inseridas.`);

  console.log("Banco de dados inicializado e populado com sucesso.");
  await db.close();
}

initDb().catch((err) => {
  console.error("Erro ao inicializar o banco de dados:", err);
});

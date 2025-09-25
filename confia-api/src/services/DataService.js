import openDb from "../database.js";

async function getUsers() {
  const db = await openDb();
  return db.all("SELECT * FROM Users");
}

async function createUser(user) {
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO Users (name, email, password, userType, location) VALUES (?, ?, ?, ?, ?)",
    user.name,
    user.email,
    user.password,
    user.userType,
    user.location
  );
  return { id: result.lastID, ...user };
}

async function getServices() {
  const db = await openDb();
  return db.all("SELECT * FROM Services");
}

async function createService(service) {
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO Services (providerId, title, description, category, price) VALUES (?, ?, ?, ?, ?)",
    service.providerId,
    service.title,
    service.description,
    service.category,
    service.price
  );
  return { id: result.lastID, ...service };
}

async function getReviews() {
  const db = await openDb();
  return db.all("SELECT * FROM Reviews");
}

async function createReview(review) {
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO Reviews (serviceId, clientId, rating, comment) VALUES (?, ?, ?, ?)",
    review.serviceId,
    review.clientId,
    review.rating,
    review.comment
  );
  return { id: result.lastID, ...review };
}

export default {
  getUsers,
  createUser,
  getServices,
  createService,
  getReviews,
  createReview,
};

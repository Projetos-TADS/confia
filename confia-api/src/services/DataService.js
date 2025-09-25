import fs from "fs/promises";
import path from "path";

const dataDirectory = path.join(process.cwd(), "data");

async function readData(fileName) {
  const filePath = path.join(dataDirectory, fileName);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeData(fileName, data) {
  const filePath = path.join(dataDirectory, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export default { readData, writeData };

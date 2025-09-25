import sqlite3 from "sqlite3";
import { open } from "sqlite";

const sqlite3Verbose = sqlite3.verbose();

async function openDb() {
  return open({
    filename: "./confia.db",
    driver: sqlite3Verbose.Database,
  });
}

export default openDb;

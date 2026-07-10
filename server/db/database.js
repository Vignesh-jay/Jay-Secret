const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "secret.db"), (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("✅ SQLite Connected");
  }
});

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS secrets (
            id TEXT PRIMARY KEY,
            title TEXT,
            secret TEXT,
            expiresAt INTEGER,
            createdAt INTEGER,
            viewedAt INTEGER
        )
    `);
});

module.exports = db;

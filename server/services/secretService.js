const db = require("../db/database");
const { encrypt, decrypt } = require("../utils/crypto");
const { nanoid } = require("nanoid");

function generateId() {
  return nanoid(10);
}

async function createSecret(data) {
  return new Promise((resolve, reject) => {
    const id = generateId();

    const encryptedSecret = encrypt(data.secret);

    const createdAt = Date.now();

    const EXPIRY_MAP = require("../config/expiry");

    const expiresAt =
      createdAt + (EXPIRY_MAP[data.expiry] || EXPIRY_MAP["60m"]);

    db.run(
      `
            INSERT INTO secrets
            (
                id,
                title,
                secret,
                expiresAt,
                createdAt,
                viewedAt
            )
            VALUES(?,?,?,?,?,?)
            `,
      [id, data.title, encryptedSecret, expiresAt, createdAt, null],
      function (err) {
        if (err) {
          reject(err);

          return;
        }

        resolve(id);
      },
    );
  });
}

function getSecret(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM secrets WHERE id=?", [id], (err, row) => {
      if (err) return reject(err);

      if (!row) return reject(new Error("Secret not found."));

      if (row.viewedAt)
        return reject(new Error("This secret has already been viewed."));

      if (Date.now() > row.expiresAt)
        return reject(new Error("This secret has expired."));

      resolve({
        title: row.title,
        expiresAt: row.expiresAt,
      });
    });
  });
}

async function revealSecret(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM secrets WHERE id=?", [id], (err, row) => {
      if (err) return reject(err);

      if (!row) return reject(new Error("Secret not found."));

      if (row.viewedAt)
        return reject(new Error("This secret has already been viewed."));

      if (Date.now() > row.expiresAt)
        return reject(new Error("This secret has expired."));

      const decrypted = decrypt(row.secret);

      db.run(
        "UPDATE secrets SET viewedAt=? WHERE id=?",
        [Date.now(), id],
        () => {
          resolve({
            title: row.title,
            secret: decrypted,
            expiresAt: row.expiresAt,
          });
        },
      );
    });
  });
}

module.exports = {
  generateId,

  createSecret,

  getSecret,

  revealSecret,
};

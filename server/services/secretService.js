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

    let expiresAt = createdAt;

    switch (data.expiry) {
      case "1h":
        expiresAt += 60 * 60 * 1000;
        break;

      case "24h":
        expiresAt += 24 * 60 * 60 * 1000;
        break;

      case "7d":
        expiresAt += 7 * 24 * 60 * 60 * 1000;
        break;

      default:
        expiresAt += 60 * 60 * 1000;
    }

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
    db.get(
      "SELECT * FROM secrets WHERE id=?",

      [id],

      (err, row) => {
        if (err) {
          reject(err);

          return;
        }

        if (!row) {
          reject(new Error("Secret not found."));

          return;
        }

        row.secret = decrypt(row.secret);

        if (row.viewedAt) {
          reject(new Error("Secret already viewed."));

          return;
        }

        db.run(
          "UPDATE secrets SET viewedAt=? WHERE id=?",

          [Date.now(), id],

          () => {
            resolve(row);
          },
        );
      },
    );
  });
}

module.exports = {
  generateId,

  createSecret,

  getSecret,
};

const crypto = require("crypto");

const algorithm = "aes-256-cbc";

const config = require("../config/config");

const secretKey = config.encryptionKey;

const ivLength = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(ivLength);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    iv,
  );

  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
  const parts = text.split(":");

  const iv = Buffer.from(parts[0], "hex");

  const encrypted = Buffer.from(parts[1], "hex");

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    iv,
  );

  let decrypted = decipher.update(encrypted);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt,
};

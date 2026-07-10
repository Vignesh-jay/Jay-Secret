module.exports = {
  port: process.env.PORT || 3000,

  encryptionKey: Buffer.from(process.env.SECRET_KEY, "hex"),
};

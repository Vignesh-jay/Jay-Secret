function validateSecret(req, res, next) {
  const { title, secret, expiry } = req.body;

  if (!secret || secret.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Secret is required.",
    });
  }

  if (secret.length > 5000) {
    return res.status(400).json({
      success: false,
      message: "Secret is too large.",
    });
  }

  const validExpiries = ["1h", "24h", "7d"];

  if (!validExpiries.includes(expiry)) {
    return res.status(400).json({
      success: false,
      message: "Invalid expiry.",
    });
  }

  next();
}

module.exports = validateSecret;

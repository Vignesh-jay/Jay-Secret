const secretService = require("../services/secretService");

async function create(req, res) {
  try {
    const id = await secretService.createSecret(req.body);

    res.json({
      success: true,
      id,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Unable to create secret.",
    });
  }
}

async function get(req, res) {
  try {
    const secret = await secretService.getSecret(req.params.id);

    res.json({
      success: true,
      secret,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

async function reveal(req, res) {
  try {
    const secret = await secretService.revealSecret(req.params.id);

    res.json({
      success: true,
      secret,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  create,
  get,
  reveal,
};

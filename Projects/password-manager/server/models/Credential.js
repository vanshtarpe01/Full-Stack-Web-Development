const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema(
  {
    website: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Credential", credentialSchema);


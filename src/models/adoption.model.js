const { Schema, model } = require("mongoose");

const adoptionSchema = new Schema(
  {
    petId: {
      type: String,
      required: true,
      trim: true
    },
    userId: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model("Adoption", adoptionSchema);

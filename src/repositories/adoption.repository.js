const AdoptionModel = require("../models/adoption.model");

function toPlain(doc) {
  if (!doc) {
    return null;
  }

  const source = typeof doc.toObject === "function" ? doc.toObject() : doc;
  return {
    id: String(source._id),
    petId: source.petId,
    userId: source.userId,
    status: source.status,
    createdAt: source.createdAt,
    updatedAt: source.updatedAt
  };
}

class AdoptionRepository {
  async getAll() {
    const items = await AdoptionModel.find().sort({ createdAt: -1 }).lean();
    return items.map((item) => toPlain(item));
  }

  async getById(id) {
    try {
      const item = await AdoptionModel.findById(id).lean();
      return toPlain(item);
    } catch (_error) {
      return null;
    }
  }

  async create(payload) {
    const created = await AdoptionModel.create(payload);
    return toPlain(created);
  }

  async update(id, payload) {
    try {
      const updated = await AdoptionModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
      }).lean();

      return toPlain(updated);
    } catch (_error) {
      return null;
    }
  }

  async delete(id) {
    try {
      const deleted = await AdoptionModel.findByIdAndDelete(id).lean();
      return Boolean(deleted);
    } catch (_error) {
      return false;
    }
  }
}

module.exports = new AdoptionRepository();

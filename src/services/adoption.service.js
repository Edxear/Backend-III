const adoptionRepository = require("../repositories/adoption.repository");

function validateCreateInput(data) {
  if (!data || typeof data !== "object") {
    return "Body inválido";
  }

  if (!data.petId || !data.userId || !data.status) {
    return "petId, userId y status son obligatorios";
  }

  return null;
}

function validateUpdateInput(data) {
  if (!data || typeof data !== "object") {
    return "Body inválido";
  }

  if (Object.keys(data).length === 0) {
    return "Debe enviar al menos un campo para actualizar";
  }

  return null;
}

module.exports = {
  getAll: async () => adoptionRepository.getAll(),

  getById: async (id) => adoptionRepository.getById(id),

  create: async (data) => {
    const error = validateCreateInput(data);

    if (error) {
      const err = new Error(error);
      err.code = "VALIDATION_ERROR";
      throw err;
    }

    return adoptionRepository.create(data);
  },

  update: async (id, data) => {
    const error = validateUpdateInput(data);

    if (error) {
      const err = new Error(error);
      err.code = "VALIDATION_ERROR";
      throw err;
    }

    return adoptionRepository.update(id, data);
  },

  remove: async (id) => adoptionRepository.delete(id)
};

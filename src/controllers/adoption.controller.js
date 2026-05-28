const adoptionService = require("../services/adoption.service");

function handleError(res, error) {
  if (error.code === "VALIDATION_ERROR") {
    return res.status(400).json({ status: "error", error: error.message });
  }

  return res.status(500).json({ status: "error", error: "Internal server error" });
}

module.exports = {
  getAll: async (_req, res) => {
    try {
      const data = await adoptionService.getAll();
      return res.status(200).json({ status: "success", payload: data });
    } catch (error) {
      return handleError(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const adoption = await adoptionService.getById(id);

      if (!adoption) {
        return res.status(404).json({ status: "error", error: "Adoption not found" });
      }

      return res.status(200).json({ status: "success", payload: adoption });
    } catch (error) {
      return handleError(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const created = await adoptionService.create(req.body);
      return res.status(201).json({ status: "success", payload: created });
    } catch (error) {
      return handleError(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await adoptionService.update(id, req.body);

      if (!updated) {
        return res.status(404).json({ status: "error", error: "Adoption not found" });
      }

      return res.status(200).json({ status: "success", payload: updated });
    } catch (error) {
      return handleError(res, error);
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await adoptionService.remove(id);

      if (!deleted) {
        return res.status(404).json({ status: "error", error: "Adoption not found" });
      }

      return res.status(200).json({ status: "success", message: "Adoption deleted" });
    } catch (error) {
      return handleError(res, error);
    }
  }
};

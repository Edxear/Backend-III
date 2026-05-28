const request = require("supertest");

jest.mock("../../src/services/adoption.service", () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn()
}));

const app = require("../../src/app");
const adoptionService = require("../../src/services/adoption.service");

describe("Functional tests - adoption.router.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/adoptions", () => {
    test("should return all adoptions", async () => {
      const fakeAdoptions = [
        { id: "1", petId: "p1", userId: "u1", status: "pending" },
        { id: "2", petId: "p2", userId: "u2", status: "approved" }
      ];

      adoptionService.getAll.mockResolvedValue(fakeAdoptions);

      const response = await request(app).get("/api/adoptions");

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.payload).toEqual(fakeAdoptions);
    });

    test("should return 500 when service fails", async () => {
      adoptionService.getAll.mockRejectedValue(new Error("db down"));

      const response = await request(app).get("/api/adoptions");

      expect(response.statusCode).toBe(500);
      expect(response.body.status).toBe("error");
    });
  });

  describe("GET /api/adoptions/:id", () => {
    test("should return adoption by id", async () => {
      const fakeAdoption = { id: "1", petId: "p1", userId: "u1", status: "pending" };
      adoptionService.getById.mockResolvedValue(fakeAdoption);

      const response = await request(app).get("/api/adoptions/1");

      expect(response.statusCode).toBe(200);
      expect(response.body.payload).toEqual(fakeAdoption);
    });

    test("should return 404 when adoption does not exist", async () => {
      adoptionService.getById.mockResolvedValue(null);

      const response = await request(app).get("/api/adoptions/999");

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("Adoption not found");
    });
  });

  describe("POST /api/adoptions", () => {
    test("should create adoption successfully", async () => {
      const body = { petId: "pet-1", userId: "user-1", status: "pending" };
      const created = { id: "1", ...body };

      adoptionService.create.mockResolvedValue(created);

      const response = await request(app).post("/api/adoptions").send(body);

      expect(response.statusCode).toBe(201);
      expect(response.body.payload).toEqual(created);
    });

    test("should return 400 when validation fails", async () => {
      const validationError = new Error("petId, userId y status son obligatorios");
      validationError.code = "VALIDATION_ERROR";
      adoptionService.create.mockRejectedValue(validationError);

      const response = await request(app).post("/api/adoptions").send({ userId: "u1" });

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("error");
    });
  });

  describe("PUT /api/adoptions/:id", () => {
    test("should update adoption", async () => {
      const updated = { id: "1", petId: "p1", userId: "u1", status: "approved" };
      adoptionService.update.mockResolvedValue(updated);

      const response = await request(app)
        .put("/api/adoptions/1")
        .send({ status: "approved" });

      expect(response.statusCode).toBe(200);
      expect(response.body.payload).toEqual(updated);
    });

    test("should return 404 when adoption to update does not exist", async () => {
      adoptionService.update.mockResolvedValue(null);

      const response = await request(app)
        .put("/api/adoptions/100")
        .send({ status: "approved" });

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("Adoption not found");
    });

    test("should return 400 when update data is invalid", async () => {
      const validationError = new Error("Debe enviar al menos un campo para actualizar");
      validationError.code = "VALIDATION_ERROR";
      adoptionService.update.mockRejectedValue(validationError);

      const response = await request(app).put("/api/adoptions/1").send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("error");
    });
  });

  describe("DELETE /api/adoptions/:id", () => {
    test("should delete adoption", async () => {
      adoptionService.remove.mockResolvedValue(true);

      const response = await request(app).delete("/api/adoptions/1");

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Adoption deleted");
    });

    test("should return 404 when adoption to delete does not exist", async () => {
      adoptionService.remove.mockResolvedValue(false);

      const response = await request(app).delete("/api/adoptions/404");

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("Adoption not found");
    });
  });
});

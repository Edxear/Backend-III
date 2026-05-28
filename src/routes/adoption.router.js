const { Router } = require("express");
const adoptionController = require("../controllers/adoption.controller");

const router = Router();

/**
 * @openapi
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 */
router.get("/", adoptionController.getAll);

/**
 * @openapi
 * /api/adoptions/{id}:
 *   get:
 *     summary: Obtener adopcion por id
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopcion encontrada
 *       404:
 *         description: Adopcion no encontrada
 */
router.get("/:id", adoptionController.getById);

/**
 * @openapi
 * /api/adoptions:
 *   post:
 *     summary: Crear adopcion
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [petId, userId, status]
 *             properties:
 *               petId:
 *                 type: string
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Adopcion creada
 *       400:
 *         description: Body invalido
 */
router.post("/", adoptionController.create);

/**
 * @openapi
 * /api/adoptions/{id}:
 *   put:
 *     summary: Actualizar adopcion
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopcion actualizada
 *       404:
 *         description: Adopcion no encontrada
 */
router.put("/:id", adoptionController.update);

/**
 * @openapi
 * /api/adoptions/{id}:
 *   delete:
 *     summary: Eliminar adopcion
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopcion eliminada
 *       404:
 *         description: Adopcion no encontrada
 */
router.delete("/:id", adoptionController.remove);

module.exports = router;

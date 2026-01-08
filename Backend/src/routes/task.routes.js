const express = require("express");
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} =  require ("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/",getTasks);
router.post("/",createTask);

router.get("/:id",getTaskById);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);

module.exports = router;

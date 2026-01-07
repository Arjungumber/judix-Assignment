const express = require("express");
const {
    getMyProfile,
    updateMyProfile,
    changePassword,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
router.use(authMiddleware);

router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);
router.put("/me/password", changePassword);

module.exports = router;

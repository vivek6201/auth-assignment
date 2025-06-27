import { Router } from "express";
import { validateBody } from "../../../middleware/validateInputMiddleware";
import { authMiddleware, isAdmin } from "../../../middleware/authMiddleware";
import getUserController from "../../../controllers/auth/getUserController";
import { loginValidation, resetPassValidation, resetTokenValidation, userValidation } from "../../../validations/user";
import signupController from "../../../controllers/auth/signupController";
import loginController from "../../../controllers/auth/loginController";
import getAdminController from "../../../controllers/auth/getAdminController";
import { resetPassController, resetTokenController } from "../../../controllers/auth/resetPassController";

const router = Router();

router.post("/signup", validateBody(userValidation), signupController);
router.post("/login", validateBody(loginValidation), loginController);
router.get("/me", authMiddleware, getUserController);
router.get("/admin/me", authMiddleware, isAdmin, getAdminController);
router.post("/generate-reset-token", validateBody(resetTokenValidation), resetTokenController);
router.post("/reset-pass", validateBody(resetPassValidation), resetPassController);

export default router;

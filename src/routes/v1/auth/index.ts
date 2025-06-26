import { Router } from "express";
import { validateBody } from "../../../middleware/validateInputMiddleware";
import { authMiddleware } from "../../../middleware/authMiddleware";
import getUserController from "../../../controllers/auth/getUserController";
import { loginValidation, userValidation } from "../../../validations/user";
import signupController from "../../../controllers/auth/signupController";
import loginController from "../../../controllers/auth/loginController";

const router = Router();

router.post("/signup", validateBody(userValidation), signupController)
router.post("/login", validateBody(loginValidation), loginController)
router.get("/me", authMiddleware, getUserController)

export default router;
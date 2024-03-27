import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import UserController from "../controllers/user.controller.js";
import { checkAuthCookie } from "../middlewares/authJwtCookies.js";
import { uploader } from "../middlewares/upload.js";
const controller = new UserController();
const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/profile-cookie', checkAuthCookie, controller.profile);
router.get('/all', verifyToken, controller.getAll);
router.delete('/delete', verifyToken, controller.deleteInactiveUsers);
router.post('/reset-pass', verifyToken, controller.resetPassword);
router.put('/new-password', verifyToken, controller.updatePassword);
router.post('/profile-img', checkAuthCookie, uploader.single('profile'), controller.uploadImg);

export default router;

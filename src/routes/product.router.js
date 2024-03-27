import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";
const controller = new ProductController();
const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', verifyUser, controller.createProduct);
router.put('/:id', verifyUser, controller.update);
router.delete('/:id', controller.deleteProduct);

export default router;
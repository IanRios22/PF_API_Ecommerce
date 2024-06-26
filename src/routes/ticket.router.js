import { Router } from 'express';
import TicketController from "../controllers/ticket.controller.js"
import { checkAuthCookie } from '../middlewares/authJwtCookies.js';

const controller = new TicketController();
const router = Router();

router.post('/:cartId', checkAuthCookie, controller.generateTicket);

export default router;
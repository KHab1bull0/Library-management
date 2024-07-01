import { Router } from "express";
import { deleteOneOrder, getAllOrder, getOneOrder, postOrder, putOneOrder } from "../controllers/order.controller.js";
import { userMiddleware } from "../middlewares/auth.middleware.js";

export const orderRouter = Router();

orderRouter.post('/orders', userMiddleware, postOrder);
orderRouter.get('/orders', userMiddleware, getAllOrder);
orderRouter.get('/orders/:uuid', userMiddleware, getOneOrder);
orderRouter.put('/orders/:uuid', userMiddleware, putOneOrder);
orderRouter.delete('/orders/:uuid', userMiddleware, deleteOneOrder);
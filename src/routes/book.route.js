import { Router } from "express";
import { allbooks, deleteOneBook, oneBook, postBook, putOneBook } from "../controllers/book.controller.js";
import { userMiddleware } from "../middlewares/auth.middleware.js";
import { roleGuard } from "../middlewares/roleGuard.middleware.js";

export const bookRouter = Router();

bookRouter.post('/books', userMiddleware, roleGuard(['admin', 'superadmin']), postBook);
bookRouter.get('/books', userMiddleware,  allbooks);
bookRouter.get('/books/:uuid', userMiddleware, oneBook);
bookRouter.put('/books/:uuid', userMiddleware,roleGuard(['admin', 'superadmin']), putOneBook);
bookRouter.delete('/books/:uuid', userMiddleware,roleGuard(['admin', 'superadmin']), deleteOneBook);


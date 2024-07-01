import { Router } from "express";
import { deleteOneAuthor, getAllAuthors, getOneAuthor, postAuthor, putOneAuthor } from "../controllers/author.contoller.js";
import { userMiddleware } from "../middlewares/auth.middleware.js";
import { roleGuard } from "../middlewares/roleGuard.middleware.js";

export const authorRouter = Router();

authorRouter.post('/authors', userMiddleware, roleGuard(['admin', 'superadmin']), postAuthor);
authorRouter.get('/authors', userMiddleware, getAllAuthors);
authorRouter.get('/authors/:uuid', userMiddleware, getOneAuthor);
authorRouter.put('/authors/:uuid', userMiddleware, roleGuard(['admin', 'superadmin']), putOneAuthor);
authorRouter.delete('/authors/:uuid', userMiddleware, roleGuard(['admin', 'superadmin']), deleteOneAuthor);



import { Router } from "express";
import { allGenres, deleteOneGenre, oneGenres, postGenre, putOneGenre } from "../controllers/genre.controller.js";
import { userMiddleware } from "../middlewares/auth.middleware.js";
import { roleGuard } from "../middlewares/roleGuard.middleware.js";

export const genreRouter = Router();

genreRouter.post('/genres', userMiddleware, roleGuard(['admin', 'superadmin']), postGenre);
genreRouter.get('/genres', userMiddleware, allGenres);
genreRouter.get('/genres/:uuid', userMiddleware, oneGenres);
genreRouter.put('/genres/:uuid', userMiddleware, roleGuard(['admin', 'superadmin']), putOneGenre);
genreRouter.delete('/genres/:uuid', userMiddleware, roleGuard(['admin', 'superadmin']), deleteOneGenre);
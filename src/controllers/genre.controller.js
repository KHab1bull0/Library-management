import { deleteOneVarchar, getAll, getOne, insertMany, putMany } from "../services/universal.service.js";
import { errorLogger } from "../utils/logs.js";
import { genreValid } from "../validation/genre.valid.js";
import { v4 as uuidv4} from 'uuid';

export const postGenre = async (req, res) => {
    try {
        genreValid(req.body);
        const { name, description } = req.body;
        const uuid = uuidv4();
        const genre = await insertMany('genres', ['uuid','name', 'description'], [uuid, name, description]);

        return res.status(201).send({
            message: "Genre created",
            genreid: uuid,
            genre: genre[0]
        });


    } catch (e) {
        console.log(e);
        errorLogger.error(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    }
}

export const allGenres = async (req, res) => {
    try {
        
        const genres = await getAll('genres');

        return res.status(200).send({
            genres: genres
        });

    } catch (e) {
        console.log(e);
        errorLogger.error(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    }
}

export const oneGenres = async (req, res) => {
    try {
        
        const { uuid } = req.params;

        const genre = await getOne('genres', 'uuid', uuid);

        if(!genre.length){
            return res.status(200).send({
                message: "Genre not found"
            });
        }
        
        return res.status(200).send({
            message: "Ok",
            genres: genre[0]
        });

    } catch (e) {
        console.log(e);
        errorLogger.error(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    }
}


export const putOneGenre = async (req, res) => {
    try {
        genreValid(req.body);
        const { name, description } = req.body;
        const { uuid } = req.params;

        const genre = await getOne('genres', 'uuid', uuid);

        if(!genre.length){
            return res.status(400).send({
                message: "Genre not found"
            });
        }

        const updatedGenre = await putMany('genres', ['name', 'description'], [name, description], 'uuid', uuid);

        return res.status(200).send({
            message: "Genre updated",
            uuid: uuid,
            author: updatedGenre[0]
        });

    } catch (e) {
        console.log(e);
        errorLogger.error(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    }
}



export const deleteOneGenre = async (req, res) => {
    try {
        
        const { uuid } = req.params;

        const genre = await getOne('genres', 'uuid', uuid);

        if(!genre.length){
            return res.status(400).send({
                message: "Genre not found"
            });
        };

        const deleteGenre = await deleteOneVarchar('genres', 'uuid', uuid);

        return res.status(200).send({
            message: "Genre deleted",
            deletedGenre: deleteGenre[0]
        });

    } catch (e) {
        console.log(e);
        errorLogger.error(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    };
}

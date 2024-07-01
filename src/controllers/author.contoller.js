import { v4 as uuidv4 } from 'uuid'
import { authorvalid } from '../validation/author.valid.js';
import { deleteOneVarchar, getAll, getOne, insertMany, putMany } from '../services/universal.service.js';
import { errorLogger } from '../utils/logs.js';


export const postAuthor = async (req, res) => {
    try {

        authorvalid(req.body);
        const { name, bio, birthdate } = req.body;
        const uuid = uuidv4();

        const author = await insertMany('authors', ['uuid', 'name', 'bio', 'birthdate'], [uuid, name, bio, birthdate]);

        return res.status(201).send({
            uuid: uuid,
            message: "Author created",
            author: author[0]
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

export const getAllAuthors = async (req, res) => {
    try {

        const authors = await getAll('authors');

        return res.status(200).send({
            authors: authors
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

export const getOneAuthor = async (req, res) => {
    try {

        const { uuid } = req.params;

        const author = await getOne('authors', 'uuid', uuid);

        if (!author.length) {
            return res.status(400).send({
                message: "User not found"
            });
        }

        return res.status(200).send({
            message: "Ok",
            author: author[0]
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



export const putOneAuthor = async (req, res) => {
    try {
        authorvalid(req.body);
        const { name, bio, birthdate } = req.body;
        const { uuid } = req.params;

        const author = await getOne('authors', 'uuid', uuid);

        if(!author.length){
            return res.status(400).send({
                message: "author not found"
            });
        }

        const updatedAuthor = await putMany('authors', ['name', 'bio', 'birthdate'], [name, bio, birthdate], 'uuid', uuid);

        return res.status(200).send({
            uuid: uuid,
            message: "Author updated",
            author: updatedAuthor[0]
        });

    } catch (error) {
        console.log(e);
        errorLogger.error(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    }
}


export const deleteOneAuthor = async (req, res) => {
    try {
        
        const { uuid } = req.params;
        const author = await getOne('authors', 'uuid', uuid);

        if(!author.length){
            return res.status(200).send({
                message: "Author not found"
            });
        };

        const deleteAuthor = await deleteOneVarchar('authors', 'uuid', uuid);

        return res.status(200).send({
            message: "Author deleted",
            author: deleteAuthor[0]
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
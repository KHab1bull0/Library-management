import { v4 as uuidv4 } from 'uuid'
import { bookvalid } from '../validation/book.valid.js';
import { deleteOneVarchar, getAll, getOne, insertMany, putMany } from '../services/universal.service.js';
import { errorLogger } from '../utils/logs.js';




export const postBook = async (req, res) => {
    try {
        const uuid = uuidv4();
        bookvalid();

        const { title, author_id, genre_id, price, stock, published_date, status, image_urls, description } = req.body;

        const column = ['uuid','title', 'author_id', 'genre_id', 'price', 'stock', 'published_date', 'status', 'image_urls', 'description'];
        const value = [uuid, title, author_id, genre_id, price, stock, published_date, status, image_urls, description]

        const insertedBook = await insertMany('books', column, value);

        return res.status(200).send({
            message: "Book added", 
            addedBook: insertedBook[0]
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



export const allbooks = async (req, res) =>{
    try {
        
        const books = await getAll('books');

        return res.status(200).send({
            books: books
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


export const oneBook = async (req, res) => {
    try {
        const {uuid} = req.params;


        const book = await getOne('books', 'uuid', uuid);


        if(!book.length){
            return res.status(400).send({
                message: "Book not found"
            });
        };

        return res.status(200).send({
            message: "Ok", 
            book: book[0]
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


export const putOneBook = async (req, res) => {
    try {
        const { uuid } = req.params
        bookvalid(req.body);


        const book = await getOne("books", 'uuid', uuid);


        if(!book.length) {
            return res.status(400).send({
                message: "Book not found"
            });
        };

        const { title, author_id, genre_id, price, stock, published_date, status, image_urls, description } = req.body;
        const column = ['title', 'author_id', 'genre_id', 'price', 'stock', 'published_date', 'status', 'image_urls', 'description'];
        const value = [title, author_id, genre_id, price, stock, published_date, status, image_urls, description]


        const updatedBook = await putMany('books', column, value, 'uuid', uuid);


        return res.status(200).send({
            message: "Book updated",
            bookid: uuid,
            updatedBook: updatedBook[0]
        });

    } catch (e) {
        console.log(e);
        errorLogger.error(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    };
};

export const deleteOneBook = async (req, res) => {
    try {
        const { uuid } = req.params


        const book = await getOne("books", 'uuid', uuid);


        if(!book.length) {
            return res.status(400).send({
                message: "Book not found"
            });
        };

        const deletedBook = await deleteOneVarchar("books", 'uuid', uuid);

        return res.status(200).send({
            message: "Book deleted",
            deletedBook: deletedBook[0]
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
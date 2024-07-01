import { deleteOneVarchar, getAll, getOne, insertMany, putMany } from "../services/universal.service.js";
import { errorLogger } from "../utils/logs.js";
import { orderValid, orderValidForUpdate } from "../validation/order.valid.js";
import { v4 as uuidv4 } from 'uuid';

export const postOrder = async (req, res) => {
    try {
        const uuid = uuidv4();

        orderValid();
        const body = req.body;
        const { email, username } = req.user;
        const { bookId, quantity } = body.items[0]

        const user = await getOne('users', 'email', email);
        const book = await getOne('books', 'uuid', bookId);

        const totalprice = book[0].price * quantity;
        const items = JSON.stringify(body.items);

        const columns = ['uuid', 'user_id', 'items', 'total_price']
        const values = [uuid, user[0].uuid, items, totalprice];

        const insertedOrder = await insertMany('orders', columns, values);

        return res.status(201).send({
            message: "Order created",
            order_id: uuid,
            insertedOrder: insertedOrder[0]
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


export const getAllOrder = async (req, res) => {
    try {

        const orders = await getAll('orders');

        return res.status(200).send({
            message: "Ok",
            orders: orders
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

export const getOneOrder = async (req, res) => {
    try {

        const { uuid } = req.params;

        const order = await getOne('orders', 'uuid', uuid);

        if (!order.length) {
            return res.status(400).send({
                message: "Order not found"
            });
        };

        return res.status(200).send({
            message: "Ok",
            order: order
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

export const putOneOrder = async (req, res) => {
    try {

        const { email, username } = req.user;
        orderValidForUpdate(req.body);
        const { bookId, quantity } = req.body.items[0]

        const user = await getOne('users', 'email', email);
        const book = await getOne('books', 'uuid', bookId);

        const { items, status } = req.body;

        const itms = JSON.stringify(items);
        const totalprice = book[0].price * quantity;

        const columns = ['items', 'status', 'total_price'];
        const values = [itms, status, totalprice];

        const updatedOrder = await putMany('orders', columns, values, 'user_id', user[0].uuid);

        return res.status(200).send({
            message: "Order updated",
            updatedOrder: updatedOrder[0]
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


export const deleteOneOrder = async (req, res) => {
    try {

        const { uuid } = req.params;

        const order = await getOne('orders', 'uuid', uuid);

        if (!order.length) {
            return res.status(400).send({
                message: "Order not found"
            });
        };
        const deletedOrder = await deleteOneVarchar('orders', 'uuid', uuid);

        return res.status(200).send({
            message: "Order deleted",
            deletedOrder: deletedOrder[0]
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
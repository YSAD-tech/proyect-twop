import Movimiento from '../models/movimientos.js';
import { calculateTotal } from '../helpers/calcularHelpers.js';

export const getMovimientos = async (req, res) => {
    try {
        const movimientos = await Movimiento.find().populate('articles.articleId');
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const postMovimiento = async (req, res) => {
    try {
        const { type, invoiceNumber, articles, tax, status } = req.body;
        const value = calculateTotal(articles);
        const total = value + (value * (tax / 100));

        const movimiento = new Movimiento({
            type,
            invoiceNumber,
            articles,
            value,
            tax,
            total,
            status
        });

        await movimiento.save();
        res.json({ movimiento });
    } catch (error) {
        res.status(400).json({ error: "No se pudo registrar el movimiento" });
        console.log(error);
    }
};

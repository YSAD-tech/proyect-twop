import Category from '../models/categorias.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const postCategory = async (req, res) => {
    try {
        const { description, status } = req.body;
        const category = new Category({ description, status });
        await category.save();
        res.json({ category });
    } catch (error) {
        res.status(400).json({ error: "No se pudo registrar la categoría" });
        console.log(error);
    }
};

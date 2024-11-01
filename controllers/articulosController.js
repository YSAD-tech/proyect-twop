import Article from '../models/Article.js';

// Obtener todos los artículos
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('category');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo artículo
export const createArticle = async (req, res) => {
  const { name, price, stock, category, status } = req.body;

  const article = new Article({
    name,
    price,
    stock,
    category,
    status
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

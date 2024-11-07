import Article from '../models/articulos.js';

export const getArticles = async (req, res) => {
  try {
    const articulos = await Article.find().populate('category', 'name'); // Se populan las categorías
    res.status(200).json({ articulos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los artículos' });
  }
};
export const postArticle = async (req, res) => {
  try {
    const { name, price, stock, image, category, status } = req.body;

    // Crear una nueva instancia de Articulo
    const nuevoArticulo = new Article({
      name,
      price,
      stock,
      image,
      category,
      status
    });

    // Guardar el artículo en la base de datos
    await nuevoArticulo.save();

    res.status(201).json({ message: 'Artículo creado exitosamente', articulo: nuevoArticulo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el artículo' });
  }
}

export const putArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, image, category, status } = req.body;

    const articuloActualizado = await Article.findByIdAndUpdate(
      id,
      { name, price, stock, image, category, status },
      { new: true } // Retorna el artículo actualizado
    );

    if (!articuloActualizado) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    res.status(200).json({ message: 'Artículo actualizado exitosamente', articulo: articuloActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el artículo' });
  }
};
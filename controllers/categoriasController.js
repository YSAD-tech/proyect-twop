import Categoria from '../models/categorias.js';

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json({ categorias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
};

// Crear una nueva categoría
export const postCategory = async (req, res) => {
  try {
    const { description, status } = req.body;

    // Crear una nueva instancia de Categoría
    const nuevaCategoria = new Categoria({
      description,
      status
    });

    // Guardar la categoría en la base de datos
    await nuevaCategoria.save();

    res.status(201).json({ message: 'Categoría creada exitosamente', categoria: nuevaCategoria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la categoría' });
  }
};

// Actualizar una categoría existente
export const putCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, status } = req.body;

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id,
      { description, status },
      { new: true } // Retorna la categoría actualizada
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.status(200).json({ message: 'Categoría actualizada exitosamente', categoria: categoriaActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la categoría' });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    if (!categoriaEliminada) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
};
import Movimiento from '../models/movimientos.js';

// Obtener todos los movimientos
export const getMovimientos = async (req, res) => {
  try {
    const movimientos = await Movimiento.find().populate('articles.articleId', 'name price');
    res.status(200).json({ movimientos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

// Crear un nuevo movimiento
export const postMovimiento = async (req, res) => {
  try {
    const { type, invoiceNumber, articles, value, tax, total, status } = req.body;

    // Calcular el valor total del movimiento en caso de que no se pase el total
    let calculatedTotal = total;
    if (!total) {
      calculatedTotal = articles.reduce((acc, article) => {
        return acc + (article.quantity * article.price);
      }, 0);
      // Añadir impuestos si es necesario
      if (tax) {
        calculatedTotal += (calculatedTotal * tax) / 100;
      }
    }

    // Crear una nueva instancia de Movimiento
    const nuevoMovimiento = new Movimiento({
      type,
      invoiceNumber,
      articles,
      value,
      tax,
      total: calculatedTotal,
      status
    });

    // Guardar el movimiento en la base de datos
    await nuevoMovimiento.save();

    res.status(201).json({ message: 'Movimiento creado exitosamente', movimiento: nuevoMovimiento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el movimiento' });
  }
};

// Actualizar un movimiento existente
export const putMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, invoiceNumber, articles, value, tax, total, status } = req.body;

    // Calcular el valor total del movimiento si es necesario
    let calculatedTotal = total;
    if (!total) {
      calculatedTotal = articles.reduce((acc, article) => {
        return acc + (article.quantity * article.price);
      }, 0);
      // Añadir impuestos si es necesario
      if (tax) {
        calculatedTotal += (calculatedTotal * tax) / 100;
      }
    }

    // Actualizar el movimiento
    const movimientoActualizado = await Movimiento.findByIdAndUpdate(
      id,
      { type, invoiceNumber, articles, value, tax, total: calculatedTotal, status },
      { new: true }
    );

    if (!movimientoActualizado) {
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }

    res.status(200).json({ message: 'Movimiento actualizado exitosamente', movimiento: movimientoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el movimiento' });
  }
};

// Eliminar un movimiento
export const deleteMovimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const movimientoEliminado = await Movimiento.findByIdAndDelete(id);

    if (!movimientoEliminado) {
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }

    res.status(200).json({ message: 'Movimiento eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el movimiento' });
  }
};
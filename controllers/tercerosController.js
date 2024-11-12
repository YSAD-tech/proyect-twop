import Tercero from '../models/terceros.js';

// Obtener todos los terceros
export const getTerceros = async (req, res) => {
  try {
    const terceros = await Tercero.find();
    res.status(200).json({ terceros });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los terceros' });
  }
};

// Crear un nuevo tercero
export const postTercero = async (req, res) => {
  try {
    const { name, identification, address, phone, email, type } = req.body;

    // Verificar si el tercero ya existe por su identificación
    const terceroExistente = await Tercero.findOne({ identification });
    if (terceroExistente) {
      return res.status(400).json({ message: 'El tercero con esta identificación ya existe' });
    }

    // Crear una nueva instancia de Tercero
    const nuevoTercero = new Tercero({
      name,
      identification,
      address,
      phone,
      email,
      type,
    });

    // Guardar el tercero en la base de datos
    await nuevoTercero.save();

    res.status(201).json({ message: 'Tercero creado exitosamente', tercero: nuevoTercero });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el tercero' });
  }
};

// Actualizar un tercero existente
export const putTercero = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, identification, address, phone, email, type } = req.body;

    const terceroActualizado = await Tercero.findByIdAndUpdate(
      id,
      { name, identification, address, phone, email, type },
      { new: true } // Retorna el tercero actualizado
    );

    if (!terceroActualizado) {
      return res.status(404).json({ message: 'Tercero no encontrado' });
    }

    res.status(200).json({ message: 'Tercero actualizado exitosamente', tercero: terceroActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el tercero' });
  }
};

// Eliminar un tercero
export const deleteTercero = async (req, res) => {
  try {
    const { id } = req.params;

    const terceroEliminado = await Tercero.findByIdAndDelete(id);

    if (!terceroEliminado) {
      return res.status(404).json({ message: 'Tercero no encontrado' });
    }

    res.status(200).json({ message: 'Tercero eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el tercero' });
  }
};
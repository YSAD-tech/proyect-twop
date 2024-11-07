import Tercero from '../models/terceros.js';

export const getTerceros = async (req, res) => {
  try {
    const terceros = await Tercero.find();
    res.json(terceros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postTercero = async (req, res) => {
  try {
    const { name, identification, address, phone, email, type } = req.body;
    const tercero = new Tercero({ name, identification, address, phone, email, type });
    await tercero.save();
    res.json({ tercero });
  } catch (error) {
    res.status(400).json({ error: "No se pudo registrar el tercero" });
    console.log(error);
  }
};

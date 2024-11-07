import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import articulosRoutes from './routers/articulosRoutes.js';
import categoriasRoutes from './routers/categoriasRoutes.js';
import tercerosRoutes from './routers/tercerosRoutes.js';
import movimientosRoutes from './routers/movimientosRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use("/api/articulos", articulosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/terceros", tercerosRoutes);
app.use("/api/movimientos", movimientosRoutes);

app.listen(process.env.PORT,()=>{
  console.log('Servidor escuchando en el puerto' + process.env.PORT);
  mongoose.connect(process.env.CNX_MONGO)
  .then(()=> console.log('conected!'))
  .catch((error)=> console.log(error))
})
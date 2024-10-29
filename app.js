const express = require('express')
const mongoose = require('mongoose')
import articulos from './routers/articulosRoutes';
import categorias from './routers/categoriasRoutes';
import terceros from './routers/tercerosRoutes';
import movimientos from './routers/movimientosRoutes';
require('dotenv').config()

const app = express();
app.use(express.json());
app.use("/api/articulos", articulos)
app.use("/api/categorias", categorias)
app.use("/api/terceros", terceros)
app.use("/api/movimientos", movimientos)

app.listen(process.env.PORT,()=>{
  console.log('Servidor escuchando en el puerto' + process.env.PORT);
  mongoose.connect(process.env.CNX_MONGO)
  .then(()=> console.log('conected!'))
  .catch((error)=> console.log(error))
})
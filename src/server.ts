// Este archivo sirve para realizar todas las configuraciones del servidor.
//  Aqui esta la aplicacion principal

import express from 'express' // ESM Ecmascript
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'

const app = express()

connectDB()

// Leer datos de formularios
app.use(express.json())

app.use('/', router)


export default app
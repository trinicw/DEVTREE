// En este archivo iran las funciones encargadas de manejar el request,
// tipo de peticion y otras acciones que se necesiten realizar en el servidor.


import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import slug from 'slug'
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"


export const createAccount = async (req: Request, res: Response) => {



    // verificamos que no se dupliquen los usuarios
    const {email, password} = req.body

    const userExists = await User.findOne({email})
    if(userExists) {
        const error = new Error('Un usuario con ese mail ya esta registrado')
        res.status(409).json({error: error.message})
        return   // Esto asegura que el flujo termine aquí
    }

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({handle})
    if(handleExists) {
        const error = new Error('Nombre de usuario no disponible')
        res.status(409).json({error: error.message})
        return   // Esto asegura que el flujo termine aquí
    }


    const user = new User(req.body)
    user.password =  await hashPassword(password)
    user.handle = handle

    await user.save()

    res.status(201).send('Registro Creado correctamente') // Sirve para finalizar la funcion.
}


export const login = async (req: Request, res: Response) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
        return
    }

    
    const {email, password} = req.body

    // Verificar si el usuario está registrado
    const user = await User.findOne({email})
    if(!user) {
        const error = new Error('El usuario NO existe')
        res.status(404).json({error: error.message})
        return   // Esto asegura que el flujo termine aquí
}

    // Si la cuenta existe, hay que comprobar el password
    const isPasswordCorrect = await checkPassword(password as string, user.password as string)
    if(!isPasswordCorrect) {
        const error = new Error('Password incorrecto')
        res.status(401).json({error: error.message})
        return 
}

    res.send('Autenticado correctamente')

}
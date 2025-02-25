import { Router } from 'express'
import {body} from 'express-validator'
import { createAccount, login } from './handlers/index';  
import { handleInputErrors } from './middleware/validation';  


const router = Router()


/** Autenticacion y Registro */
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacío'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacío'),
    body('email')
        .isEmail()
        .withMessage('E-mail no valido'),
    body('password')
        .isLength({min: 8})
        .withMessage('El password debe tener al menos 8 caracteres'),
    handleInputErrors, // maneja los errores de validacion
    createAccount)



router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('E-mail no valido'),
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    handleInputErrors, // maneja los errores de validacion
    login 

)    

export default router
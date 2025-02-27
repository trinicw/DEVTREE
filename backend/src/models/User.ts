import mongoose, { Schema } from "mongoose";


// La Interface y el Schema deben tener los mimsmos campos y tipos de datos para que no haya errores.
// Interface es para typescript y Schema es para mongoose.



export interface IUser {
    handle : String
    name : String
    email : String
    password : String
}

const userSchema = new Schema({
    handle : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password : {
        type: String,
        required: true,
        trim: true
    },

})


const User = mongoose.model<IUser>('User', userSchema)
export default User


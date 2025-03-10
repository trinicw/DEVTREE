export type User = {
    handle : String
    name : String
    email : String
    
}

export type RegisterForm = Pick<User, 'handle' | 'name' | 'email' > & {
    password : String
    password_confirmation: string

}
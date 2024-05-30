import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Rey',
        email: 'rey@gmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    }
]

export default usuarios
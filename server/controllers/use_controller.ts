import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'

// New User
export const registerNewUser = async (req: Request, res: Response) => {

    const { name, email, password } = req.body

    // validations
    if (!name) return res.status(422).json({ message: 'O nome é obrigatório!' })
    if (!email) return res.status(422).json({ message: 'O email é obrigatório!' })
    if (!password) return res.status(422).json({ message: 'A senha é obrigatória!' })

    // Check User Exists
    const userExists = await User.findOne({ email: email })

    if (userExists) return res.status(422).json({ message: 'Usuário existente!' })

    // Create Password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create User
    const user = new User({
        name,
        email,
        password: passwordHash
    })

    try {
        await user.save()
        res.status(201).json({ message: 'Usuário criado com sucesso!' })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Houve um erro no servidor, tente novamente mais tarde' })
    }
}

// All Users
export const usersProfiles = async (req: Request, res: Response) => {
    const users = await User.find()
    console.log(users)
    await res.json(users)
}

// Delete User
export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const registers = await User.findByIdAndDelete(req.params.id)

        if (!registers) return res.status(404).json({ message: "Usuário não encontrado" })

        return res.json({ message: 'Usuário deletado com sucesso!' })
    } catch (err) {
        return res.status(500).send(err)
    }
}

// Login User
export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body

    // validations
    if (!email) return res.status(422).json({ message: 'O email é obrigatório!' })
    if (!password) return res.status(422).json({ message: 'A senha é obrigatória!' })

    // Check User Exists
    const user = await User.findOne({ email: email })
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' })

    // Check Password Match
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) return res.status(422).json({ message: 'Senha inválida!' })

    try {
        const secret: string | any = process.env.SECRET
        const token = jwt.sign({
            id: user._id
        },
            secret
        )

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 dia
        })

        res.status(200).json({ message: 'Autenticação realizada com sucesso!', token })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Houve um erro no servidor, tente novamente mais tarde' })
    }
}

// Private Route
export const usePrivate = async (req: Request, res: Response) => {
    const id = req.params.id

    // Check User Exists
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado!' })
    }
    res.status(200).json({ user })
}

export const checkToken = function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    try {
        const secret: string | any = process.env.SECRET

        jwt.verify(token, secret)

        next()
    }
    catch (error) {
        res.status(400).json({ message: 'Token inválido!' })
    }
}

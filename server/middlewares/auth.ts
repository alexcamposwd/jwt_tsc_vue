import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    try {
        const secret: string = (process.env.SECRET as string);

        jwt.verify(token, secret)

        next()
    }
    catch (error) {
        res.status(400).json({ message: 'Token inválido!' })
    }
}
import express from 'express'
const router = express.Router()
import { registerNewUser, usersProfiles, deleteProfile, userLogin, usePrivate, checkToken } from '../controllers/use_controller'

// Route Create User - localhost:3000/api/v1/register
router.post('/register', registerNewUser)

//Route Login - localhost:3000/api/v1/login
router.post('/login', userLogin)

//Route - localhost:3000/api/v1/profiles
router.get('/profiles', usersProfiles)

//Route Private - localhost:3000/api/v1/private/
router.get('/private/:id', checkToken, usePrivate)

//Route Delete - localhost:3000/api/v1/delete/
router.delete('/delete/:id', deleteProfile)

export default router
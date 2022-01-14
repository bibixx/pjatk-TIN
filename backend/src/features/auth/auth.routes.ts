import express from 'express';
import { login } from './login/login';
import { logout } from './logout/logout';
import { ping } from './ping/ping';
import { register } from './register/register';

export const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', logout);
authRouter.post('/ping', ping);

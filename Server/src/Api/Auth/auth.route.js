import {Router} from 'express';
import { loginLogic } from './auth.controller.js';

export const authRouter=Router();

authRouter.post('/login',loginLogic);

import express from 'express';
import { home } from './home.controllers';

export const homeRouter = express.Router({
  strict: true,
});

homeRouter.get('/', home);

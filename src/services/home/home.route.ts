import express from 'express';
import { getHome } from './home.controllers';

export const homeRouter = express.Router({
  strict: true,
});

homeRouter.get('/', getHome);

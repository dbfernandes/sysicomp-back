import 'reflect-metadata';
import 'express-async-errors';

import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';

import AppError from './errors/AppError';
import routes from './routes';
import './database';

import UploadConfig from './config/upload';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static('public'));
app.use('/files', express.static(UploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // return response.status(500).json({
  //   status: 'error',
  //   message: 'Internal server error',
  // });

  return response.json(err);
});

app.listen(3333, () => {
  console.log('🚀 Server Started');
});

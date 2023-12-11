import express from 'express';
import { router } from './routes/index.js';
import { AppError } from './common/errors/appError.js';
import { handleGlobalError } from './common/errors/error.controller.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use('/api/v1', router);

app.all('/*', (req, res, next) => {
   return next(
      new AppError(`Can not find ${req.originalUrl} on this server`, 404)
   );
});

app.use(handleGlobalError);

export default app;

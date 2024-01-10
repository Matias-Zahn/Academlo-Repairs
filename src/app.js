import express from 'express';
import { router } from './routes/index.js';
import { AppError } from './common/errors/appError.js';
import { handleGlobalError } from './common/errors/error.controller.js';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use('/api/v1', router);

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:5173/');
});

app.all('/*', (req, res, next) => {
   return next(
      new AppError(`Can not find ${req.originalUrl} on this server`, 404)
   );
});

app.use(handleGlobalError);

export default app;

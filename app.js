const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes');
const { devBaseUrl } = require('./constants/constants');

const { NODE_ENV, DATABASE_URL, PORT = 3003 } = process.env;

const app = express();

app.use(requestLogger);
app.use(cookieParser());
app.use(cors);
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : DATABASE_DEV_URL);

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок
// обработчик ошибок celebrate
app.use(errors());
// централизованный обработчик
app.use(errorHandler);

app.listen(PORT);

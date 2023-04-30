const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(express.json());
app.use(planetsRouter);
app.use(launchesRouter);

module.exports = app

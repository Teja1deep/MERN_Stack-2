import express from 'express';
import mongoose from 'mongoose';
import {ENV} from './lib/env.js';

const app = express();

app.get('/hi', (req, res) => {
    res.status(200).json({message: "successfully connected to the server"});
});

app.listen(ENV.PORT, () => {
    console.log('Server is running on port', ENV.PORT);
});


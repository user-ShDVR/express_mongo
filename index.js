import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { AuthController, UserController } from './controllers/index.js';

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, AuthController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, AuthController.register);
app.get('/auth/me', checkAuth, AuthController.getMe);
app.get('/users', checkAuth, UserController.getAllExceptCurrentUser);
app.put('/users/update', checkAuth, updateValidation, handleValidationErrors, UserController.update);

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started on port ${process.env.PORT}`);
});

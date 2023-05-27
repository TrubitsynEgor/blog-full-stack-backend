import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import { validationErrors, checkAuth } from './utils/index.js'
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js'
import {
  getUserById,
  login,
  register,
  createPost,
  getAllPosts,
  getPostById,
  removePost,
  updatePost,
} from './controllers/index.js'

mongoose
  .connect(
    'mongodb+srv://trubitsynwork74:Psqu7uAsl7LpAAFX@cluster0.zulkpqy.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DataBase OK!'))
  .catch((e) => console.log('DataBase Error ', e))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

// Authorization========================>
app.post('/auth/login', loginValidation, validationErrors, login)
app.post('/auth/register', registerValidation, validationErrors, register)
app.get('/auth/me', checkAuth, getUserById)
//=====================================>

// Posts===============================>
app.get('/posts', getAllPosts)
app.get('/posts/:id', getPostById)
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  validationErrors,
  createPost
)
app.delete('/posts/:id', checkAuth, removePost)
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  validationErrors,
  updatePost
)
// ====================================>

app.listen(4444, (err) => {
  if (err) console.log(err)
  console.log('Server OK!')
})

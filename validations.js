import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Wrong email format').isEmail(),
  body('password', 'Password must be more 5 symbols').isLength({ min: 5 }),
]

export const registerValidation = [
  body('email', 'Wrong email format').isEmail(),
  body('password', 'Password must be more 5 symbols').isLength({ min: 5 }),
  body('fullName', 'Name is required').isLength({ min: 3 }),
  body('avatarUrl', 'Invalid link').optional().isURL(),
]

export const postCreateValidation = [
  body('title', 'Enter the article title').isLength({ min: 3 }).isString(),
  body('text', 'Enter the article text').isLength({ min: 10 }).isString(),
  body('tags', 'Invalid tags format').optional().isArray(),
  body('imageUrl', 'Invalid link').optional().isString(),
]

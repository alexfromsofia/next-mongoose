import bcrypt from 'bcrypt'
import { NextFunction } from 'express'
import mongoose, { Schema, Document, Model } from 'mongoose'

const { String } = Schema.Types

enum Roles {
  user = 'user',
  admin = 'admin',
  root = 'root',
}

interface SavedUser extends Document {
  name: string
  email: string
  password: string
  role: Roles.admin | Roles.root | Roles.user
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin', 'root'],
    },
  },
  {
    timestamps: true,
  }
).pre('save', async function <SavedUser>(next: NextFunction) {
  // Schema Middleware for hashing password before save
  // Must be a standard  function in order to bind the this to userSchema
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

let model: Model<SavedUser>

try {
  model = mongoose.model('User')
} catch (error) {
  model = mongoose.model('User', UserSchema)
}

export default model

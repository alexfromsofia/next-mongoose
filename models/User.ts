import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { NextFunction } from 'express'
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
)

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await model.findOne({ email })

  if (!user) {
    throw new Error('Unable to login.')
  }
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login.')
  }

  return user
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({ token })

  await user.save()
  return token
}

/* TODO:
// Schema Middleware for hashing password before save
// Must be a standart function in order to bind the this to userSchema
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;

  await Task.deleteMany({ owner: user._id });
  next();
});
TODO */

let model: Model<SavedUser>

try {
  model = mongoose.model('User')
} catch (error) {
  model = mongoose.model('User', UserSchema)
}

export default model

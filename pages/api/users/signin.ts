import { Request, Response } from 'express'

import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

dbConnect()

export default async (req: Request, res: Response) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
      } catch (error) {
        res.status(400).send({ error: 'Unable to login' })
      }
      break

    default:
      res.status(400).json({ success: false })
  }
}

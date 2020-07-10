import { Request, Response } from 'express'

import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

dbConnect()

export default async (req: Request, res: Response) => {
  const { method } = req

  switch (method) {
    case 'POST':
      // eslint-disable-next-line
      const user = new User(req.body)

      try {
        await user.save()
        // sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
      } catch (error) {
        res.status(400).send(error)
      }
      break

    default:
      res.status(400).json({ success: false })
  }
}

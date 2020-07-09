import { Request, Response } from 'express'

import dbConnect from '../../../utils/dbConnect'
import Note from '../../../models/Note'
import authMiddleware from '../../../middleware/authentication'

dbConnect()

export default async (req: Request, res: Response) => {
  await authMiddleware(req, res)

  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const notes = await Note.find({})

        res.status(200).json({ success: true, data: notes })
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const note = await Note.create(req.body)

        res.status(201).json({ success: true, data: note })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
  }
}

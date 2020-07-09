import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import initMiddleware from '.'

export interface Session {
  _id: string
  // dateCreated: number
  // username: string
  // /**
  //  * Timestamp indicating when the session was created, in Unix milliseconds.
  //  */
  // issued: number
  // /**
  //  * Timestamp indicating when the session should expire, in Unix milliseconds.
  //  */

  // expires: number
}

const isAuthenticated = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    })
    if (!user) {
      throw new Error()
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

export default initMiddleware(isAuthenticated)

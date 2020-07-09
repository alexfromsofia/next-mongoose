import { Request, Response } from 'express'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function initMiddleware(middleware: Function) {
  return (req: Request, res: Response) =>
    new Promise((resolve, reject) => {
      middleware(req, res).then((result: Error | void) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

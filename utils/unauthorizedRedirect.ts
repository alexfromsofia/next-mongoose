import { NextPageContext } from 'next'

// in your getInitialProps
export default function (res: Response, ctx: NextPageContext) {
  if (res.status === 401) {
    ctx.res.writeHead(302, {
      Location: '/signin',
    })

    ctx.res.end()
  }
}

// import Router from 'next/router'
import { NextPageContext } from 'next'
import fetch from 'isomorphic-unfetch'

import { NOTES_API_URL } from '../utils/constants'
import { Note } from '../utils/types'
import unauthorizedRedirect from '../utils/unauthorizedRedirect'
interface Props {
  notes: Note[]
}

const Home = function ({ notes }: Props) {
  return (
    <div>
      ASd
      {notes.map(({ title, description }: Note) => (
        <>
          {title}, {description}
        </>
      ))}
    </div>
  )
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  try {
    const res = await fetch(NOTES_API_URL)

    unauthorizedRedirect(res, ctx)

    const response = await res.json()

    const { success, data: notes } = response
    if (!success) return { notes: [] }

    return { notes }
  } catch (error) {
    // eslint-disable-next-line
    console.log('Error: ', error)
    return { notes: [] }
  }
}

export default Home

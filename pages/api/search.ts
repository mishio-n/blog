import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '~/libs/client'

const search = async (request: NextApiRequest, response: NextApiResponse) => {
  // search word for microCMS
  const { q } = request.query

  if (typeof q !== 'string') {
    response.status(404).end()
    return
  }

  const data = await client.get('blog', {
    queries: { q }
  })
  response.status(200).json(data)
  return
}

export default search

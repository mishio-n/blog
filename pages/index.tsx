import { InferGetStaticPropsType, NextPage } from 'next'
import { Articles } from '~/components/articles'
import { client } from '~/libs/client'
import { Blogs } from '~/schema'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const data = await client.get<Blogs>({ endpoint: 'blog' })

  return {
    props: {
      blogs: data
    }
  }
}

const Home: NextPage<Props> = ({ blogs }) => {
  return (
    <div>
      <Articles blogs={blogs.contents}></Articles>
    </div>
  )
}

export default Home

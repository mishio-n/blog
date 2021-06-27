import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '~/components/Layout'
import { client } from '~/libs/client'
import { generateTitle, OG_TITLE } from '~/libs/meta'
import Image from 'next/image'
import clockIcon from '~/public/clock.svg'
import dayjs from 'dayjs'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const categories = await client.get('categories')
  const authors = await client.get('authors')

  const author = authors.contents[0]
  return {
    props: {
      categories,
      author
    }
  }
}

const About: NextPage<Props> = ({ categories, author }) => {
  const pagetitle = generateTitle('プロフィール')
  return (
    <>
      <Head>
        <title>{pagetitle}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={pagetitle} />
      </Head>
      <Layout categories={categories.contents}>
        <div className="flex-col">
          <Image
            src={author.image.url}
            height={author.image.height / 8}
            width={author.image.width / 8}
            alt="著者画像"
            loading="lazy"
            blurDataURL={author.image.url}
            placeholder="blur"
            className="rounded-harf"
          />
          <span>{author.name}</span>
          <div className="flex items-center mt-2 mr-5 text-gray-500 whitespace-nowrap">
            <Image src={clockIcon} alt="時計アイコン" width={20} height={20} />
            <span className="ml-2">
              更新日:
              {dayjs(author.updatedAt).format('YYYY/MM/DD')}
            </span>
          </div>
          <div className="mt-4">
            {author.profile.split('\n').map((line, i) => (
              <p key={`line-${i}`} className="pt-1">
                {line}
              </p>
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default About

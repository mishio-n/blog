import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Articles } from '~/components/Articles';
import { Layout } from '~/components/Layout';
import { client } from '~/libs/client';
import { generateTitle, OG_TITLE } from '~/libs/meta';
import { Blogs } from '~/schema';

export const getStaticProps = async () => {
  const categories = await client.get('categories');

  return {
    props: {
      categories: categories.contents,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SearchResultPage: NextPage<Props> = ({ categories }) => {
  const title = generateTitle('検索結果');

  const router = useRouter();

  const searchWord = router.query.q;

  const { data: blogs, error } = useSWR<Blogs>(
    `/api/search?q=${searchWord}`,
    (url) => fetch(url).then((res) => res.json()),
  );

  if (error) {
    return <p>検索エラー</p>;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
      </Head>
      <Layout categories={categories}>
        {blogs === undefined ? (
          <div>検索中</div>
        ) : blogs.contents.length === 0 ? (
          <div>「 {searchWord} 」の検索結果：記事が見つかりませんでした</div>
        ) : (
          <>
            <div className="text-base text-gray-600">
              「 {searchWord} 」の検索結果：
              <span className="p-1 text-lg font-bold">{blogs.totalCount}</span>
              件の記事が見つかりました
            </div>
            <Articles blogs={blogs.contents} />
          </>
        )}
      </Layout>
    </>
  );
};

export default SearchResultPage;

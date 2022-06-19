/* eslint-disable @next/next/no-img-element */
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryItem } from '~/components/CategoryItem';
import clockIcon from '~/public/clock.svg';
import { Blog } from '~/schema';

type Props = {
  blogs: Blog[];
};

export const Articles: React.FC<Props> = ({ blogs }) => {
  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="px-0 py-5">
            <Link href={`/${blog.id}`}>
              <a className="flex justify-between <800:flex-col">
                <img
                  src={blog.ogimage.url}
                  alt="Thumbnail Image"
                  className={
                    'rounded-5 w-80 h-44 sm:w-full sm:h-auto >800:w-thumbnail >800:h-thumbnail'
                  }
                />
                <dl className="flex-1 ml-10">
                  <dt className="text-xl font-bold <800:mt-3">{blog.title}</dt>
                  <dd className="mt-5">
                    <div>
                      {blog.categories.map((category, i) => (
                        <CategoryItem
                          key={category.name}
                          requiredMarginLeft={i !== 0}
                          category={category}
                        />
                      ))}
                      <div className="flex-col px-0 pb-10 mt-2 pt-2.5">
                        <div className="flex items-center mr-5 text-gray-500 whitespace-nowrap">
                          <Image
                            src={clockIcon}
                            alt="時計アイコン"
                            width={20}
                            height={20}
                            className="text-gray-500"
                          />
                          <span className="ml-2">
                            公開日:
                            {dayjs(blog.publishedAt).format('YYYY/MM/DD')}
                          </span>
                        </div>
                        <div className="flex items-center mt-2 mr-5 text-gray-500 whitespace-nowrap">
                          <Image
                            src={clockIcon}
                            alt="時計アイコン"
                            width={20}
                            height={20}
                          />
                          <span className="ml-2">
                            更新日:
                            {dayjs(blog.updatedAt).format('YYYY/MM/DD')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </dd>
                </dl>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

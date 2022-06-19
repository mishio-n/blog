import Link from 'next/link';
import { Category } from '~/schema';

type Props = {
  categories: Category[];
};

export const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <div className="px-0 py-10">
      <h1 className="text-xl font-bold text-neutral bg-base-200 py-1.5 px-2.5 mb-2.5 rounded-5">
        カテゴリー
      </h1>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="border-b border-base-200 border-solid last:border-none"
          >
            <Link href={`/category/${category.id}/page/1`}>
              <a className="block text-neutral p-2.5">{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

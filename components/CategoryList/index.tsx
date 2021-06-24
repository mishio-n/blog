import { Category } from '~/schema'
import Link from 'next/link'

type Props = {
  categories: Category[]
}

export const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <div className="px-0 py-10">
      <h1 className="text-xl font-bold bg-gray-300 py-1.5 px-2.5 mb-2.5 rounded-5">
        カテゴリー
      </h1>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="border-b border-gray-300 border-solid last:border-none"
          >
            <Link href={`/category/${category.id}/page/${1}`}>
              <a className="block p-2.5 ">{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

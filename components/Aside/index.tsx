import { CategoryList } from '~/components/CategoryList'
import { Category } from '~/schema'

type Prop = {
  categories: Category[]
}

export const Aside: React.FC<Prop> = ({ categories }) => {
  return (
    <aside className="lg:w-80 md:w-80 md:mt16 sm:w-auto sm:mt-16">
      <p>著者紹介</p>
      <CategoryList categories={categories} />
      <p>人気の記事</p>
    </aside>
  )
}

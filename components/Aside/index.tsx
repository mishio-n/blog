import { CategoryList } from '~/components/CategoryList'
import { Category } from '~/schema'

type Prop = {
  categories: Category[]
}

export const Aside: React.FC<Prop> = ({ categories }) => {
  return (
    <aside className="w-full ml-10 md:mt16 sm:w-auto sm:mt-16">
      <CategoryList categories={categories} />
    </aside>
  )
}

import { CategoryList } from '~/components/CategoryList'
import { Category } from '~/schema'

type Prop = {
  categories: Category[]
}

export const Aside: React.FC<Prop> = ({ categories }) => {
  return (
    <aside className="ml-10 w-80 md:mt16 sm:w-auto sm:mt-16 <800:hidden">
      <CategoryList categories={categories} />
    </aside>
  )
}

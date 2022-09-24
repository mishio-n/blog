import { CategoryList } from '~/components/CategoryList';
import { Category } from '~/schema';

type Prop = {
  categories: Category[];
  classname: string;
};

export const Aside: React.FC<Prop> = ({ categories, classname }) => {
  return (
    <aside className={`ml-10 w-80 sm:mt-16 md:mt-16 <800:hidden ${classname}`}>
      <CategoryList categories={categories} />
    </aside>
  );
};

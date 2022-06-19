import Link from 'next/link';
import { Category } from '~/schema';
import styles from './categoryItem.module.scss';

type Props = {
  requiredMarginLeft: boolean;
  category: Category;
};

export const CategoryItem: React.FC<Props> = ({
  requiredMarginLeft,
  category,
}) => {
  return (
    <span className={`${styles.item} ${requiredMarginLeft && 'ml-2'}`}>
      <Link href={`/category/${category.id}/page/1`}>
        <a>{category.name}</a>
      </Link>
    </span>
  );
};

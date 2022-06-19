import { useRouter } from 'next/router';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import styles from './searchBar.module.scss';

export const SearchBar: React.FC = () => {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setText(event.currentTarget.value);
  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (text === '') {
      return;
    }

    if (event.key === 'Enter') {
      router.push({
        pathname: `/search`,
        query: { q: text },
      });
    }
  };

  return (
    <label className="text-sm font-bold text-gray-500 display">
      <input
        type="text"
        placeholder="検索する"
        className={styles.input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </label>
  );
};

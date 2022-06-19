import Image from 'next/image';
import Link from 'next/link';
import { SearchBar } from '~/components/SearchBar';
import icon from '~/public/icon-192x192.png';

const links = [{ href: '/about', text: 'プロフィール' }];

export const Header: React.FC = () => {
  return (
    <>
      <header
        id="header"
        className="sticky top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-between px-10 py-3 bg-white border-b border-gray-300 border-solid >800:flex-wrap"
      >
        <h1 className="px-0 py-2 mr-8 sm:inline-block sm:h-7">
          <Link href="/">
            <a className="flex items-center h-7">
              <Image
                src={icon}
                className="h-7"
                alt="logo"
                width={28}
                height={28}
              />
              <span className="pl-2">mishioブログ</span>
            </a>
          </Link>
        </h1>
        <div className="flex">
          <SearchBar />
          <ul className=">800:flex >800:items-center <800:py-2 <800:px-0 first:pt-0">
            {links.map((link) => (
              <li className="px-4 py-0 whitespace-nowrap" key={link.text}>
                <a href={link.href} className="block px-0 py-2 text-gray-500 ">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <div className=">800:h-8 <800:h-4"></div>
    </>
  );
};

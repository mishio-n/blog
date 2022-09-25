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
        className="sticky top-0 left-0 z-50 flex items-center justify-between bg-neutral px-10 py-3 <800:px-5 >800:flex-wrap"
      >
        <h1 className="mr-8 px-0 py-2 sm:inline-block sm:h-7">
          <Link href="/">
            <a className="flex h-7 items-center">
              <Image
                src={icon}
                className="h-7"
                alt="logo"
                width={32}
                height={32}
              />
              <span className="ml-4 whitespace-nowrap text-2xl font-bold text-secondary <800:text-sm">
                mishioブログ
              </span>
            </a>
          </Link>
        </h1>
        <div className="flex">
          <SearchBar />
          <ul className="first:pt-0 <800:hidden <800:py-2 <800:px-0 >800:flex >800:items-center">
            {links.map((link) => (
              <li className="whitespace-nowrap px-4 py-0" key={link.text}>
                <a href={link.href} className="block px-0 py-2 text-gray-500 ">
                  <span className="text-base-100">{link.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

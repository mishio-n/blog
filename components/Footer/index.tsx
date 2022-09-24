import Image from 'next/image';
import githubIcon from '../../public/GitHub-Mark-120px-plus.png';

export const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-0 left-0 z-10 mt-12 w-full flex-col bg-base-200 px-10 pt-4 pb-5 text-black sm:mt-5 sm:px-5 sm:py-8">
      <p className="mt-3 text-center text-sm text-neutral sm:text-xs">
        © mishio
      </p>
      <div className="mt-2 flex justify-center">
        <a
          href="https://github.com/mishio-n"
          target={'_blank'}
          rel={'noreferrer'}
        >
          <Image src={githubIcon} alt={'github'} width={24} height={24} />
        </a>
      </div>
    </footer>
  );
};

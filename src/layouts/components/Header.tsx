import type { FC } from 'react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const Header: FC = () => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;

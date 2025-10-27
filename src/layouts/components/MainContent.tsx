import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const MainContent: FC = () => {
  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </div>
    </main>
  );
};

export default MainContent;

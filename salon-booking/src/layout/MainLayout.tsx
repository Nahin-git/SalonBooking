import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.mainLayout}>
      <Sidebar />
      <div className={styles.contentArea}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

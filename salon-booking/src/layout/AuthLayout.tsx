import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';
import authBg from '../assets/auth-bg.png';

export const AuthLayout: React.FC = () => {
  return (
    <div className={styles.authContainer} style={{ backgroundImage: `url(${authBg})` }}>
      <div className={styles.overlay} />
      
      <div className={styles.content}>
        <div className={styles.authCard}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

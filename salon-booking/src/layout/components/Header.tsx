import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search anything..." />
      </div>

      <div className={styles.userProfile}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user?.name || 'Admin'}</span>
          <span className={styles.userRole}>Super Admin</span>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </header>
  );
};

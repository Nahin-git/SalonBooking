import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h2>Glamora</h2>
      </div>

      
      <nav className={styles.navMenu}>
        <NavLink 
          to="/dashboard" 
          end
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/dashboard/bookings" 
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Bookings
        </NavLink>
        <NavLink 
          to="/dashboard/customers" 
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Customers
        </NavLink>
        <NavLink 
          to="/dashboard/employees" 
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Employees
        </NavLink>
        <NavLink 
          to="/dashboard/payments" 
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Payments
        </NavLink>
      </nav>
    </aside>
  );
};

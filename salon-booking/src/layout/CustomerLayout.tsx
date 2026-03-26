import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './CustomerLayout.module.scss';
import { useAuth } from '../core/hooks/useAuth';

export const CustomerLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      {/* ═══ HEADER ═══ */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand} onClick={() => navigate('/dashboard')}>
            <div className={styles.logoMark}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <div className={styles.brandText}>
              <h1>Glamora</h1>
              <span>Premium Salon Booking</span>
            </div>
          </div>

          <nav className={styles.nav}>
            <a href="#" className={`${styles.navItem} ${styles.navActive}`}>Explore</a>
            <a href="#" className={styles.navItem}>Favorites</a>
            <a href="#" className={styles.navItem}>My Bookings</a>
          </nav>

          <div className={styles.actions}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              Logout
            </button>
            <button className={styles.appBtn}>
              Get the App
            </button>
          </div>
        </div>
      </header>

      {/* ═══ MAIN ═══ */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className={styles.footer}>
        <div className={styles.newsletter}>
          <div className={styles.newsContent}>
            <h3>Join our community</h3>
            <p>Get exclusive salon deals and beauty tips delivered to your inbox.</p>
            <div className={styles.subForm}>
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className={styles.footerGrid}>
          <div className={styles.footerColMain}>
            <div className={styles.footerLogo}>
              <div className={styles.logoMarkSmall}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <h2>Glamora</h2>
            </div>
            <p>The smarter way to book your beauty appointments. Premium service, verified salons, instant confirmation.</p>
            <div className={styles.socialRow}>
              {/* Simplified social icons */}
              <div className={styles.socialIcon}>Fb</div>
              <div className={styles.socialIcon}>Ig</div>
              <div className={styles.socialIcon}>Tw</div>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h4>Services</h4>
            <ul>
              <li><a href="#">Hair Styling</a></li>
              <li><a href="#">Nail Art</a></li>
              <li><a href="#">Spa & Wellness</a></li>
              <li><a href="#">Makeup</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Partner with us</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2026 Glamora Salon. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

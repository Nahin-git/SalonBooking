import React from 'react';
import styles from './BookingModal.module.scss';

interface Salon {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  desc: string;
  location: string;
  hours: string;
  tags: string[];
  available: number;
  price: string;
  category: string;
}

interface BookingModalProps {
  salon: Salon | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ salon, isOpen, onClose }) => {
  if (!isOpen || !salon) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className={styles.header}>
          <h2>{salon.name}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </header>

        <div className={styles.scrollArea}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.imgWrap}>
              <img src={salon.image} alt={salon.name} />
              <div className={styles.verifiedBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17L4 12" /></svg>
                Verified Salon
              </div>
            </div>
            
            <div className={styles.quickInfo}>
              <div className={styles.infoRow}>
                <span className={styles.star}>★ {salon.rating}</span>
                <span className={styles.reviews}>({salon.reviews.toLocaleString()} reviews)</span>
                <span className={styles.price}>{salon.price}</span>
              </div>
              <p className={styles.desc}>{salon.desc}</p>
              
              <div className={styles.specialties}>
                <h4>Specialties</h4>
                <div className={styles.tagCloud}>
                  {salon.tags.map((tag, idx) => (
                    <span key={idx} className={styles.tag}>{tag}</span>
                  ))}
                  <span className={styles.tag}>Blowouts</span>
                  <span className={styles.tag}>Styling</span>
                </div>
              </div>
            </div>

            <aside className={styles.contactSide}>
              <div className={styles.sideCard}>
                <h4>Contact Information</h4>
                <div className={styles.contactItem}>
                  <span className={styles.icon}>📍</span>
                  <p>{salon.location}<br />New York, NY 10003</p>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.icon}>📞</span>
                  <p>(212) 555-3456</p>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.icon}>✉️</span>
                  <p>contact@{salon.name.toLowerCase().replace(/\s/g, '')}.com</p>
                </div>
              </div>

              <div className={styles.sideCard}>
                <h4>🕒 Business Hours</h4>
                <div className={styles.hourRow}><span>Mon - Fri</span> <strong>9:00 AM - 9:00 PM</strong></div>
                <div className={styles.hourRow}><span>Saturday</span> <strong>10:00 AM - 8:00 PM</strong></div>
                <div className={styles.hourRow}><span>Sunday</span> <strong>10:00 AM - 6:00 PM</strong></div>
              </div>
            </aside>
          </section>

          <hr className={styles.divider} />

          {/* Availability Section */}
          <section className={styles.availability}>
            <div className={styles.sectionHeader}>
              <span className={styles.icon}>📅</span>
              <h3>Check Availability</h3>
            </div>
            
            <div className={styles.datePicker}>
              <div className={styles.dateScroll}>
                {['Today', 'Tomorrow', 'Fri, Mar 27', 'Sat, Mar 28', 'Sun, Mar 29', 'Mon, Mar 30', 'Tue, Mar 31'].map((date, idx) => (
                  <button key={idx} className={`${styles.dateBtn} ${idx === 0 ? styles.activeDate : ''}`}>
                    {date}
                  </button>
                ))}
              </div>
              <div className={styles.scrollTrack}><div className={styles.scrollThumb} /></div>
            </div>

            {/* Blue Info Alert */}
            <div className={styles.blueAlert}>
              <div className={styles.alertIcon}>i</div>
              <p>To book an appointment, download our mobile app for instant confirmation and exclusive perks!</p>
            </div>

            <div className={styles.timeGrid}>
              {[
                { time: '09:00 AM', name: 'Sarah M.' },
                { time: '10:00 AM', name: 'Jennifer K.' },
                { time: '11:00 AM', name: 'Sarah M.' },
                { time: '12:00 PM', name: 'Unavailable', taken: true },
                { time: '01:00 PM', name: 'Jennifer K.' },
                { time: '02:00 PM', name: 'Unavailable', taken: true },
                { time: '03:00 PM', name: 'Jennifer K.' },
                { time: '04:00 PM', name: 'Jennifer K.' },
                { time: '05:00 PM', name: 'Sarah M.' },
                { time: '06:00 PM', name: 'Michael R.' },
              ].map((slot, idx) => (
                <button 
                  key={idx} 
                  className={`${styles.timeBtn} ${slot.taken ? styles.taken : ''}`}
                  disabled={slot.taken}
                >
                  <strong>{slot.time}</strong>
                  <span>{slot.name}</span>
                </button>
              ))}
            </div>
          </section>

          <hr className={styles.divider} />

          {/* Chair Section */}
          <section className={styles.chairsSection}>
            <div className={styles.chairsHeader}>
              <h3>Live Chair Availability</h3>
              <p className={styles.availSub}><strong className={styles.greenCount}>{salon.available}</strong> of <strong>6</strong> chairs available right now</p>
            </div>
            
            <div className={styles.chairGrid}>
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const isAvail = num <= salon.available;
                return (
                  <div key={num} className={`${styles.chair} ${isAvail ? styles.avail : styles.occupied}`}>
                    <div className={styles.chairIcon}>
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13V8h-2V5c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v3H5v5c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2zM9 5h6v3H9V5zm8 8H7V10h10v3z" /></svg>
                    </div>
                    <span>{isAvail ? 'Available' : 'Occupied'}</span>
                  </div>
                );
              })}
            </div>

            <div className={styles.infoCard}>
              <div className={styles.peakInfo}>
                <span className={styles.label}>Peak Hours</span>
                <strong>9:00 AM - 12:00 PM</strong>
              </div>
              <div className={styles.waitInfo}>
                <span className={styles.label}>Waiting Time</span>
                <strong className={styles.time}>5-10 minutes</strong>
              </div>
            </div>

            <div className={styles.middleCTA}>
              <div className={styles.ctaIcon}>!</div>
              <div className={styles.ctaText}>
                <h4>Want to Book This Chair?</h4>
                <p>Download our mobile app to instantly reserve your chair and skip the wait.</p>
              </div>
              <button className={styles.orangeBtn}>Download App to Book Now</button>
            </div>
          </section>

          {/* Final CTA Card */}
          <section className={styles.cta}>
            <div className={styles.ctaIcon}>!</div>
            <h3>Ready to Secure Your Spot?</h3>
            <p>Download the Runtime Salon app now and book your appointment in seconds with instant confirmation!</p>
            <div className={styles.appBtns}>
              <button className={styles.appStore}>Download on App Store</button>
              <button className={styles.googlePlay}>Get it on Google Play</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

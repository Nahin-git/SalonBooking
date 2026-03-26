import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingModal } from '../components/BookingModal';
import styles from './Dashboard.module.scss';

// Re-using the Salon interface for consistency
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

const categories = [
  { id: 'all', label: 'All Salons', icon: '✨' },
  { id: 'hair', label: 'Hair Care', icon: '💇' },
  { id: 'nails', label: 'Nail Art', icon: '💅' },
  { id: 'spa', label: 'Spa & Wellness', icon: '🧖' },
  { id: 'makeup', label: 'Makeup', icon: '💄' },
  { id: 'barber', label: 'Barbershop', icon: '💈' },
];

const salons = [
  {
    id: 1,
    name: 'The Gilded Mirror',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 3214,
    desc: 'Experience pure luxury in our flagship Manhattan location. Specializing in high-end transformations and celebrity-level care.',
    location: 'Manhattan, NY',
    hours: '9 AM – 9 PM',
    tags: ['Luxury', 'Color Master', 'VIP'],
    available: 4,
    price: '$$$$',
    category: 'hair',
  },
  {
    id: 2,
    name: 'Azure Spa & Nails',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 2847,
    desc: 'A tranquil oasis for your hands and soul. Expert nail artistry and restorative spa treatments in a serene environment.',
    location: 'SoHo, NY',
    hours: '9 AM – 8 PM',
    tags: ['Nail Art', 'Organic Spa', 'Calm'],
    available: 3,
    price: '$$$',
    category: 'nails',
  },
  {
    id: 3,
    name: 'Nova Hair Collective',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 1923,
    desc: 'Modern styling for the contemporary individual. Our creative team pushes the boundaries of hair design and color.',
    location: 'Midtown, NY',
    hours: '10 AM – 7 PM',
    tags: ['Cuts', 'Vibrant Color', 'Modern'],
    available: 5,
    price: '$$',
    category: 'hair',
  },
  {
    id: 4,
    name: 'Iron & Oak Barber',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 1687,
    desc: 'Classic grooming with a rugged edge. Traditional straight-razor shaves and heritage cuts for the modern man.',
    location: 'Brooklyn, NY',
    hours: '10 AM – 8 PM',
    tags: ['Shave', 'Heritage', 'Grooming'],
    available: 2,
    price: '$$',
    category: 'barber',
  },
  {
    id: 5,
    name: 'Seraphina Wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 1456,
    desc: 'Reconnect with your inner self. Holistic spa treatments, aromatherapy, and expert skin care rituals.',
    location: 'Chelsea, NY',
    hours: '9 AM – 7 PM',
    tags: ['Holistic', 'Ritual', 'Skincare'],
    available: 1,
    price: '$$$',
    category: 'spa',
  },
  {
    id: 6,
    name: 'Blush & Brush',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 1192,
    desc: 'Red Carpet ready looks for every occasion. Our makeup artists bring out your natural beauty with premium techniques.',
    location: 'Upper West, NY',
    hours: '9 AM – 8 PM',
    tags: ['Events', 'Professional', 'Beauty'],
    available: 2,
    price: '$$',
    category: 'makeup',
  },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRating, setActiveRating] = useState<number | null>(null);
  const [activePrice, setActivePrice] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  const handleBookClick = (salon: Salon) => {
    setSelectedSalon(salon);
    setIsModalOpen(true);
  };

  const filteredSalons = salons.filter((s) => {
    if (activeCategory !== 'all' && s.category !== activeCategory) return false;
    if (activeRating && s.rating < activeRating) return false;
    if (activePrice && s.price !== activePrice) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className={styles.page}>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.trustBadge}>
            <span className={styles.dot} />
            Trusted by 50,000+ satisfied clients
          </div>
          <h1 className={styles.whiteTitle}>
            Your Journey to <br />
            <span className={styles.accent}>Beautiful</span> Begins Here
          </h1>
          <p>Discover and book the finest salons and stylists in the city within seconds.</p>

          <div className={styles.searchBox}>
            <div className={styles.searchInputWrapper}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input
                type="text"
                placeholder="Find services, salons, or neighborhoods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className={styles.searchButton}>Find Salon</button>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statItem}><strong>450+</strong><span>Partners</span></div>
            <div className={styles.statSep} />
            <div className={styles.statItem}><strong>4.9/5</strong><span>Rating</span></div>
            <div className={styles.statSep} />
            <div className={styles.statItem}><strong>24/7</strong><span>Booking</span></div>
          </div>
        </div>
      </section>

      {/* ═══ NAVIGATION ═══ */}
      <section className={styles.navSection}>
        <div className={styles.categoryScroll}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryChip} ${activeCategory === cat.id ? styles.activeChip : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className={styles.chipIcon}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ FILTERS & RESULTS ═══ */}
      <section className={styles.mainContent}>
        <div className={styles.toolbar}>
          <div className={styles.filterSection}>
            <span className={styles.label}>Filter by</span>
            <div className={styles.pillGroup}>
              {[4.5, 4.0, 3.5].map((r) => (
                <button
                  key={r}
                  className={`${styles.pill} ${activeRating === r ? styles.activePill : ''}`}
                  onClick={() => setActiveRating(activeRating === r ? null : r)}
                >
                  ★ {r}+
                </button>
              ))}
            </div>
            <div className={styles.pillGroup}>
              {['$', '$$', '$$$', '$$$$'].map((p) => (
                <button
                  key={p}
                  className={`${styles.pill} ${activePrice === p ? styles.activePill : ''}`}
                  onClick={() => setActivePrice(activePrice === p ? null : p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.resultsInfo}>
            <strong>{filteredSalons.length}</strong> salons matching your search
          </div>
        </div>

        {/* ═══ SALON GRID ═══ */}
        <div className={styles.grid}>
          {filteredSalons.map((salon, i) => (
            <article
              key={salon.id}
              className={styles.salonCard}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={styles.cardHeader}>
                {/* Image with fallback error handling */}
                <img
                  src={salon.image}
                  alt={salon.name}
                  className={styles.thumbnail}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('placeholder')) {
                      console.log(`Image failed for ${salon.name}, using fallback.`);
                      target.src = 'https://images.unsplash.com/photo-1521590832167-7bfc1748b565?w=800&placeholder=true';
                    }
                  }}
                />
                <div className={styles.badgeRow}>
                  <div className={styles.slotBadge}>
                    <span className={styles.slotDot} />
                    {salon.available} Slots Left
                  </div>
                  <div className={styles.verifyBadge}>Verified</div>
                </div>
                <div className={styles.priceTag}>{salon.price}</div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.topRow}>
                  <h3>{salon.name}</h3>
                  <div className={styles.ratingBox}>
                    <span className={styles.star}>★</span> {salon.rating}
                  </div>
                </div>

                <p className={styles.salonDesc}>{salon.desc}</p>

                <div className={styles.locationRow}>
                  <svg className={styles.locIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span>{salon.location} • {salon.hours}</span>
                </div>

                <div className={styles.tagCloud}>
                  {salon.tags.map((tag, idx) => (
                    <span key={idx} className={styles.salonTag}>{tag}</span>
                  ))}
                </div>

                <button
                  className={styles.actionButton}
                  onClick={() => handleBookClick(salon)}
                >
                  Book Appointment
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredSalons.length === 0 && (
          <div className={styles.noResults}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No salons found</h3>
            <p>Try adjusting your search query or filters.</p>
            <button
              className={styles.resetBtn}
              onClick={() => { setActiveCategory('all'); setActiveRating(null); setActivePrice(null); setSearchQuery(''); }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* ═══ MODAL ═══ */}
      <BookingModal
        isOpen={isModalOpen}
        salon={selectedSalon}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

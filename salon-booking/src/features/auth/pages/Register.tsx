import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../core/hooks/useAuth';
import styles from './Login.module.scss'; // Reusing base styles for consistency

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Enter your name';
    if (!formData.phone) newErrors.phone = 'Enter your mobile number';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit number';
    
    if (!formData.email) newErrors.email = 'Enter your email address';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    
    if (!formData.password) newErrors.password = 'Minimum 6 characters required';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    // Mock registration
    setTimeout(() => {
      login('mock-token', { id: '2', name: formData.name, email: formData.email });
      navigate('/dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.brand}>
        <h1>Glamora</h1>
        <p>Elegance in Every Appointment</p>
      </div>

      <h2 className={styles.title}>Create Account</h2>
      
      <form className={styles.loginForm} onSubmit={handleRegister} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="name">Your name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="First and last name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className={errors.name ? styles.inputError : ''}
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Mobile number</label>
          <div className={styles.phoneInputWrapper}>
            <span className={styles.countryCode}>+91</span>
            <input 
              type="tel" 
              id="phone" 
              placeholder="Mobile number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={errors.phone ? styles.inputError : ''}
            />
          </div>
          {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className={errors.email ? styles.inputError : ''}
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordWrapper}>
            <input 
              type={showPassword ? 'text' : 'password'}
              id="password" 
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={errors.password ? styles.inputError : ''}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          <p className={styles.infoText}>Passwords must be at least 6 characters.</p>
        </div>

        <button type="submit" className={styles.signInButton} disabled={loading}>
          {loading ? <span className={styles.spinner}></span> : 'Continue'}
        </button>

        <div className={styles.disclaimer}>
          By creating an account, you agree to Glamora's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
        </div>
      </form>

      <div className={styles.divider}>
        <h5>Join Glamora Today</h5>
      </div>

      <div className={styles.authTabs}>
        <button 
          className={styles.tab} 
          onClick={() => navigate('/login')}
        >
          Existing User
        </button>
        <button 
          className={`${styles.tab} ${styles.active}`}
          disabled
        >
          New User
        </button>
      </div>

      <p className={styles.proTip}>
        <span className={styles.icon}>ⓘ</span> Pro Tip! Switch tab if you're already registered!
      </p>
    </div>
  );
};

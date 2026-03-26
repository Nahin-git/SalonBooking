import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../../core/hooks/useAuth';
import styles from './Login.module.scss';
// import api from '../../../core/api/axios'; // Uncomment to use real API

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('admin@salon.com');
  const [password, setPassword] = useState('password');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (method === 'phone') {
      if (!phone) newErrors.phone = 'Enter a valid 10-digit number';
      else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Enter a valid 10-digit number';
      if (step === 'verify' && !otp) newErrors.otp = 'Enter the 6-digit OTP';
    } else {
      if (!email) newErrors.email = 'Enter your email address';
      if (!password) newErrors.password = 'Enter your password';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    
    if (method === 'phone') {
      if (step === 'request') {
        // Mock Request OTP
        setTimeout(() => {
          setStep('verify');
          setLoading(false);
        }, 1200);
      } else {
        // Mock Verify OTP
        setTimeout(() => {
          login('mock-token', { id: '1', name: 'User', phone });
          navigate(from, { replace: true });
          setLoading(false);
        }, 1500);
      }
    } else {
      // Email Login
      setTimeout(() => {
        login('mock-token', { id: '1', name: 'Admin User', email });
        navigate(from, { replace: true });
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.brand}>
        <h1>Glamora</h1>
        <p>Elegance in Every Appointment</p>
      </div>

      <h2 className={styles.title}>Welcome Back!</h2>
      <p className={styles.subtitle}>Please log back in for best experience.</p>
      
      <form className={styles.loginForm} onSubmit={handleAction} noValidate>
        {method === 'phone' ? (
          <>
            {step === 'request' ? (
              <div className={styles.formGroup}>
                <div className={styles.phoneInputWrapper}>
                  <span className={styles.countryCode}>
                    <img src="https://flagcdn.com/w20/in.png" alt="IN" width="20" />
                    +91
                  </span>
                  <input 
                    type="tel" 
                    placeholder="Enter a valid 10 Digit Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={errors.phone ? styles.inputError : ''}
                    autoFocus
                  />
                </div>
                {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                
                <button type="submit" className={styles.signInButton} disabled={loading}>
                  {loading ? <span className={styles.spinner}></span> : 'Request OTP'}
                </button>
              </div>
            ) : (
              <div className={styles.formGroup}>
                <label htmlFor="otp">Enter 6-digit OTP sent to +91 {phone}</label>
                <input 
                  type="text" 
                  id="otp"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={errors.otp ? styles.inputError : ''}
                  placeholder="000000"
                  autoFocus
                />
                {errors.otp && <span className={styles.errorMessage}>{errors.otp}</span>}
                
                <button type="submit" className={styles.signInButton} disabled={loading}>
                  {loading ? <span className={styles.spinner}></span> : 'Verify & Sign-In'}
                </button>
                <button type="button" className={styles.resendButton} onClick={() => setStep('request')}>
                  Change phone number or Resend
                </button>
              </div>
            )}
            
            <div className={styles.divider}>
              <h5>OR</h5>
            </div>

            <button 
              type="button" 
              className={styles.secondaryButton}
              onClick={() => {
                setMethod('email');
                setErrors({});
              }}
            >
              Login using Email
            </button>
          </>
        ) : (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? styles.inputError : ''}
                autoFocus
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className={styles.forgotPassword}>Forgot password?</Link>
              </div>
              <div className={styles.passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <button type="submit" className={styles.signInButton} disabled={loading}>
              {loading ? <span className={styles.spinner}></span> : 'Sign-In'}
            </button>

            <div className={styles.linkRow}>
              <button 
                type="button" 
                className={styles.linkButton}
                onClick={() => {
                  setMethod('phone');
                  setErrors({});
                }}
              >
                Login using Phone
              </button>
            </div>
          </>
        )}
      </form>

      <div className={styles.footer}>
        <div className={styles.authTabs}>
          <button 
            className={`${styles.tab} ${styles.active}`}
            disabled
          >
            Existing User
          </button>
          <button 
            className={styles.tab}
            onClick={() => navigate('/register')}
          >
            New User
          </button>
        </div>
        <p className={styles.proTip}>
          <span className={styles.icon}>ⓘ</span> Pro Tip! Switch tab if you're new!
        </p>
      </div>
    </div>
  );
};


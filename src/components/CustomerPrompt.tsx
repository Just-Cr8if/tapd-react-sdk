import React, { useEffect, useState } from 'react';
import {
  submitCustomerData,
  submitCustomerSkip,
  CustomerData,
} from '../utils/tapdStorage';

type Theme = 'light' | 'dark';
type ButtonColor = 'black' | 'green' | 'blue' | 'mobylmenu' | 'purple' | 'white';

type CustomerPromptProps = {
  venueId: string;
  apiKey: string;
  theme?: Theme;
  buttonColor?: ButtonColor;
  onSubmit?: (data: CustomerData) => void;
  onSkip?: () => void;
  isVisible?: boolean;
};

const BUTTON_COLORS: Record<ButtonColor, string> = {
  black: '#000',
  green: '#00C853',
  blue: '#1565C0',
  mobylmenu: '#00A6FF',
  purple: '#7E57C2',
  white: '#fff',
};

const getStyles = (theme: Theme = 'light', buttonColor: ButtonColor = 'black'): { [key: string]: React.CSSProperties } => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    backgroundColor: theme === 'dark' ? '#222' : '#fff',
    color: theme === 'dark' ? '#f1f1f1' : '#000',
    border: '1px solid #ddd',
    borderRadius: 12,
    padding: '1.5rem',
    maxWidth: 400,
    width: '90%',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    fontFamily: 'sans-serif',
  },
  title: {
    marginBottom: '0.5rem',
  },
  description: {
    marginBottom: '1rem',
    fontSize: '0.9rem',
    color: theme === 'dark' ? '#aaa' : '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  input: {
    padding: '0.5rem',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#f1f1f1' : '#000',
  },
  button: {
    backgroundColor: BUTTON_COLORS[buttonColor] || '#000',
    color: buttonColor === 'white' ? '#000' : '#fff',
    padding: '0.6rem',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  skipButton: {
    backgroundColor: 'transparent',
    color: theme === 'dark' ? '#aaa' : '#666',
    padding: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  toggleLink: {
    marginTop: '0.5rem',
    fontSize: '0.85rem',
    color: theme === 'dark' ? '#aaa' : '#666',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
});

const CustomerPrompt: React.FC<CustomerPromptProps> = ({
  venueId,
  apiKey,
  onSubmit,
  onSkip,
  theme = 'light',
  buttonColor = 'black',
  isVisible = true,
}) => {
  const [visible, setVisible] = useState(isVisible);
  const [mode, setMode] = useState<'lookup' | 'full'>('lookup');
  const styles = getStyles(theme, buttonColor);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (visible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h2 style={styles.title}>Join the club</h2>
        <p style={styles.description}>
          {mode === 'lookup'
            ? 'Enter your phone or email to find your account.'
            : 'Enter your info to unlock rewards and track your visits.'}
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            let data: CustomerData;

            if (mode === 'lookup') {
              const contact = formData.get('contact')?.toString().trim();
              if (!contact) return;

              data = contact.includes('@')
                ? { email: contact, lookup_only: true }
                : { phone_number: contact, lookup_only: true };
            } else {
              data = {
                name: formData.get('name')?.toString() || undefined,
                phone_number: formData.get('phone_number')?.toString() || undefined,
                email: formData.get('email')?.toString() || undefined,
              };
            }

            const result = await submitCustomerData({ apiKey, venueId, data });

            if (result.success) {
              setVisible(false);
              onSubmit?.(data);
            } else {
              console.error('Failed to submit customer data:', result.error);
            }
          }}
          style={styles.form}
        >
          {mode === 'lookup' ? (
            <>
              <input
                name="contact"
                placeholder="Phone or Email"
                style={styles.input}
                autoComplete="on"
              />
              <button type="submit" style={styles.button}>Continue</button>
              <button
                type="button"
                style={styles.toggleLink}
                onClick={() => setMode('full')}
              >
                Don’t have an account?
              </button>
            </>
          ) : (
            <>
              <input name="name" placeholder="Name (optional)" style={styles.input} />
              <input name="phone_number" placeholder="Phone Number" type="tel" style={styles.input} />
              <input name="email" placeholder="Email" type="email" style={styles.input} />
              <button type="submit" style={styles.button}>Join</button>
              <button
                type="button"
                style={styles.toggleLink}
                onClick={() => setMode('lookup')}
              >
                Back to login
              </button>
            </>
          )}
          <button
            type="button"
            onClick={async () => {
              setVisible(false);
              const result = await submitCustomerSkip({ apiKey, venueId });
              if (result.success) {
                onSkip?.();
              } else {
                console.error('Failed to skip prompt:', result.error);
              }
            }}
            style={styles.skipButton}
          >
            No thanks
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerPrompt;
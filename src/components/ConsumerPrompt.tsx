import React from 'react';

type ConsumerPromptProps = {
  onSubmit: (data: { name?: string; phone_number?: string; email?: string }) => void;
  onSkip: () => void;
};

const ConsumerPrompt: React.FC<ConsumerPromptProps> = ({ onSubmit, onSkip }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Join the club</h2>
      <p style={styles.description}>Enter your info to unlock rewards and track your visits.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          onSubmit({
            name: formData.get('name') as string,
            phone_number: formData.get('phone_number') as string,
            email: formData.get('email') as string,
          });
        }}
        style={styles.form}
      >
        <input name="name" placeholder="Name (optional)" style={styles.input} />
        <input name="phone_number" placeholder="Phone Number" type="tel" style={styles.input} />
        <input name="email" placeholder="Email" type="email" style={styles.input} />
        <button type="submit" style={styles.button}>Join</button>
        <button type="button" onClick={onSkip} style={styles.skipButton}>No thanks</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    border: '1px solid #ddd',
    borderRadius: 12,
    padding: '1.5rem',
    maxWidth: 400,
    margin: '2rem auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    fontFamily: 'sans-serif',
  },
  title: {
    marginBottom: '0.5rem',
  },
  description: {
    marginBottom: '1rem',
    fontSize: '0.9rem',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  input: {
    padding: '0.5rem',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.6rem',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  skipButton: {
    backgroundColor: 'transparent',
    color: '#666',
    padding: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default ConsumerPrompt;
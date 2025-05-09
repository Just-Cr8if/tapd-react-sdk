import React from 'react';
import { ConsumerPrompt } from 'tapd-react-sdk';

function App() {
  const handleSubmit = (data: { name?: string; phone_number?: string; email?: string }) => {
    console.log('Submitted:', data);
  };

  const handleSkip = () => {
    console.log('User skipped the prompt');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <ConsumerPrompt onSubmit={handleSubmit} onSkip={handleSkip} />
    </div>
  );
}

export default App;
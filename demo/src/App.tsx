import { useState } from 'react';
import {
  CustomerPrompt,
  ToastPrompt,
  type CustomerData,
} from 'tapd-react-sdk';

function App() {
  const [activeComponent, setActiveComponent] = useState<'none' | 'customer' | 'toast'>('none');

  const handleSubmit = (data: CustomerData) => {
    console.log('✅ Submitted:', data);
    setActiveComponent('none');
  };

  const handleSkip = () => {
    console.log('⏭️ User skipped the prompt');
    setActiveComponent('none');
  };

  const renderComponent = () => {
    if (activeComponent === 'customer') {
      return (
        <CustomerPrompt
          venueId="your-venue-id"
          apiKey="your-api-key"
          theme="dark"
          onSubmit={handleSubmit}
          onSkip={handleSkip}
        />
      );
    }

    if (activeComponent === 'toast') {
      return (
        <ToastPrompt
          message="Want fries with that?"
          ctaText="Add Fries"
          price="$2.99"
          sideColor="green"
          buttonColor="black"
          theme="dark"
          position="right"
          verticalPosition="top"
          onPress={() => console.log('Pressed toast')}
        />
      );
    }

    return null;
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Buttons always visible */}
      <div style={{ zIndex: 1, position: 'relative', marginBottom: '2rem' }}>
        <button onClick={() => setActiveComponent('customer')} style={{ marginRight: '1rem' }}>
          Show CustomerPrompt
        </button>
        <button onClick={() => setActiveComponent('toast')}>
          Show ToastPrompt
        </button>
      </div>

      {/* Component area */}
      {renderComponent()}
    </div>
  );
}

export default App;
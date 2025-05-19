import { useState } from 'react';
import {
  CustomerPrompt,
  ToastPrompt,
  type CustomerData
} from 'tapd-react-sdk';

function App() {
  const [activeComponent, setActiveComponent] = useState<'none' | 'customer' | 'toast'>('none');

  const handleSubmit = (data: CustomerData) => {
    console.log('Submitted:', data);
    setActiveComponent('none');
  };

  const handleSkip = () => {
    console.log('User skipped the prompt');
    setActiveComponent('none');
  };

  const renderComponent = () => {
    if (activeComponent === 'customer') {
      return (
        <CustomerPrompt
          venueId="f7a2eaba-006a-45b2-8a98-e68f2c98f57f"
          apiKey="f7a2eaba-006a-45b2-8a98-e68f2c98f57f"
          theme="light"
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          isVisible={activeComponent === 'customer'}
        />
      );
    }

    if (activeComponent === 'toast') {
      return (
        <ToastPrompt
          message="How about some extra fries?"
          ctaText="Add Fries"
          price=""
          sideColor="blue"
          buttonColor="black"
          position="right"
          verticalPosition="top"
          onPress={() => console.log('Pressed toast')}
        />
      );
    }

    return null;
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', width: '100vw' }}>
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
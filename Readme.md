# tapd-react-sdk

A lightweight React SDK to help restaurants collect user info at the right moment.

---

## 🔧 Installation

You can install the SDK directly from GitHub:

```bash
npm install Just-Cr8if/tapd-react-sdk --legacy-peer-deps
```

The --legacy-peer-deps flag may be necessary if you're using React 19 with packages that don't yet support it.

## Customer Prompt (Used you customer arrival to menu)

```js
import { CustomerPrompt } from 'tapd-react-sdk';

<CustomerPrompt
  onSubmit={(data) => {
    // Send to backend
    fetch('/api/customer-entry/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ venue_id: VENUE_ID, ...data }),
    });
  }}
  onSkip={() => {
    // Notify backend they skipped
    fetch('/api/customer-entry/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ venue_id: VENUE_ID, skipped: true }),
    });
  }}
  theme="dark"
/>
```

### Props
- venueId (string)
Required — The venue UUID to associate the customer with.

- apiKey (string)
Required — Your Tapd API key.

- onSubmit ((data: CustomerData) => void)
Optional — Called after the user submits their information. You’ll receive their name, email, and phone number.
- onSkip (() => void)
Optional — Called when the user clicks "No thanks".

- theme ('light' or 'dark')
Optional — Adjusts the background and text styling. Default is 'light'.

- buttonColor ('green', 'blue', 'red', 'gold', 'brown', 'mobylmenu', 'white', or 'black')

## ToastPrompt
An animated toast to upsell items with a call-to-action.

```js
import { ToastPrompt } from 'tapd-react-sdk';

<ToastPrompt
  message="Want fries with that?"
  ctaText="Add Fries"
  price="$3.49"
  onPress={() => console.log('Pressed')}
  theme="light"
  position="left"
  verticalPosition="top"
  sideColor="green"
/>
```

### Props
ToastPrompt Props

- message (string)
Required — The message displayed in the toast.

- ctaText (string)
Required — The text shown on the call-to-action button.

- price (string)
Required — The price displayed next to the CTA text.

- onPress (() => void)
Required — Function called when the toast is clicked.

- theme ('light' or 'dark')
Optional — Adjusts the background and text color. Default is 'light'.

- position ('left' or 'right')
Optional — Determines which side the toast slides in from. Default is 'right'.

- verticalPosition ('top' or 'bottom')
Optional — Controls whether the toast appears at the top or bottom of the screen. Default is 'bottom'.

- sideColor ('green', 'blue', 'red', 'gold', or 'brown')
Optional — Sets the color of the vertical accent strip. Default is 'blue'.

## One-Time Prompt Logic (Recommended)
To only show the prompt once per venue, use the helper in customerProfileConfig.js:

```js
import {
  hasSeenPrompt,
  markPromptSeen,
  resetPromptAfter,
} from 'tapd-react-sdk';

if (!hasSeenPrompt(venueId)) {
  // show <CustomerPrompt />
}
```

## Theme Options
The theme prop can be:

'light' (default)
'dark'

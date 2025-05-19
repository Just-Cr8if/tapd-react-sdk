export type CustomerData = {
  name?: string;
  phone_number?: string;
  email?: string;
  lookup_only?: boolean;
};

export type SubmitResponse =
  | { success: true; customer_id: string }
  | { success: false; error: any };

const TAPD_ENVIRONMENT = 'production';

const TAPD_API_URL =
  TAPD_ENVIRONMENT === 'production'
    ? 'https://tapd.mobylmenu.com/api'
    : 'http://localhost:8000/api';

const KEY_PREFIX = 'tapd_seen_prompt_for_venue';
const TAPD_CUSTOMER_ID_KEY = 'tapd_customer_id';

// LocalStorage Helpers
function safeSetItem(key: string, value: any) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }
}

function safeGetItem(key: string) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }
  return null;
}

function safeRemoveItem(key: string) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.removeItem(key);
    } catch {}
  }
}

function getStorageKey(venueId: string) {
  return `${KEY_PREFIX}_${venueId}`;
}

// Prompt Seen Logic
function markPromptSeen(venueId: string) {
  console.log('markPromptSeen', venueId);
  safeSetItem(getStorageKey(venueId), { seen: true, timestamp: Date.now() });
}

function hasSeenPrompt(venueId: string) {
  console.log('hasSeenPrompt', venueId);
  const data = safeGetItem(getStorageKey(venueId));
  return data?.seen === true;
}

function clearPromptSeen(venueId: string) {
  safeRemoveItem(getStorageKey(venueId));
}

function resetPromptAfter(days: number, venueId: string) {
  const data = safeGetItem(getStorageKey(venueId));
  const now = Date.now();
  if (!data?.timestamp || now - data.timestamp > days * 86400000) {
    clearPromptSeen(venueId);
  }
}

// Customer ID Helpers
function saveCustomerId(customerId: string) {
  console.log('saveCustomerId', customerId);
  safeSetItem(TAPD_CUSTOMER_ID_KEY, customerId);
}

function getCustomerId(): string | null {
  const customerId = safeGetItem(TAPD_CUSTOMER_ID_KEY);
  console.log('getCustomerId', customerId);
  return customerId;
}

function clearCustomerId() {
  console.log('clearCustomerId');
  safeRemoveItem(TAPD_CUSTOMER_ID_KEY);
}

// API: Submit Customer Data
async function submitCustomerData({
  apiKey,
  venueId,
  data,
}: {
  apiKey: string;
  venueId: string;
  data: CustomerData;
}): Promise<SubmitResponse> {
  const payload = {
    venue_id: venueId,
    name: data.name || null,
    phone_number: data.phone_number || null,
    email: data.email || null,
  };

  try {
    const res = await fetch(`${TAPD_API_URL}/customer-entry/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseBody = await res.json().catch(() => null);

    if (!res.ok || !responseBody?.customer_id) {
      console.error('❌ Customer submission failed:', res.status, responseBody);
      return { success: false, error: responseBody };
    }

    markPromptSeen(venueId);
    saveCustomerId(responseBody.customer_id);

    return {
      success: true,
      customer_id: responseBody.customer_id,
    };
  } catch (err) {
    console.error('❌ Unexpected error submitting customer info:', err);
    return { success: false, error: err };
  }
}

// API: Submit Skip
async function submitCustomerSkip({
  apiKey,
  venueId,
}: {
  apiKey: string;
  venueId: string;
}): Promise<SubmitResponse> {
  try {
    const res = await fetch(`${TAPD_API_URL}/customer-entry/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ venue_id: venueId, skipped: true }),
    });

    const responseBody = await res.json().catch(() => null);

    if (!res.ok || !responseBody?.customer_id) {
      console.error('Skip submission failed:', res.status, responseBody);
      return { success: false, error: responseBody };
    }

    markPromptSeen(venueId);
    saveCustomerId(responseBody.customer_id);

    return {
      success: true,
      customer_id: responseBody.customer_id,
    };
  } catch (err) {
    console.error('❌ Unexpected error skipping customer prompt:', err);
    return { success: false, error: err };
  }
}

// Export all
const TapdStorage = {
  markPromptSeen,
  hasSeenPrompt,
  clearPromptSeen,
  resetPromptAfter,
  saveCustomerId,
  getCustomerId,
  clearCustomerId,
  submitCustomerData,
  submitCustomerSkip,
};

export {
  markPromptSeen,
  hasSeenPrompt,
  clearPromptSeen,
  resetPromptAfter,
  saveCustomerId,
  getCustomerId,
  clearCustomerId,
  submitCustomerData,
  submitCustomerSkip,
  TAPD_API_URL,
  TapdStorage,
};

export default TapdStorage;
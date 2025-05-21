var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const TAPD_API_URL = 'http://localhost:8000/api';
const KEY_PREFIX = 'tapd_seen_prompt_for_venue';
const TAPD_CUSTOMER_ID_KEY = 'tapd_customer_id';
// LocalStorage Helpers
function safeSetItem(key, value) {
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (_a) { }
    }
}
function safeGetItem(key) {
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        catch (_a) {
            return null;
        }
    }
    return null;
}
function safeRemoveItem(key) {
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            localStorage.removeItem(key);
        }
        catch (_a) { }
    }
}
function getStorageKey(venueId) {
    return `${KEY_PREFIX}_${venueId}`;
}
// Prompt Seen Logic
function markPromptSeen(venueId) {
    console.log('markPromptSeen', venueId);
    safeSetItem(getStorageKey(venueId), { seen: true, timestamp: Date.now() });
}
function hasSeenPrompt(venueId) {
    console.log('hasSeenPrompt', venueId);
    const data = safeGetItem(getStorageKey(venueId));
    return (data === null || data === void 0 ? void 0 : data.seen) === true;
}
function clearPromptSeen(venueId) {
    safeRemoveItem(getStorageKey(venueId));
}
function resetPromptAfter(days, venueId) {
    const data = safeGetItem(getStorageKey(venueId));
    const now = Date.now();
    if (!(data === null || data === void 0 ? void 0 : data.timestamp) || now - data.timestamp > days * 86400000) {
        clearPromptSeen(venueId);
    }
}
// Customer ID Helpers
function saveCustomerId(customerId) {
    console.log('saveCustomerId', customerId);
    safeSetItem(TAPD_CUSTOMER_ID_KEY, customerId);
}
function getCustomerId() {
    const customerId = safeGetItem(TAPD_CUSTOMER_ID_KEY);
    console.log('getCustomerId', customerId);
    return customerId;
}
function clearCustomerId() {
    console.log('clearCustomerId');
    safeRemoveItem(TAPD_CUSTOMER_ID_KEY);
}
// API: Submit Customer Data
function submitCustomerData(_a) {
    return __awaiter(this, arguments, void 0, function* ({ apiKey, venueId, data, }) {
        const payload = {
            venue_id: venueId,
            name: data.name || null,
            phone_number: data.phone_number || null,
            email: data.email || null,
            type: data.type,
        };
        try {
            const res = yield fetch(`${TAPD_API_URL}/customer-entry/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const responseBody = yield res.json().catch(() => null);
            if (!res.ok || !(responseBody === null || responseBody === void 0 ? void 0 : responseBody.customer_id)) {
                console.error('❌ Customer submission failed:', res.status, responseBody);
                return { success: false, error: responseBody };
            }
            markPromptSeen(venueId);
            saveCustomerId(responseBody.customer_id);
            return {
                success: true,
                customer_id: responseBody.customer_id,
            };
        }
        catch (err) {
            console.error('❌ Unexpected error submitting customer info:', err);
            return { success: false, error: err };
        }
    });
}
// API: Submit Skip
function submitCustomerSkip(_a) {
    return __awaiter(this, arguments, void 0, function* ({ apiKey, venueId, }) {
        try {
            const res = yield fetch(`${TAPD_API_URL}/customer-entry/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ venue_id: venueId, skipped: true }),
            });
            const responseBody = yield res.json().catch(() => null);
            if (!res.ok || !(responseBody === null || responseBody === void 0 ? void 0 : responseBody.customer_id)) {
                console.error('Skip submission failed:', res.status, responseBody);
                return { success: false, error: responseBody };
            }
            markPromptSeen(venueId);
            saveCustomerId(responseBody.customer_id);
            return {
                success: true,
                customer_id: responseBody.customer_id,
            };
        }
        catch (err) {
            console.error('❌ Unexpected error skipping customer prompt:', err);
            return { success: false, error: err };
        }
    });
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
export { markPromptSeen, hasSeenPrompt, clearPromptSeen, resetPromptAfter, saveCustomerId, getCustomerId, clearCustomerId, submitCustomerData, submitCustomerSkip, TAPD_API_URL, TapdStorage, };
export default TapdStorage;

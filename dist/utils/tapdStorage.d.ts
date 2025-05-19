export type CustomerData = {
    name?: string;
    phone_number?: string;
    email?: string;
    lookup_only?: boolean;
};
export type SubmitResponse = {
    success: true;
    customer_id: string;
} | {
    success: false;
    error: any;
};
declare const TAPD_API_URL: string;
declare function markPromptSeen(venueId: string): void;
declare function hasSeenPrompt(venueId: string): boolean;
declare function clearPromptSeen(venueId: string): void;
declare function resetPromptAfter(days: number, venueId: string): void;
declare function saveCustomerId(customerId: string): void;
declare function getCustomerId(): string | null;
declare function clearCustomerId(): void;
declare function submitCustomerData({ apiKey, venueId, data, }: {
    apiKey: string;
    venueId: string;
    data: CustomerData;
}): Promise<SubmitResponse>;
declare function submitCustomerSkip({ apiKey, venueId, }: {
    apiKey: string;
    venueId: string;
}): Promise<SubmitResponse>;
declare const TapdStorage: {
    markPromptSeen: typeof markPromptSeen;
    hasSeenPrompt: typeof hasSeenPrompt;
    clearPromptSeen: typeof clearPromptSeen;
    resetPromptAfter: typeof resetPromptAfter;
    saveCustomerId: typeof saveCustomerId;
    getCustomerId: typeof getCustomerId;
    clearCustomerId: typeof clearCustomerId;
    submitCustomerData: typeof submitCustomerData;
    submitCustomerSkip: typeof submitCustomerSkip;
};
export { markPromptSeen, hasSeenPrompt, clearPromptSeen, resetPromptAfter, saveCustomerId, getCustomerId, clearCustomerId, submitCustomerData, submitCustomerSkip, TAPD_API_URL, TapdStorage, };
export default TapdStorage;

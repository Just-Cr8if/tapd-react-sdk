var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { submitCustomerData, submitCustomerSkip, } from '../utils/tapdStorage';
const BUTTON_COLORS = {
    black: '#000',
    green: '#00C853',
    blue: '#1565C0',
    mobylmenu: '#00A6FF',
    purple: '#7E57C2',
    white: '#fff',
};
const getStyles = (theme = 'light', buttonColor = 'black') => ({
    // overlay: {
    //   position: 'fixed',
    //   top: 0,
    //   left: 0,
    //   width: '100vw',
    //   height: '100vh',
    //   backgroundColor: 'rgba(0,0,0,0.4)',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   zIndex: 9999,
    // },
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
        flexDirection: 'column',
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
});
const CustomerPrompt = ({ venueId, apiKey, onSubmit, onSkip, theme = 'light', buttonColor = 'black', }) => {
    const styles = getStyles(theme, buttonColor);
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);
    return (_jsx("div", { style: styles.overlay, children: _jsxs("div", { style: styles.container, children: [_jsx("h2", { style: styles.title, children: "Join the club" }), _jsx("p", { style: styles.description, children: "Enter your info to unlock rewards and track your visits." }), _jsxs("form", { onSubmit: (e) => __awaiter(void 0, void 0, void 0, function* () {
                        var _a, _b, _c;
                        e.preventDefault();
                        const form = e.target;
                        const formData = new FormData(form);
                        const data = {
                            name: ((_a = formData.get('name')) === null || _a === void 0 ? void 0 : _a.toString()) || undefined,
                            phone_number: ((_b = formData.get('phone_number')) === null || _b === void 0 ? void 0 : _b.toString()) || undefined,
                            email: ((_c = formData.get('email')) === null || _c === void 0 ? void 0 : _c.toString()) || undefined,
                        };
                        const result = yield submitCustomerData({ apiKey, venueId, data });
                        if (result.success && onSubmit) {
                            onSubmit(data);
                        }
                        else if (!result.success) {
                            console.error('Failed to submit customer data:', result.error);
                        }
                    }), style: styles.form, children: [_jsx("input", { name: "name", placeholder: "Name (optional)", style: styles.input }), _jsx("input", { name: "phone_number", placeholder: "Phone Number", type: "tel", style: styles.input }), _jsx("input", { name: "email", placeholder: "Email", type: "email", style: styles.input }), _jsx("button", { type: "submit", style: styles.button, children: "Join" }), _jsx("button", { type: "button", onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                                const result = yield submitCustomerSkip({ apiKey, venueId });
                                if (result.success && onSkip) {
                                    onSkip();
                                }
                                else if (!result.success) {
                                    console.error('Failed to skip prompt:', result.error);
                                }
                            }), style: styles.skipButton, children: "No thanks" })] })] }) }));
};
export default CustomerPrompt;

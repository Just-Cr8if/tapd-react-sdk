var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { submitCustomerData, submitCustomerSkip, } from '../utils/tapdStorage';
const injectedCSS = `
@keyframes tapd-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes tapd-slideInLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes tapd-slideInUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
`;
const BUTTON_COLORS = {
    black: '#000',
    green: '#00C853',
    blue: '#1565C0',
    mobylmenu: '#00A6FF',
    purple: '#7E57C2',
    white: '#fff',
};
const getStyles = (theme = 'light', buttonColor = 'black', animation) => {
    let animationStyle = {};
    switch (animation) {
        case 'bounce':
            animationStyle = { animation: 'tapd-bounce 0.5s ease' };
            break;
        case 'fromLeft':
            animationStyle = { animation: 'tapd-slideInLeft 0.4s ease' };
            break;
        case 'fromBottom':
            animationStyle = { animation: 'tapd-slideInUp 0.4s ease' };
            break;
    }
    return {
        tapd_customer_prompt_overlay: {
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
        tapd_customer_prompt_container: Object.assign(Object.assign({}, animationStyle), { backgroundColor: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#f1f1f1' : '#000', border: '1px solid #ddd', borderRadius: 12, padding: '1.5rem', maxWidth: 400, width: '90%', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', fontFamily: 'sans-serif' }),
        title: { marginBottom: '0.5rem' },
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
        toggleLink: {
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            color: theme === 'dark' ? '#aaa' : '#666',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
        },
    };
};
const CustomerPrompt = ({ venueId, apiKey, onSubmit, onSkip, theme = 'light', buttonColor = 'black', isVisible = true, animation, }) => {
    const [visible, setVisible] = useState(isVisible);
    const [mode, setMode] = useState('lookup');
    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        if (visible)
            document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [visible]);
    // Inject CSS once
    useEffect(() => {
        const styleId = 'tapd-animations';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = injectedCSS;
            document.head.appendChild(style);
        }
    }, []);
    const styles = getStyles(theme, buttonColor, animation);
    if (!visible)
        return null;
    return createPortal(_jsx("div", { style: styles.tapd_customer_prompt_overlay, children: _jsxs("div", { style: styles.tapd_customer_prompt_container, children: [_jsx("h2", { style: styles.title, children: "Join the club" }), _jsx("p", { style: styles.description, children: mode === 'lookup'
                        ? 'Enter your phone or email to find your account.'
                        : 'Enter your info to unlock rewards and track your visits.' }), _jsxs("form", { onSubmit: (e) => __awaiter(void 0, void 0, void 0, function* () {
                        var _a, _b, _c, _d;
                        e.preventDefault();
                        const form = e.target;
                        const formData = new FormData(form);
                        let data;
                        if (mode === 'lookup') {
                            const contact = (_a = formData.get('contact')) === null || _a === void 0 ? void 0 : _a.toString().trim();
                            if (!contact)
                                return;
                            data = contact.includes('@')
                                ? { email: contact, lookup_only: true }
                                : { phone_number: contact, lookup_only: true };
                        }
                        else {
                            data = {
                                name: ((_b = formData.get('name')) === null || _b === void 0 ? void 0 : _b.toString()) || undefined,
                                phone_number: ((_c = formData.get('phone_number')) === null || _c === void 0 ? void 0 : _c.toString()) || undefined,
                                email: ((_d = formData.get('email')) === null || _d === void 0 ? void 0 : _d.toString()) || undefined,
                            };
                        }
                        const result = yield submitCustomerData({ apiKey, venueId, data });
                        if (result.success) {
                            setVisible(false);
                            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(data);
                        }
                        else {
                            console.error('Failed to submit customer data:', result.error);
                        }
                    }), style: styles.form, children: [mode === 'lookup' ? (_jsxs(_Fragment, { children: [_jsx("input", { name: "contact", placeholder: "Phone or Email", style: styles.input, autoComplete: "on" }), _jsx("button", { type: "submit", style: styles.button, children: "Continue" }), _jsx("button", { type: "button", style: styles.toggleLink, onClick: () => setMode('full'), children: "Don\u2019t have an account?" })] })) : (_jsxs(_Fragment, { children: [_jsx("input", { name: "name", placeholder: "Name (optional)", style: styles.input }), _jsx("input", { name: "phone_number", placeholder: "Phone Number", type: "tel", style: styles.input }), _jsx("input", { name: "email", placeholder: "Email", type: "email", style: styles.input }), _jsx("button", { type: "submit", style: styles.button, children: "Join" }), _jsx("button", { type: "button", style: styles.toggleLink, onClick: () => setMode('lookup'), children: "Back to login" })] })), _jsx("button", { type: "button", onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                                setVisible(false);
                                const result = yield submitCustomerSkip({ apiKey, venueId });
                                if (result.success) {
                                    onSkip === null || onSkip === void 0 ? void 0 : onSkip();
                                }
                                else {
                                    console.error('Failed to skip prompt:', result.error);
                                }
                            }), style: styles.skipButton, children: "No thanks" })] })] }) }), document.body);
};
export default CustomerPrompt;

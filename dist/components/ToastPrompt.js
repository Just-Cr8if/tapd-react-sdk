import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const COLORS = {
    black: { background: 'rgba(0, 0, 0, 0.9)', text: '#000' },
    green: { background: 'rgba(200, 255, 200, 0.9)', text: '#2e7d32' },
    blue: { background: 'rgba(200, 230, 255, 0.9)', text: '#1565c0' },
    red: { background: 'rgba(255, 200, 200, 0.9)', text: '#c62828' },
    gold: { background: 'rgba(255, 235, 150, 0.9)', text: '#b28704' },
    brown: { background: 'rgba(205, 133, 63, 0.15)', text: '#8B4513' },
};
const BUTTON_COLORS = {
    black: '#000',
    green: '#00C853',
    blue: '#1565C0',
    mobylmenu: '#00A6FF',
    purple: '#7E57C2',
    white: '#fff',
};
const getStyles = (theme, position, verticalPosition, sideColor, buttonColor) => {
    var _a;
    const borderRadius = position === 'left'
        ? '0.75rem 0.75rem 0.75rem 0'
        : '0.75rem 0.75rem 0 0.75rem';
    return {
        wrapper: {
            position: 'fixed',
            [verticalPosition]: '2rem',
            [position]: '2rem',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'row',
            transform: `translateX(${position === 'left' ? '-110%' : '110%'})`,
            transition: 'transform 0.4s ease-in-out',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: theme === 'dark' ? '4px 4px 12px 2px rgba(256,256,256,0.15)' : '4px 4px 12px 2px rgba(0,0,0,0.15)',
        },
        wrapperVisible: {
            transform: 'translateX(0)',
        },
        sideBar: {
            width: '20px',
            backgroundColor: ((_a = COLORS[sideColor]) === null || _a === void 0 ? void 0 : _a.text) || COLORS.blue.text,
        },
        container: {
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#f1f1f1' : '#000',
            padding: '1.25rem',
            maxWidth: '380px',
            width: '100%',
        },
        message: {
            marginBottom: '0.75rem',
            fontSize: '.9rem',
            fontWeight: 600
        },
        button: {
            backgroundColor: BUTTON_COLORS[buttonColor] || '#000',
            color: buttonColor === 'white' ? '#000' : '#fff',
            padding: '0.5rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        ctaText: {
            fontWeight: 600,
        },
        price: {
            fontWeight: 600,
            fontSize: '0.8rem',
            marginLeft: '0.5rem',
        },
    };
};
const ToastPrompt = ({ message, ctaText, price, onPress, theme = 'light', position = 'right', verticalPosition = 'bottom', sideColor = 'blue', buttonColor = 'black', }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timeout);
    }, []);
    const styles = getStyles(theme, position, verticalPosition, sideColor, buttonColor);
    return (_jsxs("div", { style: Object.assign(Object.assign({}, styles.wrapper), (visible ? styles.wrapperVisible : {})), onClick: onPress, children: [_jsx("div", { style: styles.sideBar }), _jsxs("div", { style: styles.container, children: [_jsx("div", { style: styles.message, children: message }), _jsxs("button", { style: styles.button, children: [_jsx("span", { style: styles.ctaText, children: ctaText }), _jsx("span", { style: styles.price, children: price })] })] })] }));
};
export default ToastPrompt;

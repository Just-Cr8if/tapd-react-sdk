import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const getStyles = (theme = 'light') => ({
    container: {
        border: '1px solid #ddd',
        borderRadius: 12,
        padding: '1.5rem',
        maxWidth: 400,
        margin: '2rem auto',
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        fontFamily: 'sans-serif',
        backgroundColor: theme === 'dark' ? '#222' : '#fff',
        color: theme === 'dark' ? '#f1f1f1' : '#000',
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
        backgroundColor: theme === 'dark' ? '#0d6efd' : '#007bff',
        color: 'white',
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
const ConsumerPrompt = ({ onSubmit, onSkip, theme = 'light' }) => {
    const styles = getStyles(theme);
    return (_jsxs("div", { style: styles.container, children: [_jsx("h2", { style: styles.title, children: "Join the club" }), _jsx("p", { style: styles.description, children: "Enter your info to unlock rewards and track your visits." }), _jsxs("form", { onSubmit: (e) => {
                    e.preventDefault();
                    const form = e.target;
                    const formData = new FormData(form);
                    onSubmit({
                        name: formData.get('name'),
                        phone_number: formData.get('phone_number'),
                        email: formData.get('email'),
                    });
                }, style: styles.form, children: [_jsx("input", { name: "name", placeholder: "Name (optional)", style: styles.input }), _jsx("input", { name: "phone_number", placeholder: "Phone Number", type: "tel", style: styles.input }), _jsx("input", { name: "email", placeholder: "Email", type: "email", style: styles.input }), _jsx("button", { type: "submit", style: styles.button, children: "Join" }), _jsx("button", { type: "button", onClick: onSkip, style: styles.skipButton, children: "No thanks" })] })] }));
};
export default ConsumerPrompt;

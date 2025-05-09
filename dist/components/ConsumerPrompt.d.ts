import React from 'react';
type Theme = 'light' | 'dark';
type ConsumerPromptProps = {
    onSubmit: (data: {
        name?: string;
        phone_number?: string;
        email?: string;
    }) => void;
    onSkip: () => void;
    theme?: Theme;
};
declare const ConsumerPrompt: React.FC<ConsumerPromptProps>;
export default ConsumerPrompt;

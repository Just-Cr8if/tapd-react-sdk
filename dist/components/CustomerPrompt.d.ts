import React from 'react';
import { CustomerData } from '../utils/tapdStorage';
type Theme = 'light' | 'dark';
type ButtonColor = 'black' | 'green' | 'blue' | 'mobylmenu' | 'purple' | 'white';
type AnimationStyle = 'bounce' | 'fromLeft' | 'fromBottom';
type CustomerPromptProps = {
    venueId: string;
    apiKey: string;
    theme?: Theme;
    buttonColor?: ButtonColor;
    onSubmit?: (data: CustomerData) => void;
    onSkip?: () => void;
    isVisible?: boolean;
    animation?: AnimationStyle;
};
declare const CustomerPrompt: React.FC<CustomerPromptProps>;
export default CustomerPrompt;

import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Position = 'left' | 'right';
type VerticalPosition = 'top' | 'bottom';
type SideColor = 'green' | 'blue' | 'red' | 'gold' | 'brown';
type ButtonColor = 'black' | 'green' | 'blue' | 'mobylmenu' | 'purple' | 'white';

type ToastPromptProps = {
  message: string;
  ctaText: string;
  price: string;
  onPress: () => void;
  theme?: Theme;
  position?: Position;
  verticalPosition?: VerticalPosition;
  sideColor?: SideColor;
  buttonColor?: ButtonColor;
  iconSrc?: string | null;
};

const COLORS = {
  black: { background: 'rgba(0, 0, 0, 0.9)', text: '#000' },
  green: { background: 'rgba(200, 255, 200, 0.9)', text: '#2e7d32' },
  blue: { background: 'rgba(200, 230, 255, 0.9)', text: '#1565c0' },
  red: { background: 'rgba(255, 200, 200, 0.9)', text: '#c62828' },
  gold: { background: 'rgba(255, 235, 150, 0.9)', text: '#b28704' },
  brown: { background: 'rgba(205, 133, 63, 0.15)', text: '#8B4513' },
};

const BUTTON_COLORS: Record<ButtonColor, string> = {
  black: '#000',
  green: '#00C853',
  blue: '#1565C0',
  mobylmenu: '#00A6FF',
  purple: '#7E57C2',
  white: '#fff',
};

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};


const getStyles = (
  theme: Theme,
  position: Position,
  verticalPosition: VerticalPosition,
  sideColor: SideColor,
  buttonColor: ButtonColor,
  isMobile: boolean

) => {
  const borderRadius =
    position === 'left'
      ? '0.75rem 0.75rem 0.75rem 0'
      : '0.75rem 0.75rem 0 0.75rem';

  return {
    wrapper: {
      position: 'fixed' as const,
      [verticalPosition]: isMobile ? '1rem' : '2rem',
      [position]: isMobile ? '0.5rem' : '2rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'row' as const,
      transform: `translateX(${position === 'left' ? '-110%' : '110%'})`,
      transition: 'transform 0.4s ease-in-out',
      borderRadius: '0.4rem',
      overflow: 'hidden' as const,
      cursor: 'pointer',
      boxShadow:
        theme === 'dark'
          ? '4px 4px 12px 2px rgba(256,256,256,0.15)'
          : '4px 4px 12px 2px rgba(0,0,0,0.15)',
      width: isMobile ? '90%' : '350px',
      maxWidth: isMobile ? '90vw' : 'unset',
      backgroundColor: theme === 'dark' ? 'rgb(51, 51, 51)' : 'white',
    },
    
    wrapperVisible: {
      transform: 'translateX(0)',
    },
    sideBar: {
      width: '10px',
      backgroundColor: COLORS[sideColor]?.text || COLORS.blue.text,
    },
    container: {
      position: 'relative' as const,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#f1f1f1' : '#000',
      padding: '1rem 1.25rem',
      maxWidth: '380px',
      width: '100%',
      // border: `1px solid ${COLORS.blue.text}`,
    },
    message: {
      marginBottom: '0.75rem',
      fontSize: '.9rem',
      fontWeight: 500
    },
    button: {
      backgroundColor: BUTTON_COLORS[buttonColor] || '#000',
      color: buttonColor === 'white' ? '#000' : '#fff',
      padding: '0.5rem 0.75rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      width: 'auto',
      maxWidth: '65%',
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
    closeIcon: {
      position: 'absolute' as const,
      top: '0.5rem',
      right: '0.5rem',
      width: '16px',
      height: '16px',
      cursor: 'pointer',
      opacity: 0.6,
    },
    icon: {
      width: '48px',
      height: '48px',
      margin: 'auto 0 auto 1rem',
      backgroundColor: theme === 'dark' ? 'rgb(51, 51, 51)' : 'white',
    },
    
  };
};

const ToastPrompt: React.FC<ToastPromptProps> = ({
  message,
  ctaText,
  price,
  onPress,
  theme = 'light',
  position = 'right',
  verticalPosition = 'bottom',
  sideColor = 'blue',
  buttonColor = 'black',
  iconSrc,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
  };
  
  const width = useWindowWidth();
  const isMobile = width < 480;

  const styles = getStyles(theme, position, verticalPosition, sideColor, buttonColor, isMobile);


  return (
    <div
      style={{
        ...styles.wrapper,
        ...(visible ? styles.wrapperVisible : {}),
      }}
      onClick={onPress}
    >
      <div style={styles.sideBar} />
      {iconSrc !== null && (
        <img
          src={
            iconSrc ||
            (theme === 'dark' ? 'chef-hat-dark.png' : 'chef-hat.png')
          }
          alt="Icon"
          style={styles.icon}
        />
      )}
      <div style={styles.container}>
        <img
          src="/close-x-grey.png"
          alt="Close"
          style={styles.closeIcon}
          onClick={handleClose}
        />

        <div style={styles.message}>{message}</div>
        <button style={styles.button}>
          <span style={styles.ctaText}>{ctaText}</span>
          <span style={styles.price}>{price}</span>
        </button>
      </div>
    </div>
  );
};

export default ToastPrompt;
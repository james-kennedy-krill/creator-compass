import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

const ToastContext = createContext<(message: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timeout = useRef<number | undefined>(undefined);

  const toast = useCallback((text: string) => {
    setMessage(text);
    setVisible(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setVisible(false), 2500);
  }, []);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={`toast${visible ? ' show' : ''}`} role="status" aria-live="polite">
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

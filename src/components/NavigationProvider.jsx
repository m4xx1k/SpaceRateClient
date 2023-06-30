
import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Створюємо контекст
export const NavigationContext = createContext();
export function NavigationProvider({ children }) {
    const location = useLocation();
    const [navigationStack, setNavigationStack] = useState([]);

    // Відслідковуємо зміни в локації
    useEffect(() => {
        setNavigationStack(prev => [...prev, location.pathname]);
    }, [location]);

    return (
        <NavigationContext.Provider value={navigationStack}>
            {children}
        </NavigationContext.Provider>
    );
}

import { useEffect } from 'react';

const useDevToolsDetector = (): void => {
    useEffect(() => {
        const detectDevTools = () => {
            const start = performance.now();
            
            debugger; // This will pause if DevTools are open
            
            const duration = performance.now() - start;
            
            if (duration > 100) {
                // Detected Developer Tools, redirecting
                window.location.href = '/404';
            }
        };

        const interval = setInterval(detectDevTools, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
};

export default useDevToolsDetector;

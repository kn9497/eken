import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom ScrollToTop component
 * Scrolls window to (0, 0) on route change without relying on <ScrollRestoration />,
 * which causes fatal runtime exceptions in BrowserRouter.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

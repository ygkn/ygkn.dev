import React from 'react';
import { GlobalCSS, ResetCSS } from 'src/components';

export const Layout: React.FC = ({ children }) => (
  <>
    <ResetCSS />
    <GlobalCSS />
    {children}
  </>
);

export default Layout;

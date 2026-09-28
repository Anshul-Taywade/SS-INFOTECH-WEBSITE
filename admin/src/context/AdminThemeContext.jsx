import { createContext, useContext, useState } from 'react';

const AdminThemeContext = createContext();

export function AdminThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <AdminThemeContext.Provider value={{ 
      isDarkMode, 
      setIsDarkMode, 
      toggleTheme,
      userModalOpen,
      setUserModalOpen,
      isSidebarOpen,
      setIsSidebarOpen,
      toggleSidebar
    }}>
      <div className={isDarkMode ? 'dark-admin' : 'light-admin'}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error('useAdminTheme must be used within AdminThemeProvider');
  }
  return context;
}

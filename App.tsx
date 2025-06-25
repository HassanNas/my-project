
import React, { useState, useEffect } from 'react';
import { AppSection, Language } from './types';
import { useLocalization } from './hooks/useLocalization';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { PatientPage } from './components/patients/PatientPage';
import { AppointmentPage } from './components/appointments/AppointmentPage';
import { StaffPage } from './components/staff/StaffPage';
import { FinancialsPage } from './components/financials/FinancialsPage';
import { InventoryPage } from './components/inventory/InventoryPage';
import { ReportPlaceholderPage } from './components/reports/ReportPlaceholder';
import { SettingsPage } from './components/settings/SettingsPage';
import { useData } from './contexts/DataContext';
import { Spinner } from './components/common/Spinner';


const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentLanguage, t } = useLocalization();
  const { isLoading: isDataLoading } = useData();


  useEffect(() => {
    document.documentElement.dir = currentLanguage === Language.AR ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderSection = () => {
    if (isDataLoading && activeSection !== 'settings') { // Settings might not depend on full data load
        return <div className="flex items-center justify-center h-full pt-16"><Spinner text={t('common.loading')} size="lg"/></div>;
    }
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage setActiveSection={setActiveSection} />;
      case 'patients':
        return <PatientPage />;
      case 'appointments':
        return <AppointmentPage />;
      case 'staff':
        return <StaffPage />;
      case 'billing':
        return <FinancialsPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'reports':
        return <ReportPlaceholderPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-900">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main className={`flex-1 overflow-y-auto transition-transform duration-300 ease-in-out pt-16 md:ltr:ml-64 md:rtl:mr-64`}>
      {/* 
        Simplified main content margin logic:
        - pt-16: Always for the fixed Navbar.
        - md:ltr:ml-64 / md:rtl:mr-64: Always for the fixed Sidebar on medium screens and up.
        - On smaller screens, the Sidebar is an overlay, so no margin adjustment is needed here for main.
        - transition-transform is for potential future use if sidebar could be collapsed on desktop.
      */}
        <div className="p-0"> {/* Removed padding here, individual pages will handle it */}
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default App;

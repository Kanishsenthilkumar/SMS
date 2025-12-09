import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import ViewStudents from './components/ViewStudents';
import SearchFilter from './components/SearchFilter';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Toast from './components/Toast';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-student':
        return <AddStudent onShowToast={showToast} />;
      case 'view-students':
        return <ViewStudents />;
      case 'search':
        return <SearchFilter />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#16213e] font-roboto">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="ml-64 p-8">
        {renderPage()}
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;

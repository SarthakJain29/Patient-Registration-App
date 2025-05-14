import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Link, 
  Outlet,
  createRoutesFromElements,
  Route,
  useLocation
} from 'react-router-dom';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import QueryInterface from './components/QueryInterface';
import medicineIcon from './assets/undraw_medicine_hqqg.svg';

const Layout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4">
          <img src={medicineIcon} alt="Patient App Logo" className="h-16 w-16" />
          <h1 className="text-4xl font-bold text-gray-900">Patient App</h1>
        </div>
      </header>

      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center h-16 items-center">
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Register Patient
              </Link>
              <Link
                to="/list"
                className={`nav-link ${isActive('/list') ? 'active' : ''}`}
              >
                Patient List
              </Link>
              <Link
                to="/query"
                className={`nav-link ${isActive('/query') ? 'active' : ''}`}
              >
                Query Console
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="card">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Create routes using the new API
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<PatientForm />} />
      <Route path="list" element={<PatientList />} />
      <Route path="query" element={<QueryInterface />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return (
    <React.Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;

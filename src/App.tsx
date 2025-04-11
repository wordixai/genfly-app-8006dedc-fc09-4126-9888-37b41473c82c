import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, FileText } from 'lucide-react';
import Index from './pages/Index';
import Notes from './pages/Notes';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center h-16">
              <div className="flex space-x-8">
                <Link 
                  to="/" 
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Todos
                </Link>
                <Link 
                  to="/notes" 
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Notes
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-sm text-gray-500">
              Todo & Notes App © {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
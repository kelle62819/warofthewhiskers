import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import Traps from './pages/Traps';
import Stats from './pages/Stats';
import Achievements from './pages/Achievements';
import { useEliminations } from './hooks/useEliminations';

function App() {
  const { eliminations } = useEliminations();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header eliminationCount={eliminations.length} />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/traps" element={<Traps />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </main>
        <footer className="text-center text-war-text-dim text-xs py-4 border-t border-war-border">
          War of the Whiskers &mdash; Grandma's Cottage: Under Siege &mdash; 2026
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

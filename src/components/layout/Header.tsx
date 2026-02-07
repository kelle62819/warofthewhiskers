import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/blog', label: 'Dispatches' },
  { to: '/traps', label: 'Arsenal' },
  { to: '/stats', label: 'Intel' },
  { to: '/achievements', label: 'Medals' },
];

export default function Header({ eliminationCount }: { eliminationCount: number }) {
  const { isAdmin, unlock, lock } = useAdmin();
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState('');
  const [shakeError, setShakeError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput) inputRef.current?.focus();
  }, [showInput]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (unlock(code)) {
      setShowInput(false);
      setCode('');
    } else {
      setShakeError(true);
      setCode('');
      setTimeout(() => setShakeError(false), 500);
    }
  }

  function handleLockClick() {
    if (isAdmin) {
      lock();
    } else {
      setShowInput(!showInput);
    }
  }

  return (
    <header className="bg-war-surface border-b border-war-border">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/mouse-icon.png" alt="Mouse icon" className="w-16 h-16" />
            <div>
              <h1 className="font-[family-name:var(--font-stencil)] text-war-red text-xl sm:text-2xl leading-tight">
                War of the Whiskers
              </h1>
              <p className="text-war-text-dim text-xs tracking-widest uppercase">
                Grandma's Cottage: Under Siege
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-[family-name:var(--font-mono)] text-war-amber text-sm border border-war-amber/30 px-3 py-1 rounded">
              KILLS: {eliminationCount}
            </div>
            <button
              onClick={handleLockClick}
              className="text-lg hover:opacity-80 transition-opacity"
              title={isAdmin ? 'Lock admin mode' : 'Unlock admin mode'}
            >
              {isAdmin ? '\u{1F513}' : '\u{1F512}'}
            </button>
            {showInput && !isAdmin && (
              <form
                onSubmit={handleSubmit}
                className={`flex items-center gap-1 ${shakeError ? 'animate-shake' : ''}`}
              >
                <input
                  ref={inputRef}
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Passcode"
                  className={`bg-war-surface-light border rounded px-2 py-1 text-xs text-war-text w-24 outline-none ${
                    shakeError ? 'border-war-red' : 'border-war-border focus:border-war-amber'
                  }`}
                />
                <button
                  type="submit"
                  className="bg-war-amber/20 hover:bg-war-amber/30 text-war-amber px-2 py-1 rounded text-xs font-semibold transition-colors"
                >
                  Go
                </button>
              </form>
            )}
          </div>
        </div>
        <nav className="flex gap-1 mt-3 overflow-x-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm rounded transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-war-red/20 text-war-red font-semibold'
                    : 'text-war-text-dim hover:text-war-text hover:bg-war-surface-light'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/blog', label: 'Dispatches' },
  { to: '/traps', label: 'Arsenal' },
  { to: '/stats', label: 'Intel' },
  { to: '/achievements', label: 'Medals' },
];

export default function Header({ eliminationCount }: { eliminationCount: number }) {
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
          <div className="flex items-center gap-4">
            <div className="font-[family-name:var(--font-mono)] text-war-amber text-sm border border-war-amber/30 px-3 py-1 rounded">
              KILLS: {eliminationCount}
            </div>
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

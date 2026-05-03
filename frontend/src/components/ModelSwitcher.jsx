import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

function ClaudeLogo() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="currentColor" opacity="0.9" />
      <path d="M12 6l-5 3v6l5 3 5-3V9l-5-3z" fill="var(--bg-card)" opacity="0.6" />
    </svg>
  );
}

function GeminiLogo() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 C12 7 17 12 22 12 C17 12 12 17 12 22 C12 17 7 12 2 12 C7 12 12 7 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

const MODELS = [
  { id: 'claude-opus',    label: 'Claude Opus 4.6',  Logo: ClaudeLogo,  color: '#a855f7' },
  { id: 'gemini-pro',     label: 'Gemini 2.5 Pro',   Logo: GeminiLogo,  color: '#3b82f6' },
  { id: 'gemini-flash',   label: 'Gemini 2.5 Flash', Logo: GeminiLogo,  color: '#06b6d4' },
];

export default function ModelSwitcher() {
  const [active, setActive]   = useState('claude-opus');
  const [open, setOpen]       = useState(false);
  const containerRef          = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = MODELS.find(m => m.id === active);

  return (
    <div className="model-dropdown" ref={containerRef}>
      <button
        type="button"
        className="model-dropdown-trigger"
        style={{ '--model-color': current.color }}
        onClick={() => setOpen(v => !v)}
        title="Switch AI model (visual only)"
      >
        <current.Logo />
        <span>{current.label}</span>
        <ChevronDown size={11} className={`model-chevron${open ? ' open' : ''}`} />
      </button>

      {open && (
        <div className="model-dropdown-menu">
          {MODELS.map(({ id, label, Logo, color }) => (
            <button
              key={id}
              type="button"
              className={`model-dropdown-item${active === id ? ' active' : ''}`}
              style={{ '--model-color': color }}
              onClick={() => { setActive(id); setOpen(false); }}
            >
              <Logo />
              <span>{label}</span>
              {active === id && <span className="model-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type P = { className?: string };

export function WhatsAppIcon({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.2-.6-6-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.1 9.9 10 5.2 16 5.2s10.9 4.7 10.9 10.6S22 26.4 16 26.4zm6-7.9c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3z"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** WhatsApp em traço fino, no mesmo estilo dos ícones do lucide-react. */
export function WhatsAppLineIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3.6 20.4l1.25-4.05A8.6 8.6 0 1 1 8 19.3z" />
      <path d="M9.1 8.3c.2-.4.6-.4.8-.1l.7 1.4c.1.3 0 .5-.2.7l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.4-.3.7-.2l1.4.7c.3.2.3.6-.1.8-.7.5-1.6.7-2.5.3a7.4 7.4 0 0 1-3.4-3.4c-.4-.9-.2-1.8.3-2.5z" />
    </svg>
  );
}

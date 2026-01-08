interface ChromeIconProps {
  className?: string;
}

export function ChromeIcon({ className = "size-6" }: ChromeIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#fff" />
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        fill="#E0E0E0"
      />
      <circle cx="12" cy="12" r="4.5" fill="#4285F4" />
      <path
        d="M12 7.5c-2.49 0-4.5 2.01-4.5 4.5H2c0-5.52 4.48-10 10-10v5.5z"
        fill="#EA4335"
      />
      <path
        d="M12 16.5c2.49 0 4.5-2.01 4.5-4.5H22c0 5.52-4.48 10-10 10v-5.5z"
        fill="#34A853"
      />
      <path
        d="M7.5 12c0-2.49 2.01-4.5 4.5-4.5L7.5 2C3.36 4.69.69 8.98.69 12H7.5z"
        fill="#FBBC05"
      />
    </svg>
  );
}

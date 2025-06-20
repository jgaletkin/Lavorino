'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }): JSX.Element {
  return (
    <div>Global Error</div>
  );
} 
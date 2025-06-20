'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }): JSX.Element {
  return <div>Error</div>;
} 
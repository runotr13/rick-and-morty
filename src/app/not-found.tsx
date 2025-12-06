import { ROUTES } from '@/router/routes';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={ROUTES.HOME}>Return Home</Link>
    </div>
  );
}

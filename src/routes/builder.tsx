import { createFileRoute } from '@tanstack/react-router';
import AppBuilder from '@/pages/builder';

export const Route = createFileRoute('/builder')({
  component: BuilderPage,
});

function BuilderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppBuilder />
    </div>
  );
}
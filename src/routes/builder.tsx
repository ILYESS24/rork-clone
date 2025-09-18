import { createFileRoute } from '@tanstack/react-router';
import AppBuilder from '@/pages/builder';

export const Route = createFileRoute('/builder')({
  component: AppBuilder,
});
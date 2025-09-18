import { createFileRoute } from '@tanstack/react-router';
import AIBuilder from '@/pages/ai-builder';

export const Route = createFileRoute('/ai-builder')({
  component: AIBuilder,
});

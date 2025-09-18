import { createFileRoute } from '@tanstack/react-router';
import { TeamManager } from '@/components/teams/TeamManager';

export const Route = createFileRoute('/teams')({
  component: TeamsPage,
});

function TeamsPage() {
  return <TeamManager />;
}

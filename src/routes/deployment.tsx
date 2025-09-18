import { createFileRoute } from '@tanstack/react-router';
import { DeploymentManager } from '@/components/deployment/DeploymentManager';

export const Route = createFileRoute('/deployment')({
  component: DeploymentPage,
});

function DeploymentPage() {
  return <DeploymentManager />;
}
